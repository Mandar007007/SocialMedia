import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LeftToRight } from "../../other/motionVariants";

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
        "http://localhost:4000/api/v1/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const userData = response.data.user;
      dispatch({ type: "SET_USER", payload: userData });
      navigate("/home");
    } catch (error) {
      const err = error as AxiosError<ErrorResponseData>;
      let message = "An error occurred during signup.";

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
        action=""
        method="POST"
        className="flex flex-col mt-5 text-left text-base"
      >
        <motion.label htmlFor="name" className="my-3">
          Name:
        </motion.label>
        <motion.input
          variants={LeftToRight}
          type="text"
          name="name"
          id="name"
          aria-labelledby="name"
          value={formData.name}
          onChange={handleChange}
          className="my-3 border-b-2 bg-transparent border-gray-400 focus:outline-none focus:border-slate-600 focus:invalid:border-pink-600 invalid:border-pink-600
 appearance-none"
        />
        <motion.label htmlFor="email" className="my-3">
          Email:
        </motion.label>
        <motion.input
          variants={LeftToRight}
          type="email"
          name="email"
          id="email"
          aria-labelledby="email"
          value={formData.email}
          onChange={handleChange}
          className="my-3 border-b-2 bg-transparent border-gray-400 focus:outline-none focus:border-slate-600 focus:invalid:border-pink-600 invalid:border-pink-600
 appearance-none"
        />
        <motion.label htmlFor="password" className="my-3">
          Password:
        </motion.label>
        <motion.input
          variants={LeftToRight}
          type="password"
          name="password"
          id="password"
          aria-labelledby="password"
          value={formData.password}
          onChange={handleChange}
          className="my-3 border-b-2 bg-transparent border-gray-400 focus:outline-none focus:border-slate-600 focus:invalid:border-pink-600 invalid:border-pink-600
 appearance-none"
        />
        <motion.div variants={LeftToRight} className="w-100 text-center">
          <button
            type="submit"
            className="w-[100%] my-10 text-lg font-bold bg-white text-black p-2 rounded-3xl hover:shadow-2xl sm:w-[50%]"
          >
            Signup
          </button>
        </motion.div>
      </form>
    </>
  );
}

export default SignUpForm;
