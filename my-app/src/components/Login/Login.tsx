import LoginForm from "./LoginForm";

function Login() {
  return (
    <>
      <div className="h-screen w-screen flex flex-row font-Pangolin">
        <div className="basis-1/2 bg-purple-950 flex flex-col">
          <div className="basis-4/6 m-10 bg-slate-200 rounded-md opacity-75"></div>
          <div className="basis-2/6 px-20 font-light text-orange-100 text-center text-2xl">
            Coding is not just about logic; it's an expression of creativity
            that reshapes our world.
            <p className="mt-5 text-orange-300 font-extralight text-xl">
              #CodeCreatively #DevelopersArt
            </p>
          </div>
        </div>
        <div className="basis-1/2 bg-orange-100">
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default Login;
