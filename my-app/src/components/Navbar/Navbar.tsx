import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Items from "./Items";

function Navbar() {
  const slidingMenuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const controls = useAnimation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    controls.start({
      x: isMenuOpen ? 0 : "100%",
      transition: { duration: 0.3 },
    });
  }, [isMenuOpen]);

  return (
    <>
      <div className="flex flex-row w-screen h-16 items-center bg-blue-950 shadow-md shadow-gray-800 text-orange-50">
        <p className="ml-3 font-Marck-Script text-2xl">DevChatter</p>
        <p className="ml-auto pr-3">
          <button title="Menu" onClick={toggleMenu}>
            <FaBars size={25} />
          </button>
        </p>
      </div>
      <motion.div
        ref={slidingMenuRef}
        className="h-screen w-screen fixed top-0 right-0 z-10"
        initial={{ x: "100%" }}
        animate={controls}
        exit={{ x: "100%" }}
      >
        <motion.div className="h-screen w-3/4 bg-blue-50 shadow-sm ml-auto">
          <motion.div className="flex flex-row-reverse">
            <button className="m-3" title="Close Menu" onClick={toggleMenu}>
              <IoMdClose size={35} />
            </button>
          </motion.div>
          <Items />
        </motion.div>
      </motion.div>
    </>
  );
}

export default Navbar;
