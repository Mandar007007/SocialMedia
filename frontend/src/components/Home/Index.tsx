import { FaCopyright } from "react-icons/fa";
import Login from "../Auth/Login/Login";
import Signup from "../Auth/SignUp/SignUp";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { contextClass } from "../../other/customToaster";
import { ToastContainer } from "react-toastify";

function Index() {
  const loginModalRef = useRef(null);
  const signupModalRef = useRef(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };
  const toggleSignup = () => {
    setIsSignupOpen(!isSignupOpen);
  };

  const closeSignup = () => {
    setIsSignupOpen(false);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col bg-black text-white p-8 justify-center">
        <div className="flex flex-col justify-center sm:flex-row sm:items-center sm:justify-around">
          <div className="sm:flex sm:justify-center sm:items-center">
            <img
              src="/images/logo.svg"
              className="w-16 h-16 sm:w-[70%] sm:h-[70%]"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center ">
            <div className="my-10 text-4xl font-black sm:text-8xl">
              <p>It's About Time</p>
            </div>
            <div className="my-3 sm:my-5">
              <p className="my-2 text-2xl font-black sm:text-3xl">
                Join today.
              </p>
              <button
                onClick={toggleSignup}
                className="w-[100%] my-3 text-lg font-bold bg-orange-400 p-2 rounded-3xl  hover:shadow-2xl sm:w-[50%] sm:p-3 sm:my-5"
              >
                Create account
              </button>
            </div>
            <hr className="my-5 w-[100%] sm:w-[50%]" />
            <div className="my-3 sm:my-5">
              <p className="my-2 text-xl font-black sm:text-3xl">
                Already have an account?
              </p>
              <button
                onClick={toggleLogin}
                className="w-[100%] my-3 text-lg font-bold text-orange-400 border p-2 rounded-3xl hover:shadow-2xl sm:w-[50%] sm:p-3 sm:my-5"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
        <div className="mt-5 w-full flex text-slate-100 text-xs justify-center items-center px-20 absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <FaCopyright className="mr-2" />
          2023 Devchatter
        </div>
      </div>

      {/* Desktop */}
      <motion.div
        ref={loginModalRef}
        className="h-screen w-screen fixed top-0 right-0 z-11 bg-slate-50/25 sm:p-60 hidden sm:block"
        initial={{ scale: 0, visibility: "hidden" }}
        animate={{
          scale: isLoginOpen ? 1 : 0,
          visibility: isLoginOpen ? "visible" : "hidden",
        }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.1 }}
      >
        <Login closeLogin={closeLogin} />
      </motion.div>
      <motion.div
        ref={signupModalRef}
        className="h-screen w-screen fixed top-0 right-0 z-11 bg-slate-50/25 sm:p-48 hidden sm:block"
        initial={{ scale: 0, visibility: "hidden" }}
        animate={{
          scale: isSignupOpen ? 1 : 0,
          visibility: isSignupOpen ? "visible" : "hidden",
        }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.1 }}
      >
        <Signup closeSignup={closeSignup} />
      </motion.div>

      {/* Mobile */}
      <motion.div
        ref={loginModalRef}
        className="h-screen w-screen fixed top-0 right-0 z-11 bg-slate-50/25 sm:p-60 sm:hidden"
        initial={{ y: "100%", visibility: "hidden" }}
        animate={{
          y: isLoginOpen ? "0%" : "100%",
          visibility: isLoginOpen ? "visible" : "hidden",
        }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.3 }}
      >
        <Login closeLogin={closeLogin} />
      </motion.div>
      <motion.div
        ref={signupModalRef}
        className="h-screen w-screen fixed top-0 right-0 z-11 bg-slate-50/25 sm:p-48 sm:hidden"
        initial={{ y: "100%", visibility: "hidden" }}
        animate={{
          y: isSignupOpen ? "0%" : "100%",
          visibility: isSignupOpen ? "visible" : "hidden",
        }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.3 }}
      >
        <Signup closeSignup={closeSignup} />
      </motion.div>
      <ToastContainer
        toastClassName={({ type }) =>
          contextClass[type || "default"] +
          " relative flex p-1 min-h-10 rounded justify-between overflow-hidden cursor-pointer opacity-90"
        }
        bodyClassName={() =>
          "text-sm font-semibold text-black font-med block p-3"
        }
      />
    </>
  );
}

export default Index;
