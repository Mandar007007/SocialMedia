import { FaBars } from "react-icons/fa";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Items from "./Items";
import UserDetails from "./UserDetails";

function Menu() {
  const slidingMenuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="flex w-full bg-black text-white pt-2">
          <button className="ml-2" title="Menu" onClick={toggleMenu}>
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
          className="h-screen w-screen fixed top-0 right-0 z-40"
        >
          <motion.div className="h-screen w-5/6 mr-auto flex flex-col shadow-2xl shadow-white bg-black text-white py-5 px-4">
            <UserDetails />
            <Items />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default Menu;
