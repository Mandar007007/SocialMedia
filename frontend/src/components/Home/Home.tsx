import { useState, useEffect } from "react";
import Menu from "../Screens/Mobile/Menu/Menu";
import Footer from "../Screens/Mobile/Footer/Footer";
import Feed from "../Screens/Mobile/Feed/Feed";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import MenuSection from "../Screens/Desktop/Menu/MenuSection";
import ChatForm from "../Screens/Desktop/ChatForm/ChatForm";
import CommunitiesSection from "../Screens/Desktop/Communities/CommunitiesSection";

function Home() {
  const { user } = useSelector((state: RootState) => state.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile && (
        <div className="w-screen text-white">
          {/* Mobile Layout */}
          {user && <Menu />}
          <Feed />
          <Footer />
        </div>
      )}

      {!isMobile && (
        <div className="h-screen w-screen flex flex-row text-white px-10 py-5">
          <div className="w-1/12"></div>
          <div className="w-2/12 h-full m-5 ">{user && <MenuSection />}</div>
          <div className="w-6/12 flex flex-col ">
            <div className="h-auto m-5 rounded-lg border-2 border-slate-900 bg-slate-950">
              <ChatForm />
            </div>
            <div className="h-5/6 m-5 ">
              <Feed />
            </div>
          </div>
          <div className="w-4/12 flex flex-col">
            <CommunitiesSection />
          </div>
          <div className="w-1/12"></div>
        </div>
      )}
    </>
  );
}

export default Home;
