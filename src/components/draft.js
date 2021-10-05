import { db, storage, app } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createRef, useState } from "react";
import { alert } from "./alert.js";
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
//public\Screenshot (10).png

const change = () => {
  // const imgref = ref(storage, img.current.files[0].name);
  // uploadBytes(imgref, img.current.files[0]);
};

const addUser = async (email, username, password) => {
  var error = false;
  try {
    const ref = await addDoc(collection(db, "users"), {
      email: email,
      username: username,
      password: password,
    });
    console.log(ref.id);
    error = false;
  } catch (e) {
    alert("Error while adding User, Try again later.", "danger");
    error = true;
  }
  return error;
};

const getUser = async () => {
  const ref = doc(db, "users", "Nm2YBU7yChCgSXrwM9D1");
  const document = await getDoc(ref);
  console.log(document.data());
};

const displayImg = () => {
  const refrence = ref(
    storage,
    "gs://react-chat-app-5b4a9.appspot.com/Screenshot (10).png"
  );
  getDownloadURL(refrence)
    .then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();

      // setUrl(url); store url in variable
    })
    .catch((error) => {
      console.error(error);
    });
};

export { addUser };
