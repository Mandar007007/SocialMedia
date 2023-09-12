import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import ErrorResponseData from "../interfaces/ErrorResponseData";
import { toast } from "react-toastify";

function Chatters() {
  const [chatters, setChatters] = useState([]);

  useEffect(() => {
    const fetchChatters = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/user/users", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setChatters(res.data.users);
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
    fetchChatters();
  }, []);
  return (
    <>
      <h1>{chatters}</h1>
    </>
  );
}

export default Chatters;
