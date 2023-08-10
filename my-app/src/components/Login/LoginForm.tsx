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
      navigate("/home");
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
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col mt-5 text-left text-base"
      >
        <motion.label htmlFor="email" className="my-3">
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
          className="my-3 border-b-2 bg-transparent border-gray-400 focus:outline-none focus:border-slate-500 focus:invalid:border-pink-600 invalid:border-pink-600 appearance-none"
        />
        <motion.label htmlFor="password" className="my-3">
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
          className="my-3 border-b-2 bg-transparent border-gray-400 focus:outline-none focus:border-slate-500 focus:invalid:border-pink-600 invalid:border-pink-600 appearance-none"
        />
        <motion.div variants={RightToLeft} className="w-100 text-center">
          <button
            type="submit"
            className="w-[100%] my-10 text-lg font-bold bg-white text-black p-2 rounded-3xl hover:shadow-2xl"
          >
            Login
          </button>
        </motion.div>
      </form>
    </>
  );
}

export default LoginForm;
