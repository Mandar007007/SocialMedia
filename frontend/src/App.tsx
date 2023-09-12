import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home/Home";
import Index from "./components/Home/Index";
import Profile from "./components/Profile/Profile";

function App() {
  // const tokenCookieExists = document.cookie.includes("token");
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
