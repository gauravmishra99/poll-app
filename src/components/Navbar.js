import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import firebase from "../firebase";
import { AuthContext } from "../components/auth/Auth";

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const { currentUser } = useContext(AuthContext);

  const clickHandler = () => {
    setIsClicked(!isClicked);
  };

  return (
    <nav className="navbar">
      <h1>Poll App</h1>
      <div className="menubar" onClick={() => clickHandler()}>
        {isClicked ? (
          <CloseIcon fontSize="large" />
        ) : (
          <MenuIcon fontSize="large" />
        )}
      </div>
      <ul
        className={`nav-links nav-linksmobile ${
          isClicked ? "nav-linkShow" : ""
        }`}
      >
        <Link to="/home" className="navstyle">
          <li>Home</li>
        </Link>
        <Link className="navstyle" to="/home/createform">
          <li>Create Form</li>
        </Link>
        {currentUser ? (
          <a className="logout-anchor" onClick={handleLogout}>
            Logout
          </a>
        ) : null}
      </ul>
      {currentUser ? (
        <Button
          className="logout-btn"
          variant="contained"
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : null}
    </nav>
  );
};

export default Navbar;
