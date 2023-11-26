import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import HomePage from "./component/HomePage";
import Admin from "./component/AdminPage";
import { Navigate } from 'react-router-dom';


function App() {
  const jsonString = localStorage.getItem("userData");
const userData = JSON.parse(jsonString);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={userData ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
