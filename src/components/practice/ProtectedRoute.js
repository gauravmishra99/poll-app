import React, { useContext, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import Redirects from "../Redirects";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const [istrue, setIsTrue] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsTrue(true);
    }, 5000);
  });

  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser) {
          return <Component {...props} />;
        } else {
          if (istrue) {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }else{
            return(
              <Redirects/>
            )
          }
        }
      }}
    />
  );
};

export default ProtectedRoute;
