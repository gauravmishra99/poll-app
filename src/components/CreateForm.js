import { Button, Slide, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Navbar from "./Navbar";
import "./HomePage.css";
import { db } from "../firebase";
import firebase from "firebase";
import { AuthContext } from "../components/auth/Auth";
import { v4 as uuidv4 } from "uuid";

const CreateForm = (props) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState("");
  const [direction, setDirection] = useState("right");
  const { currentUser } = useContext(AuthContext);
  const currentUserid = currentUser ? currentUser.uid : " ";
  const pollsRef = db.collection("polls");
  const [optionid, setOptionid] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    props.history.push("/");
  };

  const addOptionField = () => {
    setOptions([...options, { option: "", option_id: optionid }]);
    const hue = optionid + 1;
    setOptionid(hue);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...options];
    list[index][name] = value;
    setOptions(list);
  };

  const handleSubmit = () => {
    const id = uuidv4();
    const length = options.length;
    const votedBy = [];
    const newpoll = {
      id,
      totalvotes: 0,
      poll_createdBy: currentUserid,
      poll_question: question,
      poll_options: options,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      poll_link: `https://poll-app-bf731.web.app/home/vote/${
        id + currentUserid
      }`,
      votedBy,
    };
    for (let index = 0; index < length; index++) {
      newpoll[`${options[index].option_id}`] = 0;
    }
    pollsRef
      .doc(id)
      .set(newpoll)
      .catch((err) => console.log(err));

    setQuestion("");
    setOptions([]);
    setDirection("left");
    setOpen(false);
    props.history.push("/home");
  };
  return (
    <div>
      <Navbar Logout={handleLogout} />
      <div className="buttons_form">
        <div>
          <Button
            onClick={handleOpen}
            className="createPollBtn"
            variant="contained"
            color="primary"
          >
            Create Poll
          </Button>
        </div>
        <Slide
          direction="down"
          timeout={800}
          in={open}
          mountOnEnter
          unmountOnExit
        >
          <div className="paper__btndiv">
            <Button
              onClick={handleSubmit}
              className="paper__btn"
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
            <Button
              className="paper__btn"
              onClick={addOptionField}
              variant="contained"
              color="secondary"
            >
              Add Options
            </Button>
          </div>
        </Slide>
      </div>

      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <div className="paper">
          <TextField
            variant="outlined"
            multiline
            label="Enter Your Question..."
            className="paper__question"
            size="small"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {options.map((item, i) => {
            return (
              <Slide
                direction={direction}
                timeout={700}
                in={open}
                mountOnEnter
                unmountOnExit
              >
                <div className="paper__inputdiv">
                  <TextField
                    key={i}
                    name="option"
                    size="small"
                    multiline
                    className="paper__option"
                    value={item.option}
                    onChange={(e) => handleChange(e, i)}
                    variant="outlined"
                    label="Enter the Option..."
                  />
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Slide>
            );
          })}
        </div>
      </Slide>
    </div>
  );
};

export default CreateForm;
