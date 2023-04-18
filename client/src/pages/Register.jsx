import React from 'react'
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <div>
        <div className='auth flex justify-center items-center min-h-[100vh]'>
        <form className='flex flex-col px-[50px] pb-[50px] pt-[25px] gap-4'>
            <h1 className="text-xl text-theme_dark self-center uppercase font-bold">Login</h1>
            <input required className='bg-transparent p-1' type="text" placeholder='username' />
            <input required className='bg-transparent p-1' type="email" placeholder='email' />
            <input required className='bg-transparent p-1' type="password" placeholder='password' />
            <button className='bg-theme_dark text-theme_light py-1 rounded-md'>Register</button>
            {/* <p className="mb-[-10px] text-red-600 self-center">This is an error</p> */}
            <p className="self-center text-theme_light text-sm">Do you Have an Account? <Link className='underline block text-center' to='/login'>Login</Link></p>
        </form>
    </div>
    </div>
  )
}

export default Register