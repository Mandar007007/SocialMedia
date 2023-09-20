import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import About from "./About";
import MyFeed from "./MyFeed";
import { RootState } from "../../store";

function Profile({ isMobile, closeProfile }) {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <>
      {user && <About isMobile={isMobile} closeProfile={closeProfile} />}
      {isMobile && <Footer />}
      <MyFeed />
    </>
  );
}

export default Profile;
