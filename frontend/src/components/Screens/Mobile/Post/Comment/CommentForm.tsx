import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import ErrorResponseData from "../../../../../interfaces/ErrorResponseData";
import { IPost } from "../../../../../interfaces/Model";
import { TbSend } from "react-icons/tb";

function CommentForm({
  post,
  updatePost,
}: {
  post: IPost;
  updatePost: () => void;
}) {
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
      updatePost();
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

  const isSubmitDisabled =
    formData.comment.length === 0 || formData.comment.length > 240;

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
          placeholder="Give your thoughts!!"
          value={formData.comment}
          onChange={handleChange}
          className="h-8 text-sm rounded-full w-full m-3 py-2 px-5 bg-slate-800 placeholder:text-orange-200 placeholder:opacity-80 sm:h-10 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
        />
        <button
          type="submit"
          className="text-sm font-bold bg-orange-400 text-white px-2 py-2 rounded-3xl hover:shadow-2xl opacity-95"
          disabled={isSubmitDisabled}
        >
          {" "}
          <TbSend />
        </button>
      </form>
    </>
  );
}

export default CommentForm;
