import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import { IoMdClose } from "react-icons/io";
import LoginProps from "../../../interfaces/LogInProps";
import ResetPassword from "./ResetPassword";

function Login({ closeLogin }: LoginProps) {
  return (
    <motion.div className="flex flex-col h-[100%] w-[100%] bg-black text-white p-8 sm:rounded-3xl sm:w-[50%] sm:h-auto sm:py-2">
      <div className="flex items-center justify-between w-full">
        <button className="mr-auto" title="Close Login" onClick={closeLogin}>
          <IoMdClose className="text-2xl sm:text-4xl" />
        </button>
        <div className="flex items-center">
          <img
            className="w-12 h-12 sm:h-20 sm:w-20"
            src="/images/logo.svg"
            alt=""
          />
        </div>
      </div>

      <div className="mt-10 text-3xl font-black">
        <p>Welcome back</p>
        <LoginForm />
      </div>
      <div className="mb-5 text-xl font-black">
        <ResetPassword />
      </div>
    </motion.div>
  );
}

export default Login;
