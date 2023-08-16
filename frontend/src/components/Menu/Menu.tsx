import { FaBars } from "react-icons/fa";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Items from "./Items";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Menu() {
  const { user } = useSelector((state: RootState) => state.user);

  const slidingMenuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex flex-row bg-black text-white justify-center items-center relative pt-2">
        <button
          className="mr-auto ml-5 fixed left-0"
          title="Menu"
          onClick={toggleMenu}
        >
          <FaBars className="text-white text-2xl" />
        </button>
        <img
          className="w-14 h-14 ml-auto mr-auto"
          src="/images/logo.svg"
          alt=""
        />
      </div>
      <motion.div
        ref={slidingMenuRef}
        initial={{ x: "-100%", visibility: "hidden" }}
        animate={{
          x: isMenuOpen ? 0 : "-100%",
          visibility: isMenuOpen ? "visible" : "hidden",
        }}
        exit={{ x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={toggleMenu}
        className="h-screen w-screen fixed top-0 right-0 z-10"
      >
        <motion.div className="h-screen w-5/6 mr-auto flex flex-col shadow-2xl shadow-white bg-black text-white py-5 px-4">
          <div className="font-bold text-xl mt-2">{user.name}</div>
          <div className="font-normal text-xs opacity-75 mt-3 tracking-wider">
            @{user.email}
          </div>
          <div className="flex flex-row w-[75%] mt-5">
            <div className="flex flex-row basis-1/2">
              <p className="mr-2 font-bold">{user.followers.length}</p>
              <p className="mr-1 font-thin opacity-75">followers</p>
            </div>
            <div className="flex flex-row basis-1/2">
              <p className="mr-2 font-bold">{user.following.length}</p>
              <p className="mr-1 font-thin opacity-75">following</p>
            </div>
          </div>
          <Items />
        </motion.div>
      </motion.div>
    </>
  );
}

export default Menu;
