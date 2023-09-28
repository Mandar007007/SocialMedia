import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import ErrorResponseData from "../../../../interfaces/ErrorResponseData";
import { toast } from "react-toastify";

export function EditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    avtar: null,
  });

  const [selectedImage, setSelectedImage] = useState(user.avtar.url);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    if (files) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));

      const imageFile = files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const resolveFun = async () => {
        try {
          const response = await axios.put(
            "http://localhost:4000/api/v1/update/profile",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              withCredentials: true,
            }
          );
          const userData = response.data.user;
          console.log(response);
          dispatch({ type: "SET_USER", payload: userData });
        } catch (error) {
          const err = error as AxiosError<ErrorResponseData>;
          let message = "An error occurred during signup.";

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
      toast.promise(resolveFun, {
        pending: {
          render() {
            return "Updating";
          },
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        },
        success: {
          render() {
            return "Updated Successfully 👌";
          },
        },
        error: {
          render({ data }) {
            return `error while updation :${data.message}`;
          },
        },
      });
      navigate("/profile");
    } catch (error) {
      const err = error as AxiosError<ErrorResponseData>;
      let message = "Error in the update.";

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
    <div className="h-screen w-full absolute top-0 left-0 bg-black text-white z-10 sm:h-[150%]">
      <div className="flex column h-full w-full center items-center justify-center sm:items-start sm:justify-start ">
        <form
          onSubmit={handleSubmit}
          action=""
          method="POST"
          className="flex flex-col w-full mt-5 text-left text-base px-5"
        >
          <div className="flex column w-full center items-center justify-center sm:items-start sm:justify-start">
            <label
              htmlFor="avatar"
              className="w-20 h-20 sm:h-24 rounded-full border-2 border-orange-200 flex justify-center items-center truncate relative sm:w-24"
            >
              <img src={selectedImage} alt="w-full h-full bg-cover absolute" />
            </label>
            <input
              type="file"
              id="avatar"
              name="avtar"
              accept="image/*"
              onChange={handleChange}
              aria-labelledby="avatar"
              className={`
            my-3 ml-3 hidden w-full text-sm text-slate-500 
            file:w-20 file:h-20
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-orange-50 file:text-black
            hover:file:bg-orange-100
            file:bg-center file:bg-cover file:bg-no-repeat
          `}
            />
          </div>
          <label htmlFor="name" className="my-3 font-black">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            aria-labelledby="name"
            value={formData.name}
            onChange={handleChange}
            className="my-2 border-b-2 bg-transparent border-gray-400 focus:outline-none focus:border-slate-600 focus:invalid:border-pink-600 invalid:border-pink-600
 appearance-none"
          />
          <label htmlFor="email" className="my-3 font-black">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            aria-labelledby="email"
            value={formData.email}
            onChange={handleChange}
            className="my-3 border-b-2 bg-transparent border-gray-400 focus:outline-none focus:border-slate-600 focus:invalid:border-pink-600 invalid:border-pink-600
 appearance-none"
          />
          <div className="w-100 text-center">
            <button
              type="submit"
              className="w-[100%] my-10 text-lg font-bold bg-white text-black p-2 rounded-3xl hover:shadow-2xl sm:w-[50%]"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
