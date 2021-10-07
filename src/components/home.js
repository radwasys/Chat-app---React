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

function Home(props) {
  const auth = props.auth;
  const [search, setSearch] = useState("");
  var results = [];
  var button = "";

  const submit = async () => {
    results = [];
    const usersQuery = query(
      collection(db, "users"),
      where("username", "==", search)
    );
    const users = await getDocs(usersQuery);
    users.forEach((user) => {
      results.push(user.data());
    });
    setSearch("");
    if (results[0]) {
      button = (
        <button className="list-group-item list-group-item-action">
          {results[0].username}
        </button>
      );
    } else {
      button = "No results";
    }
  };

  if (auth) {
    return (
      <div>
        <br></br>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></input>
          <button
            class="btn btn-outline-success"
            type="button"
            onClick={submit}
          >
            Search
          </button>
        </form>
        <h2>{auth.username}</h2>
        <div class="list-group">{button}</div>
      </div>
    );
  } else {
    alert("Login First To Access This Page.");
    return <Redirect to={{ pathname: "/login" }}></Redirect>;
  }
}

export default Home;
