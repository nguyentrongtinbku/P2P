import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './total.css';

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
        console.log(user.data.isAdmin)
        const jsonString = JSON.stringify(user);
        localStorage.setItem("userData", jsonString);
        if(user.data.isAdmin === true)
        {
          navigate("/admin")
        }else navigate("/")
    } catch (err) {
      alert("Sai thông tin!");
    }
  };
  return (
    <div className="login">
      <h2>Login</h2>
      <input type="text" class="form-control" placeholder="Username" onChange={(e) => handleInputChange(e)} />
      <input type="password" class="form-control" placeholder="Password" onChange={(e) => handleInputChange2(e)} />
      <button type="button" class="btn btn-primary" onClick={handleClick}> Login </button>
    </div>
  );
};

export default Login;
