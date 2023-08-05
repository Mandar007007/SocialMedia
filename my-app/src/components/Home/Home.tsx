import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
      try {
        dispatch({ type: "CLEAR_USER" });

        const {data} = await axios.get("http://localhost:4000/api/v1/logout",{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
        })
        navigate("/login")

      } catch (error) {
        console.error("Error during logout:", error);
      }
    };
    
  return (
    <div>
      <h1>Hello, world!</h1>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      
      <div className="w-100 text-center">
          <button
            onClick={handleSubmit}
            className="mt-10 p-2 rounded-full bg-slate-500 w-28 text-slate-50 hover:shadow-lg"
          >
            Logout
          </button>
        </div>
    
    </div>
  );
}

export default Home;
