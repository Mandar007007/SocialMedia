import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home/Home";

import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";


function App() {

  const dispatch = useDispatch();
  const loadUser = async () => {
    const {data} = await axios.get('http://localhost:4000/api/v1/me',{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    dispatch({type:"SET_USER",payload:data.user})
  }

  useEffect(() => {
    loadUser();
  },[dispatch])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
