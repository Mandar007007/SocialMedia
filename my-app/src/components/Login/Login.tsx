import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import {
  parentAppearFromBehind,
  childLeftToRight,
} from "../../other/motionVariants";
import { contextClass } from "../../other/customToaster";

function Login() {
  return (
    <>
      <motion.div className="flex flex-col h-screen w-screen sm:px-24 sm:py-16 sm:flex-row font-Lato shadow-lg shadow-cyan-100">
        <motion.div
          variants={parentAppearFromBehind}
          initial="initial"
          animate="animate"
          className="basis-1/2 bg-sky-950 flex flex-col"
        >
          <motion.div
            variants={childLeftToRight}
            className="basis-4/6 m-10 bg-slate-300 rounded-md opacity-75 p-36"
          ></motion.div>
          <motion.div
            variants={childLeftToRight}
            className="basis-2/6 px-10 sm:px-20 font-light text-orange-100 text-center text-md"
          >
            Sync your code, share your journey. Embrace challenges, commit to
            progress, and connect with fellow developers. Join the coding
            community where ideas flourish, projects thrive, and inspiration
            flows. Together, let's build a world where every line of code makes
            a difference.
            <motion.div
              variants={childLeftToRight}
              className="my-5 text-orange-300 font-extralight text-xl"
            >
              #ShareYourCode #CodeTogether
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={parentAppearFromBehind}
          initial="initial"
          animate="animate"
          className="basis-1/2 bg-zinc-100 flex flex-col w-100 text-center"
        >
          <motion.div
            variants={childLeftToRight}
            className="basis-1/6 p-10 text-3xl"
          >
            <p className="font-Marck-Script">DevChatter</p>
          </motion.div>
          <motion.div variants={childLeftToRight} className="basis-4/6">
            <LoginForm />
          </motion.div>
          <motion.div variants={childLeftToRight} className="basis-1/6 mb-6">
            New Dev?{" "}
            <motion.span>
              <Link to="/signup">Create Account</Link>
            </motion.span>
          </motion.div>
        </motion.div>
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

export default Login;
