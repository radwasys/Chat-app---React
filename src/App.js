import { createRef, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
      </Switch>
    </Router>
  );
}

export default App;
