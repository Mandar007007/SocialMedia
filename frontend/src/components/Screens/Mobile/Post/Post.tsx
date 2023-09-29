import { BsChat } from "react-icons/bs";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { LiaBookmarkSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import formatTimeDifference from "../../../../functions/formatTimeDifference";
import { IPost, IUser } from "../../../../interfaces/Model";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment/Comment";
import ErrorResponseData from "../../../../interfaces/ErrorResponseData";
import CommentDisplay from "./Comment/CommentDisplay";

function Post({ post }: { post: IPost }) {
  const { user } = useSelector((state: RootState) => state.user);
  const [liked, setLiked] = useState<boolean>(false);
  const [openPost, setOpenPost] = useState<boolean>(false);
  const [owner, setOwner] = useState<IUser | null>(null);
  const [likedCount, setLikeCount] = useState(post.likes.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState(post);

  const updatePost = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/posts/${post._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Backend response:", res.data);
      setPostData(res.data.post);
    } catch (error) {
      const err = error as AxiosError<ErrorResponseData>;
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    const userLiked = post.likes.some(
      (like) => like._id.toLowerCase() === (user && user._id.toLowerCase())
    );
    setLiked(userLiked);
  }, [post.likes]);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/getUser/${post.owner}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setOwner(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOwner();
  }, []);

  const handleLike = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/post/${post._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLiked(!liked);
      setLikeCount(res.data.updatedLikesCount);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (event) => {
    try {
      const email = event.currentTarget
        .querySelector("div")
        .getAttribute("data-value");
      const response = await axios.get(
        `http://localhost:4000/api/v1/getByEmail/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const user = response.data.user[0];
      console.log("Fetched user:", user);
      dispatch({ type: "SET_PROUSER", payload: user });
      navigate("/profile");
    } catch (e) {
      const err = e as AxiosError<ErrorResponseData>;
      console.error("Error:", err.message);
    }
  };

  const openWholePost = () => {
    setOpenPost(true);
  };

  const closeWholePost = () => {
    setOpenPost(false);
  };

  return (
    <>
      <div className="w-full rounded-lg  text-xl my-8 border-2 border-slate-900 bg-slate-950 sm:my-8">
        <div className="h-12 border-b-2 py-4 border-slate-900 flex flex-row items-center px-4">
          <img
            src={owner?.avtar?.url || "fallback-url"}
            className="h-8 w-8 bg-slate-400 rounded-full"
            alt="profile-pic"
          />

          <div
            onClick={handleClick}
            className="text-md mx-3 text-white font-bold"
          >
            {owner && owner.name}
            <div className="hidden" data-value={owner?.email}></div>
          </div>
          <div className="text-sm mx-2 text-slate-200 font-thin ml-auto">
            {postData && postData.createdAt
              ? formatTimeDifference(postData.createdAt)
              : ""}
          </div>
        </div>
        <div
          className="border-b-2 border-slate-800 flex flex-col min-h-[70px] justify-center"
          onClick={openWholePost}
        >
          <div
            className="w-full font-normal text-md px-5 py-4 "
            onClick={openWholePost}
          >
            {postData && postData.caption}
          </div>
          {postData?.image.url && (
            <div className="w-full font-normal text-md px-5 py-4 ">
              <img src={postData?.image.url} alt="pic" />
            </div>
          )}
        </div>
        <div className="w-full h-10 border-b-2 border-slate-800 flex flex-row items-center justify-center py-2">
          <div className="w-full flex items-center justify-center">
            {liked ? (
              <MdFavorite
                className="text-xl text-orange-500 transition-opacity duration-300"
                onClick={handleLike}
              />
            ) : (
              <MdFavoriteBorder
                className="text-xl text-white opacity-80 transition-opacity duration-300"
                onClick={handleLike}
              />
            )}
            <p className="text-xs ml-3 text-orange-200">{likedCount}</p>
          </div>
          <div className="w-full flex items-center justify-center">
            <BsChat className="text-xl text-white opacity-80" />
            <p className="text-xs ml-3 text-orange-200">
              {postData && postData.comments && postData.comments.length}
            </p>
          </div>
          <div className="w-full flex items-center justify-center">
            <LiaBookmarkSolid className="text-xl text-white opacity-80" />
            <p className="text-xs ml-3 text-orange-200">0 </p>
          </div>
        </div>
        <div className="h-20 border-b-2 border-slate-800 flex flex-col">
          <Comment post={postData} updatePost={updatePost} />
        </div>
      </div>

      {openPost && (
        <div
          className="fixed z-40 top-0 left-0 w-full h-full bg-black rounded-lg shadow-sm text-xl my-8 border-3 border-slate-900 sm:bg-slate-500/70  sm:my-0 sm:flex sm:flex-col sm:items-center sm:justify-center "
          onClick={closeWholePost}
        >
          <div className="sm:w-[50%] bg-black sm:rounded-2xl">
            <RxCross2 className="w-8 h-8 m-4 z-10" onClick={closeWholePost} />
            <div className="h-12 border-b-2 py-4 border-slate-800 flex flex-row items-center px-4">
              <img
                src={owner?.avtar?.url || "fallback-url"}
                className="h-8 w-8 bg-slate-400 rounded-full"
                alt="profile-pic"
              />

              <div
                onClick={handleClick}
                className="text-md mx-3 text-white font-bold"
              >
                {owner && owner.name}
                <div className="hidden" data-value={owner?.email}></div>
              </div>
              <div className="text-sm mx-2 text-slate-200 font-thin ml-auto">
                {postData && postData.createdAt
                  ? formatTimeDifference(postData.createdAt)
                  : ""}
              </div>
            </div>
            <div
              className="border-b-2 border-slate-800 flex flex-col min-h-[70px] justify-center"
              onClick={openWholePost}
            >
              <div className="w-full font-normal text-md px-5 py-4 ">
                {postData && postData.caption}
              </div>
            </div>
            <div className="w-full h-10 border-b-2 border-slate-800 flex flex-row items-center justify-center py-2">
              <div className="w-full flex items-center justify-center">
                {liked ? (
                  <MdFavorite
                    className="text-xl text-orange-500 transition-opacity duration-300"
                    onClick={handleLike}
                  />
                ) : (
                  <MdFavoriteBorder
                    className="text-xl text-white opacity-80 transition-opacity duration-300"
                    onClick={handleLike}
                  />
                )}
                <p className="text-xs ml-3 text-orange-200">{likedCount}</p>
              </div>
              <div className="w-full flex items-center justify-center">
                <BsChat className="text-xl text-white opacity-80" />
                <p className="text-xs ml-3 text-orange-200">
                  {postData && postData.comments && postData.comments.length}
                </p>
              </div>
              <div className="w-full flex items-center justify-center">
                <LiaBookmarkSolid className="text-xl text-white opacity-80" />
                <p className="text-xs ml-3 text-orange-200">0 </p>
              </div>
            </div>
            <div className="h-20 border-b-2 border-slate-800 flex flex-col">
              <Comment post={postData} updatePost={updatePost} />
            </div>
            <div className="w-full px-4 max-h-60 overflow-y-auto">
              {post.comments.map((comment) => (
                <CommentDisplay key={comment.user} commentData={comment} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
