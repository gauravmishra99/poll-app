import { Card } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import "./Vote.css";
import Navbar from "./Navbar";
import { AuthContext } from "../components/auth/Auth";

const Vote = (props) => {
  const [poll, setPoll] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const currentUserid = currentUser ? currentUser.uid : " ";
  var str = props.match.params.id;
  var poll_id = str.slice(0, 36);
  const pollRef = db.collection("polls").doc(poll_id);
  const increment = firebase.firestore.FieldValue.increment(1);
  const [isClicked, setIsClicked] = useState(false);

  const getPolldata = async () => {
    const doc = await pollRef.get();
    const item = [];
    item.push(doc.data());
    setPoll(item);
  };
  useEffect(() => {
    getPolldata();
  }, []);

  useEffect(() => {
    if (poll[0]) {
      console.log(poll[0].votedBy);
      poll[0].votedBy.map((id) => {
        if (id === currentUserid) {
          setIsClicked(true);
        }
      });
    }
  }, [poll]);

  const handleLogout = () => {
    props.history.push("/");
  };

  const handleClick = ({ option, option_id }) => {
    console.log(option);
    let voted = [...poll[0].votedBy];
    voted.push(currentUserid);
    pollRef.update({
      [option_id]: increment,
      totalvotes: increment,
      votedBy: voted,
    });
    setIsClicked(true);
  };
  return (
    <div className="vote">
      <Navbar Logout={handleLogout} />
      {poll[0] ? (
        <div className="vote__body">
          <div className="vote__div">
            {console.log(poll)}
            {isClicked ? (
              <p className="vote__thanks">Thank you for your vote!</p>
            ) : null}
            <p className="vote__question">{poll[0].poll_question}</p>
            {poll[0].poll_options.map((poll) => {
              return (
                <Card
                  onClick={() => {
                    if (!isClicked) {
                      handleClick(poll);
                    }
                  }}
                  className={`${
                    isClicked ? "vote_pollsClicked" : "vote__polls"
                  }`}
                  key={poll.option_id}
                >
                  {poll.option}
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="vote__not">
          <p className="not__text">
            You may have searched for an invalid link or the link must have been removed. Please contact the creator of the Poll
          </p>
        </div>
      )}
    </div>
  );
};

export default Vote;
