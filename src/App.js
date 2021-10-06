import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Home from "./components/home";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/home" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;
