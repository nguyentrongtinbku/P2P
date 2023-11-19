import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import HomePage from "./component/HomePage";
import Admin from "./component/AdminPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

{
  /* <input type="text" onChange={(e) => handleInputChange(e)} />
      <input type="text" onChange={(e) => handleInputChange2(e)} />
      <button onClick={handleClick}>Submit</button>
      <input type="text" onChange={(e) => handleInputChange3(e)} />
      <button onClick={handleClickfetch}>fetch</button> */
}
