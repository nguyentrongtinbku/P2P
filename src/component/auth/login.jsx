import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [input1, setstate1] = useState("");
  const [input2, setstate2] = useState("");
  const handleInputChange = (e) => {
    setstate1(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setstate2(e.target.value);
  };
  const handleClick = async () => {
    let data = {
      username: input1,
      password: input2,
    };
    try {
      const user = await axios.post("http://localhost:8080/login", data);
        const jsonString = JSON.stringify(user);
        localStorage.setItem("userData", jsonString);
        navigate("/");
    } catch (err) {
      alert("Sai thông tin!");
    }
  };
  return (
    <div>
      <input type="text" onChange={(e) => handleInputChange(e)} />
      <input type="text" onChange={(e) => handleInputChange2(e)} />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
};

export default Login;
