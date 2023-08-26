import Post from "../components/Post";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
function LikedPosts() {
  interface ErrorResponseData {
    msg?: string;
    message?: string;
  }

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/posts/liked",
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
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default LikedPosts;
