import axios from "axios";
import { useState } from "react";
import './homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const jsonString = localStorage.getItem("userData");
const userData = JSON.parse(jsonString);

const HomePage = () => {
  const [input1, setstate1] = useState("");
  const [input2, setstate2] = useState("");
  const [input3, setstate3] = useState("");
  const [file, setfile] = useState("");

  const handleInputChange = (e) => {
    setstate1(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setstate2(e.target.value);
  };
  const handleInputChange3 = (e) => {
    setstate3(e.target.value);
  };
  const handleClick = async () => {
    publish(input1, input2, userData.data.username);
  };
  const handleClick2 = async () => {
    fet(input3);
  };
  const handleClick3 = async () => {
    var data = { username: userData.data.username };
    try {
      const value = await axios.post("http://localhost:8080/discover", data);
      setfile(value.data);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="User_container">
      <h2>Hello:{userData.data.username} </h2>
      <div className="user_page1">
        <h2>PUBLISH</h2>
        <input
          type="text" class="form-control"
          placeholder="Path"
          onChange={(e) => handleInputChange(e)}
        />
        <input
          type="text" class="form-control" 
          placeholder="File name"
          onChange={(e) => handleInputChange2(e)}
        />
        <div>
        <button type="button" class="btn btn-primary" onClick={handleClick}>Publish</button>
        </div>  
      </div>

      <div className="user_page2">
        <h2>FETCH</h2>
        <input
          type="text" class="form-control"  
          placeholder="File name"
          onChange={(e) => handleInputChange3(e)}
        />
        <button type="button" class="btn btn-primary" onClick={handleClick2}>Fetch</button>
      </div>
      <div className="user_page3">
        <h2>SHARED FILES</h2>
        <button type="button" class="btn btn-primary" onClick={handleClick3}>Reload</button>
        <div>
            {file ? "Shared files":""}
          {Array.isArray(file) ? (
            file.map((item, index) => <div key={index}>{item.path}</div>)
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
async function publish(path, name, username) {
  const data = {
    localFilePath: path,
    serverFileName: name,
    username: username,
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
    console.log(data)
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
      console.log("Sucess")
    } else {
      console.log("File not found");
    }
  } catch (error) {
    console.log("Error");
  }
}
export default HomePage;
