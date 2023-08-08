import SignUpForm from "./SignUpForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  parentAppearFromBehind,
  childRighToLeft,
} from "../../other/motionVariants";
import { contextClass } from "../../other/customToaster";

function Signup() {
  return (
    <>
      <motion.div className="flex flex-col h-screen w-screen sm:px-24 sm:py-16 sm:flex-row-reverse font-Lato shadow-lg shadow-cyan-100">
        <motion.div
          variants={parentAppearFromBehind}
          initial="initial"
          animate="animate"
          className="basis-1/2 bg-sky-950 flex flex-col"
        >
          <motion.div
            variants={childRighToLeft}
            className="basis-4/6 m-10 bg-slate-200 rounded-md opacity-75 p-36"
          ></motion.div>
          <motion.div
            variants={childRighToLeft}
            className="basis-2/6 px-10 font-light text-orange-100 text-center text-md"
          >
            Unlock the Power of Collaboration, Embrace the Flow of Progress.
            With CodeSync, unite in challenges like '100 Days of Code,' syncing
            your journey with the world one commit at a time. Connect, Create,
            and Inspire as we code together towards a brighter future.{" "}
            <motion.div
              variants={childRighToLeft}
              className="my-5 text-orange-300 font-extralight text-lg"
            >
              #DevLife #CodeCollaboration
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
            variants={childRighToLeft}
            className="basis-1/6 p-10 text-3xl"
          >
            <p className="font-Marck-Script">DevChatter</p>
          </motion.div>
          <motion.div variants={childRighToLeft} className="basis-4/6">
            <SignUpForm />
          </motion.div>
          <motion.div variants={childRighToLeft} className="basis-1/6 mb-6">
            Already have account?{" "}
            <motion.span>
              <Link to="/login">Login</Link>
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

export default Signup;
