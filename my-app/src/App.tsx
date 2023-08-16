import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home/Home";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const loadUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/me", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true
       
      });

      if (data.user) {
        dispatch({ type: "SET_USER", payload: data.user }); // Dispatch the action here
      } else {
        dispatch({ type: "CLEAR_USER" }); // Dispatch the action here
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;