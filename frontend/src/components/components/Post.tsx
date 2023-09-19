import { BsChat } from "react-icons/bs";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { LiaBookmarkSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import formatTimeDifference from "../../functions/formatTimeDifference";
import { IPost, IUser } from "../../interfaces/Model";
import Comment from "../Comment/Comment";

function Post({ post }: { post: IPost }) {
  const { user } = useSelector((state: RootState) => state.user);
  const [liked, setLiked] = useState<boolean>(false);
  const [owner, setOwner] = useState<IUser | null>(null);
  const [likedCount, setLikeCount] = useState(post.likes.length);

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

  return (
    <>
      <div className="w-full rounded-lg shadow-sm text-xl my-8 border-3 border-slate-900  sm:my-8">
        <div className="h-12 border-b-2 py-4 border-slate-800 flex flex-row items-center px-4">
          <img
            src={owner?.avtar?.url || "fallback-url"}
            className="h-8 w-8 bg-slate-400 rounded-full"
            alt="profile-pic"
          />

          <div className="text-md mx-3 text-white font-bold">
            {owner && owner.name}
          </div>
          <div className="text-sm mx-2 text-slate-200 font-thin ml-auto">
            {formatTimeDifference(post.createdAt)}
          </div>
        </div>
        <div className="border-b-2 border-slate-800 flex flex-col min-h-[70px] justify-center">
          <div className="w-full font-normal text-md px-5 py-2 sm:text-xl">
            {post.caption}
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
            <p className="text-xs ml-3 text-orange-200">{likedCount} </p>
          </div>
          <div className="w-full flex items-center justify-center">
            <BsChat className="text-xl text-white opacity-80" />
            <p className="text-xs ml-3 text-orange-200">
              {post.comments.length}
            </p>
          </div>
          <div className="w-full flex items-center justify-center">
            <LiaBookmarkSolid className="text-xl text-white opacity-80" />
            <p className="text-xs ml-3 text-orange-200">0 </p>
          </div>
        </div>
        <div className="h-20 border-b-2 border-slate-800 flex flex-col">
          <Comment post={post} />
        </div>
      </div>
    </>
  );
}

export default Post;
