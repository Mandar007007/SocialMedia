import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { TbLogout, TbSubtask } from "react-icons/tb";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { AiOutlineNotification } from "react-icons/ai";
import { LiaBookmarkSolid } from "react-icons/lia";
import { CgCommunity } from "react-icons/cg";
import { FaWpexplorer } from "react-icons/fa";

function MenuSection() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      dispatch({ type: "CLEAR_USER" });

      await axios.get("http://localhost:4000/api/v1/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <>
      <div className="flex flex-col p-5 h-full fixed rounded-lg border-2 border-slate-900 bg-slate-950">
        <div className="h-2/6 w-full">
          <img
            className="w-24 h-24 rounded-full border-1 my-2"
            src={user?.avtar?.url}
            alt="profile-pic"
          />
          <div className="font-bold text-3xl mt-2">{user.name}</div>
          <div className="font-normal text-sm opacity-75 mt-3 tracking-wider">
            @{user.email}
          </div>
          <div className="flex flex-row w-[75%] mt-5">
            <div className="flex flex-row basis-1/2 items-baseline px-2">
              <p className="mr-2 text-2xl">{user.followers.length}</p>
              <p className="mr-1 font-thin opacity-75 tracking-wider">
                followers
              </p>
            </div>
            <div className="flex flex-row basis-1/2 items-baseline px-2">
              <p className="mr-2 text-2xl">{user.following.length}</p>
              <p className="mr-1 font-thin opacity-75 tracking-wider">
                following
              </p>
            </div>
          </div>
        </div>
        <div className="h-3/6 w-full">
          <div className="w-full flex items-center text-xl my-6">
            <div className="basis-1/6">
              <GiPlagueDoctorProfile className="text-3xl" />
            </div>
            <div className="basis-5/6 w-full ml-5 text-2xl">
              <Link to="/profile">Profile</Link>
            </div>
          </div>
          <div className="w-full flex items-center text-xl my-6">
            <div className="basis-1/6">
              <FaWpexplorer className="text-3xl" />
            </div>
            <div className="basis-5/6 w-full ml-5 text-2xl">
              <Link to="/profile">Explore</Link>
            </div>
          </div>
          <div className="w-full flex items-center text-xl my-6">
            <div className="basis-1/6">
              <AiOutlineNotification className="text-3xl" />
            </div>
            <div className="basis-5/6 w-full ml-5 text-2xl">Notifications</div>
          </div>
          <div className="w-full flex items-center text-xl my-6">
            <div className="basis-1/6">
              <LiaBookmarkSolid className="text-3xl" />
            </div>
            <div className="basis-5/6 w-full ml-5 text-2xl">Bookmarks</div>
          </div>
          <div className="w-full flex items-center text-xl my-6">
            <div className="basis-1/6">
              <CgCommunity className="text-3xl" />
            </div>
            <div className="basis-5/6 w-full ml-5 text-2xl">Communities</div>
          </div>
          <div className="w-full flex items-center text-xl my-3">
            <div className="basis-1/6">
              <TbSubtask className="text-3xl" />
            </div>
            <div className="basis-5/6 w-full ml-5 text-2xl">Challenges</div>
          </div>
        </div>
        <div className="flex w-full text-red-200 ">
          <div className="basis-1/6 mt-auto">
            <TbLogout className="text-3xl" />
          </div>
          <div
            className="basis-5/6 w-full ml-5 text-2xl cursor-pointer"
            onClick={handleSubmit}
          >
            Logout
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuSection;
