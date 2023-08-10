import { motion } from "framer-motion";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";

import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Items() {
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
    <>
      <motion.div className="h-screen mt-4">
        <motion.ul className="flex flex-col h-[80%] text-xl font-semibold text-blue-950">
          <motion.li className="m-3 flex flex-row justify-center items-center">
            <AiOutlineHome />
            <p className="ml-2">Home</p>
          </motion.li>
          <motion.li className="m-3 flex flex-row justify-center items-center">
            <AiOutlineSearch />
            <p className="ml-2"> Explore</p>
          </motion.li>
          <motion.li className="m-3 flex flex-row justify-center items-center">
            <AiOutlineBell /> <p className="ml-2"> Notifications </p>
          </motion.li>
          <motion.li className="m-3 flex flex-row justify-center items-center">
            <AiOutlineUser /> <p className="ml-2"> Profile </p>
          </motion.li>
          <motion.li
            onClick={handleSubmit}
            className="m-3 mt-auto flex flex-row justify-center items-center text-red-700"
          >
            <AiOutlineLogout /> <p className="ml-2"> Logout </p>
          </motion.li>
        </motion.ul>
      </motion.div>
    </>
  );
}

export default Items;
