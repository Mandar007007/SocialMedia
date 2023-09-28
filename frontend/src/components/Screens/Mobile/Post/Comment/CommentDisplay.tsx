import axios from "axios";
import { useEffect, useState } from "react";
import { IUser } from "../../../../../interfaces/Model";

function CommentDisplay({ commentData }) {
  const [owner, setOwner] = useState<IUser | null>(null);
  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/getUser/${commentData.user}`,
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
  return (
    <>
      <div className="w-full my-5 flex items-center border-1 px-5 py-5 border-slate-700 rounded-xl">
        <img
          src={owner?.avtar?.url || "fallback-url"}
          className="h-6 w-6 bg-slate-400 rounded-full"
          alt="profile-pic"
        />
        <div className="text-sm w-[70%] pl-5 text-white">
          <div className="text-md font-semibold">{owner?.name}</div>
          <div className="text-md font-thin">
            {commentData && commentData.comment}
          </div>
        </div>
      </div>
    </>
  );
}
export default CommentDisplay;
