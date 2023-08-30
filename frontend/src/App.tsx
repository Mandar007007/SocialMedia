import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home/Home";
import axios, { AxiosError } from "axios";
import Index from "./components/Home/Index";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Profile from "./components/Profile/Profile";
import { toast } from "react-toastify";
import ErrorResponseData from "./interfaces/ErrorResponseData";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
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
        const err = error as AxiosError<ErrorResponseData>;
        let message = "An error occurred during signup.";

        if (err.response && err.response.data) {
          if (err.response.data.msg) {
            message = err.response.data.msg;
          } else if (err.response.data.message) {
            message = err.response.data.message;
          }
        }
        toast.error(message);
      }
    };
    loadUser();
  }, []);

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
