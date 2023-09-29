import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import ErrorResponseData from "../../../../interfaces/ErrorResponseData";
import { toast } from "react-toastify";
import { PiImageSquareLight } from "react-icons/pi";
import { IoMdRemoveCircleOutline } from "react-icons/io";

function ChatForm() {
  const { user } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({
    caption: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Store image preview URL

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    if (files) {
      const selectedImage = files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: selectedImage,
      }));

      // Display image preview
      const imageUrl = URL.createObjectURL(selectedImage);
      setImagePreview(imageUrl);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }

    if (value.length <= 240) {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleRemoveImage = (event: React.FormEvent<HTMLFormElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: null,
    }));
    setImagePreview(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/post/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      window.location.reload();
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

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col p-5"
      >
        <div className="w-full text-center flex flex-row items-center">
          <img
            className="w-12 h-12 rounded-full border-1 border-orange-400"
            src={user && user.avtar.url}
            alt="profile-pic"
          />
          <button
            type="submit"
            className=" w-[20%] text-lg font-bold bg-orange-400 text-white p-1 rounded-3xl hover:shadow-2xl ml-auto"
          >
            Post
          </button>
        </div>
        <div className="w-full">
          <input
            type="textarea"
            name="caption"
            id="caption"
            aria-labelledby="caption"
            className="my-2 py-3 border-b-2 bg-transparent w-full border-gray-400 focus:outline-none focus:border-slate-500 focus:invalid:border-pink-600 invalid:border-pink-600 appearance-none"
            placeholder="What's in your mind!"
            value={formData.caption}
            onChange={handleChange}
          />
          <div className="w-full flex flex-row">
            <p className="text-sm font-semibold text-orange-400">
              {240 - formData.caption.length}/240
            </p>
            <button className="ml-auto">
              <p className="text-sm font-semibold text-orange-400 ml-auto">
                Generate Challenge Post
              </p>
            </button>
          </div>
        </div>
        <div className="my-2">
          <label htmlFor="image" className="cursor-pointer">
            <PiImageSquareLight className="text-2xl" />
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            aria-labelledby="image"
            className="hidden"
            onChange={handleChange}
          />
          {imagePreview && (
            <div className="flex">
              <img
                src={imagePreview}
                alt="Selected Preview"
                className="max-h-40 mt-5"
              />
              <IoMdRemoveCircleOutline
                className="text-xl"
                onClick={handleRemoveImage}
              />
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default ChatForm;
