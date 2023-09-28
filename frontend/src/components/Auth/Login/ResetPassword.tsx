import React, { useState } from 'react'
import ResetPasswordForm from './ResetPasswordForm'

function ResetPassword() { 
    const [show,setShow] = useState(false)
  return (
    <>
    {show && <ResetPasswordForm />}
    <button onClick={()=>setShow(true)}>Forgot Password?</button>
    </>
  )
}

export default ResetPassword
