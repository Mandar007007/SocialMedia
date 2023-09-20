import React, { useState } from "react";
import axios from "axios";

function Chatter({ chatter }) {
  const [followed, setFollowed] = useState(false);

  const handleFollowToggle = async () => {
    try {
      const response = await axios.get(`/api/v1/follow/${chatter._id}`);

      if (response.data.success) {
        setFollowed(!followed);
      } else {
        console.error(
          "Follow/Unfollow operation failed:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="w-[70%] flex flex-row items-center border-2 rounded-xl border-slate-700 my-5 px-5">
      <img
        className="w-10 h-10 rounded-full"
        src={chatter.avtar.url}
        alt="pic"
      />
      <div className="w-[40%] m-5">
        <p className="text-2xl font-bold">{chatter.name}</p>
        <p>{chatter.email}</p>
      </div>
      <button
        className="w-[40%] py-2 px-5 text-black font-bold bg-white rounded-full"
        onClick={handleFollowToggle}
      >
        {followed ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}

export default Chatter;
