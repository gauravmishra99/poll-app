import React, { useContext } from "react";
import "./LandingPage.css";
import Navbar from "./Navbar";
import SignIn from "./SignIn";
import { AuthContext } from "../components/auth/Auth";

const LandingPage = (props) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      {currentUser ? (
        props.location.state ? (
          props.history.push(props.location.state.from.pathname)
        ) : (
          props.history.push("/home")
        )
      ) : (
        <div className="lBody">
          {console.log(props)}
          <div className="lBody__banner">
            <p className="body__text">Create Your Own Polls!</p>
            <p className="body__text">Want to know opinion about a topic?</p>
            <div className="body__bannerSignin">
              <p>Just Sign In</p>
              <SignIn />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
