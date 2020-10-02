import React from "react";
import firebase from "../firebase";
import "./Logout.css";
import Button from "@material-ui/core/Button";

const handleLogout = () => {
  firebase.auth().signOut();
};

const Logout = () => {
  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
