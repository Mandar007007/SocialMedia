import { useSelector } from "react-redux";
import { RootState } from "../../store";

function UserDetails() {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <>
      <img
        className="w-16 h-16 rounded-full border-1 my-2"
        src={user.avtar.url}
        alt="profile-pic"
      />
      <div className="font-bold text-xl mt-2">{user.name}</div>
      <div className="font-normal text-xs opacity-75 mt-3 tracking-wider">
        @{user.email}
      </div>
      <div className="flex flex-row w-[75%] mt-5">
        <div className="flex flex-row basis-1/2">
          <p className="mr-2 font-bold">{user.followers.length}</p>
          <p className="mr-1 font-thin opacity-75">followers</p>
        </div>
        <div className="flex flex-row basis-1/2">
          <p className="mr-2 font-bold">{user.following.length}</p>
          <p className="mr-1 font-thin opacity-75">following</p>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
