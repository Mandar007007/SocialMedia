import axios from "axios";
function SignUpForm() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/register",
        formData
      );
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1>Welcome to, DevChatter</h1>
      <form
        onSubmit={handleSubmit}
        action=""
        method="POST"
        className="flex flex-col p-10 text-left text-base sm:p-20"
      >
        <label htmlFor="name" className="my-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          aria-labelledby="name"
          className="my-2 border-b-2 bg-transparent border-gray-400 focus:outline-none focus:border-slate-500 appearance-none"
        />
        <label htmlFor="email" className="my-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          aria-labelledby="email"
          className="my-2 border-b-2 bg-transparent border-gray-400 focus:outline-none focus:border-slate-500 appearance-none"
        />
        <label htmlFor="password" className="my-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="my-2 border-b-2 bg-transparent border-gray-400 focus:outline-none focus:border-slate-500 appearance-none"
        />
        <div className="w-100 text-center">
          <button
            type="submit"
            className="mt-10 p-2 rounded-full bg-slate-500 w-28 text-slate-50 hover:shadow-lg"
          >
            Signup
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUpForm;
