import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import Feed from "../Feed/Feed";
import { Route } from "react-router-dom";

function Home() {
  return (
    <>
      <Menu />
      <Feed />
      <Footer />
    </>
  );
}

export default Home;
