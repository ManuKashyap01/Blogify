import React, { useContext } from 'react'
import logo from '../img/logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
const Navbar = () => {
    const links=[
        'art',
        'science',
        'technology',
        'cinema',
        'design',
        'food'
    ]
    // const user=JSON.parse(localStorage.getItem('user'))
    const {curruser, logout}=useContext(AuthContext)
  return (
    <div className='navbar'>
        <div className="container flex justify-between py-10">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="links flex gap-4 text-sm font-bold text-theme_dark">
                {links.map(item=>{
                    return (
                        <Link className='self-start' to={`/?cat=${item}`}>
                            <h1 className=" underline uppercase">{item}</h1>
                        </Link>
                    )
                })}
                <p className='capitalize'>{curruser?.username}</p>
                {curruser ? (
                    <p onClick={logout} className='cursor-pointer'>Logout</p>
                ):(
                    <Link to='/login'>Login</Link>
                )}
                <p className='write-link mt-[-5px] font-semibold tracking-wide bg-theme_dark text-theme_light py-1 px-2 self-start rounded-lg hover:bg-white hover:text-theme_dark hover:border-[1px] hover:border-theme_dark border-[1px] border-transparent'><Link to='/write'>Write</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Navbar