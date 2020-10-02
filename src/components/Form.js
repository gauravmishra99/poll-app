import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Form.css";
import { db } from "../firebase";
import { AuthContext } from "../components/auth/Auth";
import Options from "./Options";
import FlipMove from "react-flip-move";
import Loading from "./Loading";

const Form = (props, ref) => {
  const pollsRef = db.collection("polls");
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : "";
  const [poll, setPoll] = useState([]);
  var str = props.match.params.id;
  var poll_createdBy = str.slice(36);
  var poll_id = str.slice(0, 36);
  const [pollOptions, setPollOptions] = useState([]);

  const handleLogout = () => {
    props.history.push("/");
  };

  const getpolldata = () => {
    pollsRef.where("id", "==", poll_id).onSnapshot((snap) => {
      const items = [];
      snap.forEach((doc) => {
        items.push(doc.data());
      });
      setPoll(items);
    });
    console.log("changed now")
  };

  useEffect(() => {
    getpolldata();
  }, []);

  useEffect(() => {
    if (poll[0]) {
      console.log(poll)
      //nm
      const items = []
      poll[0].poll_options.map((option) => {
        var l = poll[0][option.option_id]
        option[`optionscore${option.option_id}`] = l
        items.push(option)
      })
      console.log(items)
      //jc
      //const items = [...poll[0].poll_options];
      items.sort((a, b) => b[`optionscore${b.option_id}`] - a[`optionscore${a.option_id}`]);
      console.log(items)
      setPollOptions(items);
    }
  }, [poll]);

  return (
    <div className="formpage">
      <Navbar Logout={handleLogout} />
      {!!poll[0] ? (
        currentUserId === poll_createdBy ? (
          <div className="formpage__body">
            <FlipMove duration={900} >
              {pollOptions.map((item) => {
                console.log(item)
                var progress;
                if(item[`optionscore${item.option_id}`] === 0){
                  progress = 0;
                }else{
                  progress = (item[`optionscore${item.option_id}`]/poll[0].totalvotes)*100
                }
                return (
                  <Options
                    progress={progress}
                    key={item.option}
                    option={item.option}
                    score={item.optionscore}
                  />
                );
              })}
            </FlipMove>
          </div>
        ) : (
          <div>You are not authorised to view this content</div>
        )
      ) : (
        <Loading/>
      )}
    </div>
  );
};

export default Form;
