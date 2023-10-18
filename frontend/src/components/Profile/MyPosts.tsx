import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import ErrorResponseData from "../../interfaces/ErrorResponseData";
import { IPost } from "../../interfaces/Model";
import Post from "../Screens/Mobile/Post/Post";
import { useSelector } from "react-redux";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const {prouser} = useSelector((state:RootState) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/posts/me", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setPosts(res.data.posts);
      } catch (error) {
        const err = error as AxiosError<ErrorResponseData>;
        console.log(err);
      }
    };
    const fetchPostsOfProUser = async () => {
      try{
        const response = await axios.get(`http://localhost:4000/api/v1/posts/getLikedOfPro/${prouser._id}`,{
          headers:{
            "Content-Type": "application/json",
          },
          withCredentials:true
        })

        setPosts(response.data.posts)
      }catch(error)
      {
        const err = error as AxiosError<ErrorResponseData>;
        console.log(err);
      }
    }
    if(prouser)
      fetchPostsOfProUser();
    else
      fetchPosts();
  }, []);

  return (
    <>
      <div>
        {posts.map((post: IPost) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}

export default MyPosts;
