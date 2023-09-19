import axios, { AxiosError } from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import ErrorResponseData from '../../interfaces/ErrorResponseData';
function ResetPasswordForm() {

    const [email,setEmail] = useState("")
    const handleChange = async (event:React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        setEmail(event.target.value);
    }

    const handleSubmit = async(event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            await axios.post(
                "http://localhost:4000/api/v1/forgot/password",
                {email},
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  withCredentials: true,
                }
              );
        }catch(error)
        {
            const err = error as AxiosError<ErrorResponseData>;
            console.log(err);
            let message = "An error occurred during forgot.";
      
            if (err.response && err.response.data) {
              if (err.response.data.msg) {
                message = err.response.data.msg;
              } else if (err.response.data.message) {
                message = err.response.data.message;
              }
            }
            toast.error(message);

        }
    }

  return (
    <>
    <form className='h-screen z-40' action="" onSubmit={handleSubmit}>
    <input type="email" placeholder='Email' className='text-black ' onChange={handleChange} value={email}></input>
    <button type='submit'>Submit</button>
    </form>
    </>
  )
}

export default ResetPasswordForm
