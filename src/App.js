import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/practice/ProtectedRoute";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import CreateForm from "./components/CreateForm";
import Form from "./components/Form";
import Vote from "./components/Vote";
import Loading from "./components/Loading";

function App() {
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}/> 
          {/* <Route exact path="/home" component={HomePage}/>  */}
          <ProtectedRoute exact path="/home" component={HomePage} />
          <ProtectedRoute exact path="/home/createform" component={CreateForm} />
          <ProtectedRoute exact path="/home/form/:id"  component={Form} />
          <ProtectedRoute exact path="/home/vote/:id"  component={Vote} />
          {/* <Route path="/home/createform" component={CreateForm}/> */}
          {/* <Route exact path="/" component={landing} />
          <ProtectedRoute exact path="/app" component={applayout} /> */}
          <Route path = "*" component={()=> "404 Not found"}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
