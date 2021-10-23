import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import uuid from "react-uuid";
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

function Chat(props) {
  const [msg, setMsg] = useState("");
  const q = query(
    collection(db, `msgs-${props.auth.username}`),
    orderBy("timestamp", "asc")
  );
  const frd = props.friend;
  const [msgs, setTexts] = useState([]);
  const [froms, setSome] = useState([]);
  const [tos, setThing] = useState([]);
  let querySnapshot;
  let list = [];

  const setMess = (state) => {
    return new Promise(() => {
      setTexts((prev) => [...prev, state]);
    });
  };

  const setFroms = (state) => {
    return new Promise(() => {
      setSome((prev) => [...prev, state]);
    });
  };

  const setTos = (state) => {
    return new Promise(() => {
      setThing((prev) => [...prev, state]);
    });
  };

  const func = async () => {
    let list = [];
    querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    return list;
  };

  useEffect(async () => {
    list = await func();

    setTexts([]);
    setSome([]);
    setThing([]);

    list.map((item) => {
      setMess(item.msg);
      setTos(item.to);
      setFroms(item.from);
    });
  }, []);

  const send = async () => {
    let message = msg;
    let from = props.auth.username;
    let to = props.friend.username;
    let msgBody = {
      msg: message,
      from: from,
      to: to,
      timestamp: Date.now(),
    };

    try {
      const refFrom = await addDoc(collection(db, `msgs-${from}`), msgBody);
      const refTo = await addDoc(collection(db, `msgs-${to}`), msgBody);
    } catch (e) {
      alert("Error while sending message, Try again.");
      console.error(e);
    }

    setMsg("");

    list = await func();

    setTexts([]);
    setSome([]);
    setThing([]);

    list.map((item) => {
      setMess(item.msg);
      setTos(item.to);
      setFroms(item.from);
    });
    console.log(tos);
  };

  if (frd !== undefined) {
    return (
      <div>
        <nav class="navbar navbar-light bg-light">
          <div class="d-flex justify-content-center container-fluid">
            <span class="navbar-brand mb-0 h1">
              {props.auth.username} is chatting with {frd.username}
            </span>
          </div>
        </nav>
        <div className="list-group">
          {msgs.map((item) => (
            <div class="card" key={uuid()}>
              <div class="card-body">
                {froms[msgs.indexOf(item)] === props.auth.username
                  ? "You"
                  : froms[msgs.indexOf(item)]}
                : {item}
              </div>
            </div>
          ))}
        </div>
        <form class="d-flex fixed-bottom">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Enter message"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          ></input>
          <button class="btn btn-outline-success" type="button" onClick={send}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cursor"
              viewBox="0 0 16 16"
            >
              <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z" />
            </svg>
          </button>
        </form>
      </div>
    );
  } else {
    return <Redirect to={{ pathname: "/home" }}></Redirect>;
  }
}

export default Chat;
