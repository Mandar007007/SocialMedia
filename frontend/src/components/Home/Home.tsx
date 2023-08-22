import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import Feed from "../Feed/Feed";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Home() {
  const {user} = useSelector((state:RootState) => state.user)
  return (
    <>
    <div className="w-screen sm:flex z-20 text-white sm:my-6 sm:mx-18 text-white">
      <div className="sm:basis-2/6 ">{user && <Menu />}</div>
      <div className="sm:basis-3/6 " ><Feed /></div>
      <div className="sm:basis-2/6">Explore</div>
      <div className="sm:hidden"><Footer /></div>
      </div>
    </>
  );
}

export default Home;
