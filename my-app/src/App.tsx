import "./App.css";
import Login from "./components/Login/Login";
// import axios from "axios";
// import { useState, useEffect } from "react";

function App() {
  // const [data, setData] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:4000/api/v1/users");
  //       console.log(response);
  //       setData(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <Login />
    </>
  );
}

export default App;
