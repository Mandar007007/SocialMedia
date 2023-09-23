import { GiPlagueDoctorProfile } from "react-icons/gi";
import { CgCommunity } from "react-icons/cg";
import { TbSubtask, TbLogout } from "react-icons/tb";
import { LiaBookmarkSolid } from "react-icons/lia";
import { AiOutlineNotification } from "react-icons/ai";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Items({ isMobile, closeProfile, openProfile }) {
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
      <div className="w-[80%] flex flex-col mt-7">
        <div className="w-full flex items-center text-xl font-semibold my-3">
          <div className="basis-1/6">
            <GiPlagueDoctorProfile className="text-2xl" />
          </div>
          <div className="basis-5/6 w-full ml-5">
            {<Link to="/profile">Profile</Link>}
            {/* {!isMobile && <button onClick={openProfile}>Profile</button>} */}
          </div>
        </div>
        <div className="w-full flex items-center text-xl font-semibold my-3">
          <div className="basis-1/6">
            <AiOutlineNotification className="text-2xl" />
          </div>
          <div className="basis-5/6 w-full ml-5">Notifications</div>
        </div>
        <div className="w-full flex items-center text-xl font-semibold my-3">
          <div className="basis-1/6">
            <LiaBookmarkSolid className="text-2xl" />
          </div>
          <div className="basis-5/6 w-full ml-5">Bookmarks</div>
        </div>
        <div className="w-full flex items-center text-xl font-semibold my-3">
          <div className="basis-1/6">
            <CgCommunity className="text-2xl" />
          </div>
          <div className="basis-5/6 w-full ml-5">Communities</div>
        </div>
        <div className="w-full flex items-center text-xl font-semibold my-3">
          <div className="basis-1/6">
            <TbSubtask className="text-2xl" />
          </div>
          <div className="basis-5/6 w-full ml-5">Challenges</div>
        </div>
        <div className="w-full flex items-center text-xl font-semibold my-3">
          <div className="basis-1/6">
            <TbLogout className="text-2xl" />
          </div>
          <div className="basis-5/6 w-full ml-5" onClick={handleSubmit}>
            Logout
          </div>
        </div>
      </div>
    </>
  );
}

export default Items;
