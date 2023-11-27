import axios from "axios";
import { useEffect, useState } from "react";
import "./adminpage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const [input1, setstate1] = useState("");
  const [input2, setstate2] = useState("");
  const [file, setfile] = useState("");
  const [ping, setping] = useState("");

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("userData"));
    console.log(admin.data.isAdmin !== true);
    {
      navigate("/home");
    }
  }, []);

  const handleInputChange = (e) => {
    setstate1(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setstate2(e.target.value);
  };
  const handleClick = async () => {
    var data = { username: input1 };
    try {
      const value = await axios.post("http://localhost:8080/discover", data);
      console.log(value.data);
      setfile(value.data);
    } catch (err) {
      alert(err);
    }
  };
  const handleClick2 = async () => {
    var data = { username: input2 };
    try {
      const value = await axios.post("http://localhost:8080/ping", data);
      setping(value.data);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="Admin_container">
      <h2>Hello: Admin</h2>
      <div className="admin_page1">
        <h2>Tệp đã chia sẻ</h2>
        <input
          type="text"
          class="form-control"
          placeholder="Nhập Username"
          onChange={(e) => handleInputChange(e)}
        />
        <button type="button" class="btn btn-primary" onClick={handleClick}>
          Discover
        </button>

        <div>
          {file ? "File đã chia sẻ" : ""}
          {Array.isArray(file) ? (
            file.map((item, index) => <div key={index}>{item.name_file}</div>)
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="admin_page2">
        <h2>Trạng thái hoạt động</h2>
        <input
          type="text"
          class="form-control"
          placeholder="Nhập Username"
          onChange={(e) => handleInputChange2(e)}
        />
        <button type="button" class="btn btn-primary" onClick={handleClick2}>
          Ping
        </button>
        <div>{ping}</div>
      </div>
    </div>
  );
};

export default Admin;
