import SignUpForm from "./SignUpForm";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <>
      <div className="flex flex-col h-screen w-screen sm:px-24 sm:py-16 sm:flex-row-reverse font-Lato shadow-lg shadow-cyan-100">
        <div className="basis-1/2 bg-sky-950 flex flex-col">
          <div className="basis-4/6 m-10 bg-slate-200 rounded-md opacity-75 p-36"></div>
          <div className="basis-2/6 px-10 font-light text-orange-100 text-center text-xs">
            Unlock the Power of Collaboration, Embrace the Flow of Progress.
            With CodeSync, unite in challenges like '100 Days of Code,' syncing
            your journey with the world one commit at a time. Connect, Create,
            and Inspire as we code together towards a brighter future.{" "}
            <p className="my-5 text-orange-300 font-extralight text-lg">
              #DevLife #CodeCollaboration
            </p>
          </div>
        </div>
        <div className="basis-1/2 bg-zinc-100 flex flex-col w-100 text-center">
          <div className="basis-1/6 p-10 text-3xl">
            <p className="font-Marck-Script">DevChatter</p>
          </div>
          <div className="basis-4/6">
            <SignUpForm />
          </div>
          <div className="basis-1/6 mb-6">
            Already have account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
