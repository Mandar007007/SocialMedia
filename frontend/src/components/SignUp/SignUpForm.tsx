import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LeftToRight } from "../../other/motionVariants";
import ErrorResponseData from "../../interfaces/ErrorResponseData";

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(
    "https://i.pinimg.com/564x/e9/67/b6/e967b6e4219c0e895260d99e80bca317.jpg"
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avtar: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    if (name === "avtar" && files && files[0]) {
      const imageFile = files[0];

      // Use the updater function to ensure the state update is based on the previous state
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: imageFile,
      }));

      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log("formData before submit:", formData);

      const response = await axios.post(
        "http://localhost:4000/api/v1/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
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
        encType="multipart/form-data"
      >
        <motion.div className="flex column w-full center items-center justify-center">
          <label
            htmlFor="avatar"
            className="w-20 h-20 rounded-full border-2 border-orange-200 flex justify-center items-center truncate relative sm:w-24 sm:h-24"
          >
            <img src={selectedImage} alt="w-full h-full bg-cover absolute" />
          </label>
          <input
            type="file"
            id="avatar"
            name="avtar"
            accept="image/*"
            onChange={handleChange}
            aria-labelledby="avatar"
            className={`
            my-3 ml-3 hidden w-full text-sm text-slate-500 
            file:w-20 file:h-20
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-orange-50 file:text-black
            hover:file:bg-orange-100
            file:bg-center file:bg-cover file:bg-no-repeat
          `}
          />
        </motion.div>
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
