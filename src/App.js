import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import HomePage from "./component/HomePage";
import Admin from "./component/AdminPage";
import { Navigate } from 'react-router-dom';


function App() {
  const [userData, setuserData] = useState(localStorage.getItem("userData") ? localStorage.getItem("userData") : null);
  // useEffect(() => {
  //   const getdata = async () => {
  //     try {
  //       const jsonString = await localStorage.getItem("userData");
  //       const data = await JSON.parse(jsonString);
  //       setuserData(data);
  //     } catch (err) {
  //       alert(err);
  //     }
  //   };
  //   getdata();
  // }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={userData ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
