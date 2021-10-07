import { useState } from "react";
import { addUser, getUsers } from "./draft.js";
import { useHistory, Link, Redirect } from "react-router-dom";
import {
  query,
  where,
  collection,
  getDocs,
  getDocuments,
  size,
} from "firebase/firestore";
import { db } from "./firebase.js";

function Logout(props) {
  const auth = props.auth;
  if (auth) {
    return (
      <div>
        <h2>Logout</h2>
        <h2>{auth.username}</h2>
      </div>
    );
  } else {
    alert("Login First To Access This Page.");
    return <Redirect to={{ pathname: "/login" }}></Redirect>;
  }
}

export default Logout;
