import { GoDotFill } from "react-icons/go";

function CommunitiesSection() {
  return (
    <>
      <div className="w-auto h-full my-5 fixed overflow-y-auto">
        <div className="m-8 text-3xl font-bold">Your Communities !</div>
        <div className="w-full flex flex-row py-4 px-10 items-center">
          <img
            src="https://i.pinimg.com/236x/1f/d1/20/1fd120aa3bb618e8f9eb5dfcd8a34eea.jpg"
            alt="pic"
            className="w-12 h-12 rounded-full"
          />
          <div className="text-2xl font-semibold ml-5">React Kids</div>
          <div className="text-lg font-semibold text-green-500 ml-auto flex items-center">
            <GoDotFill /> <span className="ml-2">15</span>
          </div>
        </div>
        <div className="w-full flex flex-row py-4 px-10 items-center">
          <img
            src="https://i.pinimg.com/564x/73/11/1c/73111cd3f58c14ce0ae1e01ab16731d4.jpg"
            alt="pic"
            className="w-12 h-12 rounded-full "
          />
          <div className="text-2xl font-semibold ml-5">Node mons</div>
          <div className="text-lg font-semibold text-green-500 ml-auto flex items-center">
            <GoDotFill /> <span className="ml-2">22</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommunitiesSection;
