import { useState } from "react";
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import './total.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const navigate = useNavigate();
  const [input1, setstate1] = useState("");
  const [input2, setstate2] = useState("");
  const notify = () => toast.info("Đăng kí thành công tài khoản!");
  const handleInputChange = (e) => {
    setstate1(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setstate2(e.target.value);
  };
  const handleClick = async () => {
    let data = {
        username:input1,
        password:input2
    }
    try {
      await axios.post("http://localhost:8080/register", data);
        notify();
      setTimeout(()=>{
        navigate("/login");
      }, 1000);
    } catch (err) {
      alert(err)
    }
  };
  return (
    <div className="login">
      <ToastContainer />
      <h2>Register</h2>
      <input type="text" class="form-control" placeholder="Username" onChange={(e) => handleInputChange(e)} />
      <input type="password" class="form-control" placeholder="Password" onChange={(e) => handleInputChange2(e)} />
      <button className="buttion_auth" type="button" onClick={handleClick}> Register </button>
      <button className="buttion_auth1" type="button"  onClick={()=>{navigate('/login')}}> Login </button>
    </div>
  );
};

export default Register;
