import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home/Home";
import Index from "./components/Home/Index";
import Profile from "./components/Profile/Profile";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const loadUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/me", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (data.user) {
        dispatch({ type: "SET_USER", payload: data.user });
      } else {
        dispatch({ type: "CLEAR_USER" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadUser();
  }, [Profile]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
