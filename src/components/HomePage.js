import { Button, Card, CardContent, Grow, Typography } from "@material-ui/core";
import React, { Fragment, useContext, useEffect, useState } from "react";
import "./HomePage.css";
import Navbar from "./Navbar";
import { db } from "../firebase";
import { AuthContext } from "../components/auth/Auth";
import Polls from "./Polls";
import FlipMove from "react-flip-move";

const HomePage = (props) => {
  const [myPolls, setMyPolls] = useState([]);
  const pollsRef = db.collection("polls");
  const { currentUser } = useContext(AuthContext);
  const currentUserid = currentUser ? currentUser.uid : " ";
  const [isCopied, setIsCopied] = useState(false);

  const getPolls = () => {
    pollsRef
      .where("poll_createdBy", "==", currentUserid)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setMyPolls(items);
      });
  };

  const hue = () => {
    setIsCopied(true);
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 5000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    getPolls();
    const interval = setInterval(() => {
      setIsCopied(false);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    props.history.push("/");
  };

  const handleViewResults = ({ id, createdBy }) => {
    props.history.push(`/home/form/${id + createdBy}`);
  };

  return (
    <div className="home__body">
      <Navbar Logout={handleLogout} />
      <div>
        <FlipMove duration={500} className="home__polls">
          {myPolls.map((poll) => {
            return (
              <Polls
                handleViewResults={handleViewResults}
                setIsCopied={hue}
                poll={poll}
                key={poll.id}
              />
            );
          })}
        </FlipMove>
      </div>
      <div className="home__copied">
        {isCopied ? <span>Copied.</span> : null}
      </div>
    </div>
  );
};

export default HomePage;
