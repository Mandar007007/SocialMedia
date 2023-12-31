import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ErrorResponseData from "../../../../interfaces/ErrorResponseData";
import { IPost } from "../../../../interfaces/Model";
import Post from "../Post/Post";

function FollowingFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/posts/following",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setPosts(res.data.posts);
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

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post: IPost) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default FollowingFeed;
