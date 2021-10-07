import { useState } from "react";
import { addUser, getUsers } from "./draft.js";
import { useHistory, Link } from "react-router-dom";
import {
  query,
  where,
  collection,
  getDocs,
  getDocuments,
  size,
} from "firebase/firestore";
import { db } from "./firebase.js";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const submit = async () => {
    const exists = [];
    const emailQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );

    const emails = await getDocs(emailQuery);

    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }
    if (emails.empty) {
      alert("Email does not exist.");
      return;
    } else {
      emails.forEach((user) => {
        props.setUser(user.data());
        if (user.data().password === password) {
          exists.push(true);
        } else {
          exists.push(false);
        }
      });
      if (exists[0] === true) {
        alert("Logged in!");
        history.push("/home");
        return;
      } else {
        alert("Password is incorrect.");
        return;
      }
    }
  };

  return (
    <div>
      <form>
        <h2 align="center">Login</h2>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control password1"
            id="exampleFormControlInput1"
            placeholder="Password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div align="center">
          <button
            onClick={submit}
            align="center"
            type="button"
            class="btn btn-primary"
          >
            Login
          </button>
        </div>
        <br></br>
        <div align="center">
          <Link to={"/signup"}>New Here?</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
