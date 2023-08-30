import { BsChat } from "react-icons/bs";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { LiaBookmarkSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import formatTimeDifference from "../../functions/formatTimeDifference";
import { IPost, IUser } from "../../interfaces/Model";

function Post({ post }: { post: IPost }) {
  const { user } = useSelector((state: RootState) => state.user);
  const [liked, setLiked] = useState<boolean>(false);
  const [owner, setOwner] = useState<IUser | null>(null);
  const [likedCount, setLikeCount] = useState(post.likes.length);

  useEffect(() => {
    const userLiked = post.likes.some(
      (like) => like._id.toLowerCase() === user._id.toLowerCase()
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
    <div className="w-screen flex flex-col p-2 text-md border-b-slate-400 border-b-1">
      <div className="w-full flex flex-row items-start">
        <img
          className="w-8 h-8 rounded-full mt-3"
          src={owner?.avtar?.url || "fallback-url"}
          alt="profile-pic"
        />
        <div className="w-full flex flex-col ml-3">
          <div className="font-bold my-2 text-md flex items-baseline">
            <p>{owner && owner.name}</p>
            <p className="font-thin text-xs ml-auto text-slate-200">
              {formatTimeDifference(post.createdAt)}
            </p>
          </div>
          <div className="text-sm">{post.caption}</div>
          <div className="w-full flex flex-row mx-2 justify-around mt-2 mb-1">
            <div className="w-full flex items-center">
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
            <div className="w-full flex items-center">
              <BsChat className="text-xl text-white opacity-80" />
              <p className="text-xs ml-3 text-orange-200">
                {post.comments.length}
              </p>
            </div>
            <div className="w-full flex items-center">
              <LiaBookmarkSolid className="text-xl text-white opacity-80" />
              <p className="text-xs ml-3 text-orange-200">0 </p>
            </div>
          </div>
        </div>
      </div>
      {/* <img src={post.image.public_url} alt="Post" /> */}
    </div>
  );
}

export default Post;
