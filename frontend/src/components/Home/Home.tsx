import { useState, useEffect } from "react";
import Menu from "../Screens/Mobile/Menu/Menu";
import Footer from "../Screens/Mobile/Footer/Footer";
import Feed from "../Screens/Mobile/Feed/Feed";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

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

      {isMobile && (
        <div className="h-screen w-screen col-span-7 row-span-5"></div>
      )}
    </>
  );
}

export default Home;
