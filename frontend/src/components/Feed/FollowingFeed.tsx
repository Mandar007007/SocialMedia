import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

function FollowingFeed() {
  interface ErrorResponseData {
    msg?: string;
    message?: string;
  }

  useEffect(() => {
    try {
      const response = axios.get(
        "http://localhost:4000/api/v1/posts/following",
        {
          withCredentials: true,
        }
      );
      const posts = response.data.posts;
      console.log(posts);
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
  }, []);

  return (
    <>
      <div className="w-full"></div>
    </>
  );
}

export default FollowingFeed;
