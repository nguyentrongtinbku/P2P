import axios from "axios";
import { useState } from "react";

const jsonString = localStorage.getItem("userData");
const userData = JSON.parse(jsonString);
console.log(userData.data.username);

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
    var data = { ipv4: -1 };
    try {
      const value = await axios.post("http://localhost:8080/discover", data);
      setfile(value.data);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="User_container">
      <h2>Xinchao: user</h2>
      <div className="user_page1">
        <h2>Tải lên</h2>
        <input
          type="text"
          placeholder="Đường dẫn"
          onChange={(e) => handleInputChange(e)}
        />
        <input
          type="text"
          placeholder="Tên"
          onChange={(e) => handleInputChange2(e)}
        />
        <button onClick={handleClick}>Tải lên</button>
      </div>

      <div className="user_page2">
        <h2>Tải xuống</h2>
        <input
          type="text"
          placeholder="Tên"
          onChange={(e) => handleInputChange3(e)}
        />
        <button onClick={handleClick2}>Tải xuống</button>
      </div>
      <div className="user_page3">
        <h2>Tệp đã chia sẻ</h2>
        <button onClick={handleClick3}>Hiển thị</button>
        <div>
            {file ? "File đã chia sẻ":""}
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
export default HomePage;
