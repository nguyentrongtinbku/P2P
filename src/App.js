import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import HomePage from "./component/auth/HomePage";

async function publish(path, name) {
  const data = {
    localFilePath: path,
    serverFileName: name,
  };
  console.log(data);
  try {
    const response = await fetch("http://localhost:8080/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
  } catch (error) {
    console.log("An error occurred:" + error);
  }
}
async function fet(serverFileName) {
  try {
    const response = await fetch("http://localhost:8080/fet", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: serverFileName,
    });
    if (response.ok) {
      const fileInfo = await response.json();
    } else {
      console.log("File not found");
    }
  } catch (error) {
    console.log("Error");
  }
}

function App() {
  const [input1, setstate1] = useState("");
  const [input2, setstate2] = useState("");
  const [input3, setstate3] = useState("");

  const handleInputChange = (e) => {
    setstate1(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setstate2(e.target.value);
  };
  const handleInputChange3 = (e) => {
    setstate3(e.target.value);
  };

  const handleClick = () => {
    console.log(input1, input2);
    publish(input1, input2);
  };
  const handleClickfetch = () => {
    console.log(input3);
    fet(input3);
  };
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

{
  /* <input type="text" onChange={(e) => handleInputChange(e)} />
      <input type="text" onChange={(e) => handleInputChange2(e)} />
      <button onClick={handleClick}>Submit</button>
      <input type="text" onChange={(e) => handleInputChange3(e)} />
      <button onClick={handleClickfetch}>fetch</button> */
}
