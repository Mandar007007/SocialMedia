import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import ErrorResponseData from "../../interfaces/ErrorResponseData";
import { IPost } from "../../interfaces/Model";

function Recommendation() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/posts/recommendation",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setPosts(res.data.posts);
        console.log(res.data);
      } catch (error) {
        const err = error as AxiosError<ErrorResponseData>;
        console.log(err);
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

export default Recommendation;
