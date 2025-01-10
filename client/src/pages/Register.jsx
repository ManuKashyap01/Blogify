import React,{useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {
  const [inputs, setinputs] = useState({
    name:'',
    email:'',
    password:''
  })
  // to render error message if the user already exists
  const [err, seterr] = useState(null)
  // to navigate to login page
  const navigate=useNavigate()
  const handleChange=(e)=>{
    const newinputs={...inputs,[e.target.name]:e.target.value}
    setinputs(newinputs)
  }
  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
      await axios.post('auth/register',inputs)
      navigate('/login')
    }catch(err){
      seterr(err.response.data)
      setTimeout(() => {
        seterr(null)
      }, 4000);
      console.log(err)
    }
  }
  // console.log(inputs)
  return (
      <div className='flex justify-center bg-gradient-to-b from-white to-theme_dark items-center min-h-[100vh]'>
        <form className='flex flex-col px-[50px] pb-[50px] pt-[25px] gap-4'>
            <h1 className="text-xl text-theme_dark self-center uppercase font-bold">Register</h1>
            <input required className='placeholder:text-black placeholder:italic bg-transparent shadow-md rounded-md p-2' name='name' onChange={handleChange} type="text" placeholder='username' />
            <input required className='placeholder:text-black placeholder:italic bg-transparent shadow-md rounded-md p-2' name='email' onChange={handleChange} type="email" placeholder='email' />
            <input required autoComplete='current-password' className='placeholder:text-black placeholder:italic bg-transparent shadow-md rounded-md p-2' name='password' onChange={handleChange} type="password" placeholder='password' />
            <button onClick={handleSubmit} className='bg-theme_dark text-theme_light py-1 hover:shadow-md rounded-md'>Register</button>
            {err && <p className="mb-[-10px] text-red-600 self-center">{err}</p>}
            <p className="self-center font-semibold text-black text-sm">Do you Have an Account? <Link className='underline hover:scale-105 block text-center' to='/login'>Login</Link></p>
        </form>
    </div>
  )
}

export default Register