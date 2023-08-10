import { FaCopyright } from "react-icons/fa";
import Login from "../Login/Login";
import Signup from "../SignUp/SignUp";
import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { contextClass } from "../../other/customToaster";
import { ToastContainer } from "react-toastify";

function Index() {
  const loginControls = useAnimation();
  const signupControls = useAnimation();
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

  useEffect(() => {
    loginControls.start({
      y: isLoginOpen ? 0 : "100%",
      transition: { duration: 0.3 },
    });
  }, [isLoginOpen, loginControls]);

  useEffect(() => {
    signupControls.start({
      y: isSignupOpen ? 0 : "100%",
      transition: { duration: 0.3 },
    });
  }, [isSignupOpen, signupControls]);

  const closeSignup = () => {
    setIsSignupOpen(false);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col bg-black text-white p-8 justify-center">
        <div>
          <img src="/images/logo.svg" className="w-20 h-20" alt="" />
        </div>
        <div className="my-10 text-4xl font-black">
          <p>It's About Time</p>
        </div>
        <div className="my-3">
          <p className="my-2 text-2xl font-black">Join today.</p>
          <button
            onClick={toggleSignup}
            className="w-[100%] my-3 text-lg font-bold bg-orange-400 p-2 rounded-3xl  hover:shadow-2xl"
          >
            Create account
          </button>
        </div>
        <hr className="my-5" />
        <div className="my-3">
          <p className="my-2 text-xl font-black">Already have an account?</p>
          <button
            onClick={toggleLogin}
            className="w-[100%] my-3 text-lg font-bold text-orange-400 border p-2 rounded-3xl hover:shadow-2xl"
          >
            Sign in
          </button>
        </div>
        <div className="flex flex-row mt-5 text-slate-100 text-xs justify-center items-center px-20">
          <FaCopyright className="mr-2" />
          2023 Devchatter
        </div>
      </div>
      <motion.div
        ref={loginModalRef}
        className="h-screen w-screen fixed top-0 right-0 z-11"
        initial={{ y: "100%" }}
        animate={loginControls}
        exit={{ y: "100%" }}
      >
        <Login closeLogin={closeLogin} />
      </motion.div>
      <motion.div
        ref={signupModalRef}
        className="h-screen w-screen fixed top-0 right-0 z-11"
        initial={{ y: "100%" }}
        animate={signupControls}
        exit={{ y: "100%" }}
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
