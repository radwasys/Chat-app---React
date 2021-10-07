import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Logout from "./components/logout";
import { useState } from "react";

function App() {
  const [user, setUser] = useState();

  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path="/login">
          <Login setUser={setUser}></Login>
        </Route>
        <Route path="/signup">
          <Signup></Signup>
        </Route>
        <Route path="/home">
          <Home auth={user}></Home>
        </Route>
        <Route path="/logout">
          <Logout auth={user}></Logout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
