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

function Home(props) {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

export default Home;
