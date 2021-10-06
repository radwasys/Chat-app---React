import { db, storage } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
//public\Screenshot (10).png

const change = () => {
  // const imgref = ref(storage, img.current.files[0].name);
  // uploadBytes(imgref, img.current.files[0]);
};

const addUser = async (email, username, password) => {
  let type;
  try {
    const ref = await addDoc(collection(db, "users"), {
      email: email,
      username: username,
      password: password,
    });
    console.log(ref.id);
    type = "success";
  } catch (e) {
    type = "danger";
  }
  return type;
};

const getUser = async () => {
  const ref = doc(db, "users", "Nm2YBU7yChCgSXrwM9D1");
  const document = await getDoc(ref);
  console.log(document.data());
};

const getUsers = async () => {
  const snaps = await getDocs(collection(db, "users"));
  return snaps;
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

export { addUser, getUsers };
