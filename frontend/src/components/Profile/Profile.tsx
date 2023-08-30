import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import About from "./About";
import MyFeed from "./MyFeed";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

function Profile() {
  const { user } = useSelector((state: RootState) => state.user);

  interface ErrorResponseData {
    msg?: string;
    message?: string;
  }

  const [posts, setPosts] = useState([]);

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

    fetchPosts();
  }, []);

  return (
    <>
      {user && <About />}
      <Footer />
      <MyFeed />
    </>
  );
}

export default Profile;
