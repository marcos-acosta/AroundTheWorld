import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import BottleList from "./components/bottle-list.component";
import Landing from "./components/landing.component";
import CreateUser from "./components/create-user.component";
import LogIn from "./components/log-in.component";
import AddToBottle from "./components/add-to-bottle.component";

function App() {
  return (
    <Router>
      <Route path="/bottles" exact component={BottleList} />
      <Route path="/" exact component={Landing}/>
      <Route path="/signup" exact component={CreateUser}/>
      <Route path="/login" exact component={LogIn}/>
      <Route path="/bottles/write/:id" exact component={AddToBottle}/>
    </Router>
  );
}

export default App;
