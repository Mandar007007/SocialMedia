import { motion } from "framer-motion";

function Items() {
  return (
    <>
      <motion.div className="h-screen mt-4">
        <motion.ul className="flex flex-col h-[80%] items-center">
          <motion.li className="m-3">Home</motion.li>
          <motion.li className="m-3">Explore</motion.li>
          <motion.li className="m-3">Notifications</motion.li>
          <motion.li className="m-3">Profile</motion.li>
          <motion.li className="m-3 mt-auto">Logout</motion.li>
        </motion.ul>
      </motion.div>
    </>
  );
}

export default Items;
