import { db } from "./firebase.js";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";

function App() {
  const addUser = async () => {
    try {
      const ref = await addDoc(collection(db, "users"), {
        email: "tokkahamdy@gmail.com",
        username: "tokka",
        password: "tokka25",
      });
      console.log(ref.id);
    } catch (e) {
      console.error(e);
    }
  };

  const getUser = async () => {
    const ref = doc(db, "users", "Nm2YBU7yChCgSXrwM9D1");
    const document = await getDoc(ref);
    console.log(document.data());
  };

  return (
    <div className="App">
      <button onClick={addUser}>add</button>
      <button onClick={getUser}>get</button>
    </div>
  );
}

export default App;
