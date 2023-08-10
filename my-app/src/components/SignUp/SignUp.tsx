import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import SignUpForm from "./SignUpForm";

function Signup({ closeSignup }) {
  return (
    <motion.div className="flex flex-col h-[100%] w-[100%] bg-black text-white p-8 ">
      <div className="flex items-center justify-between w-full">
        <button className="mr-auto" title="Close Login" onClick={closeSignup}>
          <IoMdClose className="text-2xl" />
        </button>
        <div className="flex items-center">
          <img className="w-12 h-12" src="/images/logo.svg" alt="" />
        </div>
      </div>
      <div className="my-10 text-3xl font-black">
        <p>Create your account</p>
        <SignUpForm />
      </div>
    </motion.div>
  );
}

export default Signup;
