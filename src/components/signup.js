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

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const history = useHistory();

  const submit = async () => {
    const emailQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const usernameQuery = query(
      collection(db, "users"),
      where("username", "==", username)
    );
    const emails = await getDocs(emailQuery);
    const usernames = await getDocs(emailQuery);

    if (!emails.empty) {
      alert("Email is already in use");
      return;
    }
    if (!usernames.empty) {
      alert("Username is already in use");
      return;
    }
    if (email === undefined || email.length < 7) {
      alert("Email is less than 7 charachters", "warning");
      return;
    }
    if (username === undefined || username.length < 4) {
      alert("Username is less than 4 charachters", "warning");
      return;
    }
    if (password === undefined || password.length < 6) {
      alert("Password is less than 6 charachters", "warning");
      return;
    }
    if (password !== password2) {
      alert("Passwords should be the same", "warning");
      return;
    }

    const type = await addUser(email, username, password);
    if (type === "success") {
      alert("User added!", type);
      setEmail("");
      setUsername("");
      setPassword("");
      setPassword2("");
      console.log("successs");
    } else {
      alert("Error while adding user, Try Again.");
      console.log("error");
      return;
    }

    setTimeout(() => {
      history.push("/login");
    }, 2000);
  };

  return (
    <div>
      <form>
        <h2 align="center">Sign Up</h2>
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
            Username
          </label>
          <input
            type="username"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Username"
            required={true}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            class="form-control password2"
            id="exampleFormControlInput1"
            placeholder="Confirm password"
            required={true}
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          ></input>
        </div>
        <div align="center">
          <button
            onClick={submit}
            align="center"
            type="button"
            class="btn btn-primary"
          >
            Sign Up
          </button>
        </div>
        <br></br>
        <div align="center">
          <Link to={"/login"}>Already a user?</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
