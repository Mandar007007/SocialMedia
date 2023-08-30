import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ErrorResponseData from "../../interfaces/ErrorResponseData";
import TweetProps from "../../interfaces/TweetProps";

function TweetForm({ closeTweetForm }: TweetProps) {
  const { user } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({
    caption: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value.length <= 240) {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/post/upload", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      closeTweetForm();
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
        className="flex flex-col text-left text-base"
      >
        <motion.div className="w-100 text-center flex flex-row items-center">
          <img
            className="w-16 h-16 rounded-full border-1 border-orange-400"
            src={user && user.avtar.url}
            alt="profile-pic"
          />
          <button
            type="submit"
            className="w-[30%] my-10 text-lg font-bold bg-orange-400 text-white p-2 rounded-3xl hover:shadow-2xl sm:w-[50%] ml-auto"
          >
            Post
          </button>
        </motion.div>
        <motion.input
          type="text"
          name="caption"
          id="caption"
          aria-labelledby="caption"
          className="my-2 py-3 border-b-2 bg-transparent border-gray-400 focus:outline-none focus:border-slate-500 focus:invalid:border-pink-600 invalid:border-pink-600 appearance-none"
          placeholder="What's in your mind!"
          value={formData.caption}
          onChange={handleChange}
        />
        <p className="text-sm font-semibold text-orange-400">
          {240 - formData.caption.length}/240
        </p>
      </form>
    </>
  );
}

export default TweetForm;
