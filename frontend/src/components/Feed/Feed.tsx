import { useRef, useState } from "react";

function Feed() {
  const foryouRef = useRef(null);
  const followingRef = useRef(null);
  const [isForyouOpen, setIsForyouOpen] = useState(true);
  const [isFollowingOpen, setFollowingOpen] = useState(false);

  const changeFeed = () => {
    setIsForyouOpen(!isForyouOpen);
    setFollowingOpen(!isFollowingOpen);
  };

  return (
    <>
      <div className="w-screen text-white">
        <div className="flex flex-row w-full py-3 relative">
          <button
            className="basis-1/2 flex justify-center items-center"
            ref={foryouRef}
            onClick={() => changeFeed()}
          >
            <p
              className={`py-2 ${
                isForyouOpen ? "border-b-4 border-orange-400" : "opacity-50"
              }`}
            >
              For you
            </p>
          </button>
          <button
            className="basis-1/2 flex justify-center items-center"
            ref={followingRef}
            onClick={() => changeFeed()}
          >
            <p
              className={`py-2 ${
                isFollowingOpen ? "border-b-4 border-orange-400" : "opacity-50"
              }`}
            >
              Following
            </p>
          </button>
        </div>
        <hr className="border-t-2 border-slate-500" />
      </div>
    </>
  );
}

export default Feed;
