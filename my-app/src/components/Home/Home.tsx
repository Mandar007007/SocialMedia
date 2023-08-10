import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { RootState } from "../../store";

function Home() {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div>
      <Navbar />
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
