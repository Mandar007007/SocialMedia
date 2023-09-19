import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CommentForm from "./CommentForm";
import { IPost } from "../../interfaces/Model";

function Comment({ post }: { post: IPost }) {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <>
      <div className="w-full h-full flex items-center px-5">
        <img
          src={user?.avtar?.url || "fallback-url"}
          className="h-8 w-8 bg-slate-400 rounded-full sm:h-10 sm:w-10"
          alt="profile-pic"
        />
        <CommentForm post={post} />
      </div>
    </>
  );
}

export default Comment;
