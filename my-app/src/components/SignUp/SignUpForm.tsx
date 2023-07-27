import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
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
      navigate("/");
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
      <h1>Welcome to, DevChatter</h1>
      <form
        onSubmit={handleSubmit}
        action=""
        method="POST"
        className="flex flex-col p-10 text-left text-base sm:p-20"
      >
        <label htmlFor="name" className="my-2">
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          aria-labelledby="name"
          value={formData.name}
          onChange={handleChange}
          className="my-2 border-b-2 bg-transparent border-gray-400 focus:outline-none focus:border-slate-500 appearance-none"
        />
        <label htmlFor="email" className="my-2">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          aria-labelledby="email"
          value={formData.email}
          onChange={handleChange}
          className="my-2 border-b-2 bg-transparent border-gray-400 focus:outline-none focus:border-slate-500 appearance-none"
        />
        <label htmlFor="password" className="my-2">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          aria-labelledby="password"
          value={formData.password}
          onChange={handleChange}
          className="my-2 border-b-2 bg-transparent border-gray-400 focus:outline-none focus:border-slate-500 appearance-none"
        />
        <div className="w-100 text-center">
          <button
            type="submit"
            className="mt-10 p-2 rounded-full bg-slate-500 w-28 text-slate-50 hover:shadow-lg"
          >
            Signup
          </button>
        </div>
        <div className="basis-1/6 mb-6" style={{margin:"auto",padding:"1vmax"}}>
            Already have account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </div>
      </form>
    </>
  );
}

export default SignUpForm;
