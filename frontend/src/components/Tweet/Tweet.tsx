import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import TweetForm from "./TweetForm";
import TweetProps from "../../interfaces/TweetProps";

function Tweet({ closeTweetForm }: TweetProps) {
  return (
    <motion.div className="flex flex-col h-[100%] w-[100%] bg-black text-white p-6  sm:rounded-3xl sm:w-[50%]">
      <div className="flex items-center justify-between w-full">
        <button
          className="mr-auto"
          title="Close Login"
          onClick={closeTweetForm}
        >
          <IoMdClose className="text-2xl sm:text-4xl" />
        </button>
      </div>

      <div className="my-8 text-xl font-black">
        <TweetForm closeTweetForm={closeTweetForm} />
      </div>
    </motion.div>
  );
}

export default Tweet;
