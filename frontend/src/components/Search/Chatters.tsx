import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import ErrorResponseData from "../../interfaces/ErrorResponseData";
import { toast } from "react-toastify";
import Chatter from "./Chatter";

function Chatters() {
  const [chatters, setChatters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedChatters, setMatchedChatters] = useState([]);

  useEffect(() => {
    const fetchChatters = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/users", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(res);
        setChatters(res.data.users);
      } catch (error) {
        const err = error as AxiosError<ErrorResponseData>;
        console.log(err);
        let message = "An error occurred during login.";

        if (err.response && err.response.data) {
          if (err.response.data.msg) {
            message = err.response.data.msg;
          } else if (err.response.data.message) {
            message = err.response.data.message;
          }
        }
        toast.error(message);
      }
    };

    fetchChatters();
  }, []);

  useEffect(() => {
    const filteredChatters = chatters.filter((chatter) =>
      chatter.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedChatters = filteredChatters.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const top3Chatters = sortedChatters.slice(0, 3);
    setMatchedChatters(top3Chatters);
  }, [chatters, searchTerm]);

  return (
    <>
      <div className="h-screen w-full text-white">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="placeholder:text-black text-black w-[40%] my-2 rounded-full h-18 p-3 bg-slate-500"
        />
        <ul>
          {matchedChatters.map((chatter) => (
            <li key={chatter._id}>
              <Chatter chatter={chatter} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Chatters;
