import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import ErrorResponseData from "../../interfaces/ErrorResponseData";
import { toast } from "react-toastify";
import { IPost } from "../../interfaces/Model";

function CommentForm({ post }: { post: IPost }) {
  const [formData, setFormData] = useState({
    comment: "",
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
      await axios.put(
        `http://localhost:4000/api/v1/post/comment/${post._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
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
        action="POST"
        onSubmit={handleSubmit}
        className="flex flex-row w-full h-full items-center justify-between"
      >
        <input
          type="text"
          name="comment"
          placeholder="Ask your thoughts!!"
          value={formData.message}
          onChange={handleChange}
          className="h-8 text-sm rounded-full w-full m-3 py-2 px-5 bg-slate-800 placeholder:text-orange-200 placeholder:opacity-80 sm:h-10 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
        />
        <button
          type="submit"
          className="text-md font-bold bg-orange-400 text-white px-5 py-1 rounded-3xl hover:shadow-2xl sm:py-2"
        >
          Post
        </button>
      </form>
    </>
  );
}

export default CommentForm;
