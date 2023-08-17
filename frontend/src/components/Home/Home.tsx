import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import Feed from "../Feed/Feed";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Home() {
  const {user} = useSelector((state:RootState) => state.user)
  return (
    <>
      {user && <Menu />}
      <Feed />
      <Footer />
    </>
  );
}

export default Home;
