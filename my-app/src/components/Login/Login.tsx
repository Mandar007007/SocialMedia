import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="flex flex-col h-screen w-screen sm:px-24 sm:py-16 sm:flex-row font-Lato shadow-lg shadow-cyan-100">
        <div className="basis-1/2 bg-sky-950 flex flex-col">
          <div className="basis-4/6 m-10 bg-slate-200 rounded-md opacity-75 p-36"></div>
          <div className="basis-2/6 px-10 sm:px-20 font-light text-orange-100 text-center text-xs">
            Sync your code, share your journey. Embrace challenges, commit to
            progress, and connect with fellow developers. Join the coding
            community where ideas flourish, projects thrive, and inspiration
            flows. Together, let's build a world where every line of code makes
            a difference.
            <p className="my-5 text-orange-300 font-extralight text-lg">
              #ShareYourCode #CodeTogether
            </p>
          </div>
        </div>
        <div className="basis-1/2 bg-zinc-100 flex flex-col w-100 text-center">
          <div className="basis-1/6 p-10 text-3xl">
            <p className="font-Marck-Script">DevChatter</p>
          </div>
          <div className="basis-4/6">
            <LoginForm />
          </div>
          <div className="basis-1/6 mb-6">
            New Dev?{" "}
            <span>
              <Link to="/signup">Create Account</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
