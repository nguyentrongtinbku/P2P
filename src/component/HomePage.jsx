import axios from "axios";
import { useEffect, useState } from "react";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import File from "./file";

const HomePage = () => {
  const navigate = useNavigate();
  const [input1, setstate1] = useState("");
  const [input2, setstate2] = useState("");
  const [input3, setstate3] = useState("");
  const [file, setfile] = useState([]);
  const [userData, setuserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  useEffect(() => {
    const getdata = async () => {
      try {
        const value = await axios.get("http://localhost:8080/allfile");
        console.log(value.data);
        setfile(value.data);
      } catch (err) {
        alert(err);
      }
    };
    getdata();
  }, []);

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
    notify();
    publish(input1, input2, userData.data.username);
  };
  const handleClick2 = async (name_file) => {
    notifyfetch()
    fet(name_file);
  };

  const logout = async () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };
  const notify = () => toast.info("Add files successfully!");
  const notifyfetch = () => toast.info("Download file successfully!");


  return (
    <div className="User_container">
      <h2>Hello:{userData.data.username} </h2>
      <div className="user_page1">
        <h2>PUBLISH</h2>
        <input
          type="text"
          class="form-control"
          placeholder="Path"
          onChange={(e) => handleInputChange(e)}
        />
        <input
          type="text"
          class="form-control"
          placeholder="File name"
          onChange={(e) => handleInputChange2(e)}
        />
        <div>
          <button type="button" class="btn btn-primary" onClick={handleClick}>
            Publish
          </button>
          
        </div>
      </div>

      <div>
        <h2>FILE SHARE</h2>
      </div>

      <div className="user_page2">
        {Array.isArray(file) ? (
          file.map((item, index) => (
            <div
              className="file_detail"
              key={index}
              onClick={() => handleClick2(item.name_file)}
            >
              <File file_name={item.name_file} />
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
      <div className="user_page3">
        <div></div>
      </div>
      <button
        className="buttion_logout"
        type="button"
        class="btn btn-primary"
        onClick={logout}
      >
        Logout
      </button>
      <ToastContainer />
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
    console.log(data);
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
      console.log("Sucess");
    } else {
      console.log("File not found");
    }
  } catch (error) {
    console.log("Error");
  }
}
export default HomePage;
{
  /* <input
          type="text"
          class="form-control"
          placeholder="File name"
          onChange={(e) => handleInputChange3(e)}
        />
         <button type="button" class="btn btn-primary" onClick={handleClick2}>
          Fetch
        </button> */
}
