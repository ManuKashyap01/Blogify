import React,{useContext, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Register from './Register'
import { AuthContext } from '../context/authContext'

const Login = () => {
  // axios.defaults.withCredentials = true;
  const [inputs, setinputs] = useState({
    name:'',
    password:''
  })
  // to render error message if the user already exists
  const [err, seterr] = useState(null)
  // to navigate to login page
  const navigate=useNavigate()
  const handleChange=(e)=>{
    const newinputs={...inputs,[e.target.name]:e.target.value}
    console.log(newinputs)
    setinputs(newinputs)
  }

  const {login} = useContext(AuthContext)
  const handleSubmit=async (e)=>{
    e.preventDefault()
    console.log('insubmit')
    try{
      
      await login(inputs)
      console.log('login success')
      // document.cookie=`access_token=${res.data.access_token}`
      // console.log('res',res)
      navigate('/')
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
    <div className='bg-gradient-to-b from-white to-theme_dark/[.8] flex justify-center items-center min-h-[100vh]'>
        <form className='flex flex-col px-[50px] pb-[50px] pt-[25px] gap-4'>
            <h1 className="text-xl text-theme_dark self-center uppercase font-bold">Login</h1>
            <input required className='placeholder:text-black placeholder:italic bg-transparent shadow-md rounded-md p-2' name='name' onChange={handleChange} type="text" placeholder='username' />
            <input required className='placeholder:text-black placeholder:italic bg-transparent shadow-md rounded-md p-2' name='password' onChange={handleChange} autoComplete='current-password' type="password" placeholder='password' />
            <button onClick={handleSubmit} className='bg-theme_dark text-theme_light py-1 hover:shadow-md rounded-md'>Login</button>
            {err && <p className="mb-[-10px] text-red-600 self-center">{err}</p>}
            <p className="self-center font-semibold text-black text-sm">Don't Have an Account? <Link className='underline hover:scale-105 block text-center' to='/register'>Register</Link></p>
        </form>
    </div>
  )
}

export default Login