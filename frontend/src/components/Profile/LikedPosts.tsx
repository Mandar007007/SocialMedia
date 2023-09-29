import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import ErrorResponseData from "../../interfaces/ErrorResponseData";
import { IPost } from "../../interfaces/Model";
import Post from "../Screens/Mobile/Post/Post";

function LikedPosts() {
  const [posts, setPosts] = useState([]); // Provide the type here

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
      {posts.map((post: IPost) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default LikedPosts;
