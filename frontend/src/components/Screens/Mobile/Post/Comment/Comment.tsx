import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { IPost } from "../../../../../interfaces/Model";
import CommentForm from "./CommentForm";

function Comment({
  post,
  updatePost,
}: {
  post: IPost;
  updatePost: () => void;
}) {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <>
      <div className="w-full h-full flex items-center px-5">
        <img
          src={user?.avtar?.url || "fallback-url"}
          className="h-6 w-6 bg-slate-400 rounded-full sm:h-10 sm:w-10"
          alt="profile-pic"
        />
        <CommentForm post={post} updatePost={updatePost} />
      </div>
    </>
  );
}

export default Comment;
