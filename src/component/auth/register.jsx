import { useState } from "react";
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import './total.css';

const Register = () => {
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
        username:input1,
        password:input2
    }
    try {
      await axios.post("http://localhost:8080/register", data);
      navigate("/login");
    } catch (err) {
      alert(err)
    }
  };
  return (
    <div className="login">
      <h2>Register</h2>
      <input type="text" class="form-control" placeholder="Username" onChange={(e) => handleInputChange(e)} />
      <input type="text" class="form-control" placeholder="Password" onChange={(e) => handleInputChange2(e)} />
      <button type="button" class="btn btn-primary" onClick={handleClick}>Next</button>
    </div>
  );
};

export default Register;
