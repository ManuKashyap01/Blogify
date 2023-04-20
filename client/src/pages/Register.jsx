import React,{useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {
  const [inputs, setinputs] = useState({
    username:'',
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
    <div className='auth'>
        <div className=' flex justify-center items-center min-h-[100vh]'>
        <form className='flex flex-col px-[50px] pb-[50px] pt-[25px] gap-4'>
            <h1 className="text-xl text-theme_dark self-center uppercase font-bold">Login</h1>
            <input required className='bg-transparent p-1' name='username' onChange={handleChange} type="text" placeholder='username' />
            <input required className='bg-transparent p-1' name='email' onChange={handleChange} type="email" placeholder='email' />
            <input required autoComplete='current-password' className='bg-transparent p-1' name='password' onChange={handleChange} type="password" placeholder='password' />
            <button onClick={handleSubmit} className='bg-theme_dark text-theme_light py-1 rounded-md'>Register</button>
            {err && <p className="mb-[-10px] text-red-600 self-center">{err}</p>}
            <p className="self-center text-theme_light text-sm">Do you Have an Account? <Link className='underline block text-center' to='/login'>Login</Link></p>
        </form>
    </div>
    </div>
  )
}

export default Register