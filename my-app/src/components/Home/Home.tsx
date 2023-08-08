import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { RootState } from "../../store";

function Home() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      dispatch({ type: "CLEAR_USER" });

      await axios.get("http://localhost:4000/api/v1/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <Navbar />
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}

      <div className="w-100 text-center">
        <button
          onClick={handleSubmit}
          className="mt-10 p-2 rounded-full bg-blue-900 w-28 text-slate-50 hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
