import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './total.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [input1, setstate1] = useState("");
  const [input2, setstate2] = useState("");
  const notify = () => toast.info("Sai Thông tin!");
  const handleInputChange = (e) => {
    setstate1(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setstate2(e.target.value);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    let data = {
      username: input1,
      password: input2,
    };
    try {
      const user = await axios.post("http://localhost:8080/login", data);
        const jsonString = await JSON.stringify(user);
        await localStorage.setItem("userData", jsonString);
        if(user.data.isAdmin === true)
        {
          navigate("/admin")
        }else {navigate("/home")}
    } catch (err) {
      notify()
    }
  };
  return (
    <div className="login">
      <h2>Login</h2>
      <input type="text" class="form-control" placeholder="Username" onChange={(e) => handleInputChange(e)} />
      <input type="password" class="form-control" placeholder="Password" onChange={(e) => handleInputChange2(e)} />
      <button className="buttion_auth" type="button" onClick={()=>{navigate("/register")}}> Register </button>
      <button className="buttion_auth1" type="button"  onClick={handleClick}> Login </button>
      <ToastContainer />
    </div>
  );
};

export default Login;
