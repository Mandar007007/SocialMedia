import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RightToLeft } from "../../other/motionVariants";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  interface ErrorResponseData {
    msg?: string;
    message?: string;
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const userData = response.data.user;
      console.log("Response Headers:", response.headers);

      dispatch({ type: "SET_USER", payload: userData });
      navigate("/");
    } catch (error) {
      const err = error as AxiosError<ErrorResponseData>;
      console.log(err);
      let message = "An error occurred during login.";

      if (err.response && err.response.data) {
        if (err.response.data.msg) {
          message = err.response.data.msg;
        } else if (err.response.data.message) {
          message = err.response.data.message;
        }
      }
      toast.error(message);
    }
  };
  return (
    <>
      <motion.div variants={RightToLeft}>Welcome to, DevChatter</motion.div>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col p-10 text-left text-base sm:p-20"
      >
        <motion.label htmlFor="email" className="my-2">
          Email:
        </motion.label>
        <motion.input
          variants={RightToLeft}
          type="email"
          name="email"
          id="email"
          aria-labelledby="email"
          value={formData.email}
          onChange={handleChange}
          className="my-2 border-b-2 bg-transparent border-gray-400 focus:outline-none focus:border-slate-500 focus:invalid:border-pink-600 invalid:border-pink-600 appearance-none"
        />
        <motion.label htmlFor="password" className="my-2">
          Password:
        </motion.label>
        <motion.input
          variants={RightToLeft}
          type="password"
          name="password"
          id="password"
          aria-labelledby="password"
          value={formData.password}
          onChange={handleChange}
          className="my-2 border-b-2 bg-transparent border-gray-400 focus:outline-none focus:border-slate-500 focus:invalid:border-pink-600 invalid:border-pink-600 appearance-none"
        />
        <motion.div variants={RightToLeft} className="w-100 text-center">
          <button
            type="submit"
            className="mt-10 p-2 rounded-full bg-slate-500 w-28 text-slate-50 hover:shadow-lg"
          >
            Login
          </button>
        </motion.div>
      </form>
    </>
  );
}

export default LoginForm;
