import { TbCodePlus } from "react-icons/tb";
import { BiHomeSmile } from "react-icons/bi";
import { AiOutlineNotification } from "react-icons/ai";
import { FaWpexplorer } from "react-icons/fa";
import { CgCommunity } from "react-icons/cg";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Tweet from "../Tweet/Tweet";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const tweetFormModalRef = useRef(null);
  const [isTweetFormOpen, setIsTweetFormOpen] = useState(false);

  const toggleTweetForm = () => {
    setIsTweetFormOpen(!isTweetFormOpen);
  };

  const closeTweetForm = () => {
    setIsTweetFormOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-0 w-full flex flex-col text-white">
        <div
          className="w-12 h-12 flex items-center justify-center bg-orange-400 rounded-3xl my-2 ml-auto shadow-3xl shadow-white mx-5 my-8"
          onClick={toggleTweetForm}
        >
          <TbCodePlus className="text-3xl" />
        </div>
        <div className="w-[100%] h-14 flex flex-row justify-around items-center bg-black">
          <div className="w-full flex justify-center text-xl font-semibold my-3">
            <BiHomeSmile
              className="text-2xl"
              onClick={() => navigate("/home")}
            />
          </div>
          <div className="w-full flex justify-center text-xl font-semibold my-3">
            <FaWpexplorer className="text-2xl" />
          </div>
          <div className="w-full flex justify-center text-xl font-semibold my-3">
            <AiOutlineNotification className="text-2xl" />
          </div>
          <div className="w-full flex justify-center text-xl font-semibold my-3">
            <CgCommunity className="text-2xl" />
          </div>
        </div>
      </div>

      {/*  Mobile */}
      <motion.div
        ref={tweetFormModalRef}
        className="h-screen w-screen fixed top-0 right-0 z-40 bg-slate-50/25 sm:p-60 sm:hidden"
        initial={{ y: "100%", visibility: "hidden" }}
        animate={{
          y: isTweetFormOpen ? "0%" : "100%",
          visibility: isTweetFormOpen ? "visible" : "hidden",
        }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.3 }}
      >
        <Tweet closeTweetForm={closeTweetForm} />
      </motion.div>
    </>
  );
}

export default Footer;
