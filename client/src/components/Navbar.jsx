import React, { useContext, useState } from 'react'
import { IoMdMenu,IoMdClose } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { FaUser } from "react-icons/fa";
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate=useNavigate()
    const links=[
        'art',
        'science',
        'technology',
        'cinema',
        'design',
        'food'
    ]
    const {curruser, logout}=useContext(AuthContext)
    console.log("curr user in navbar",curruser)
  return (
    <div className='navbar'>
        <div className="flex justify-between sm:p-10 p-4">
            <div className="logo font-bold sm:max-w-[100px] max-w-[75px]">
                <Link to='/'>Abhinav <span className='text-theme_dark'>V.</span></Link>
            </div>
            <div className="links sm:flex hidden gap-4 text-sm font-bold text-theme_dark">
                {links.map(item=>{
                    return (
                        <Link className='self-start' to={`/?cat=${item}`}>
                            <h1 className=" underline uppercase">{item}</h1>
                        </Link>
                    )
                })}
                {curruser && <p className='capitalize'>{curruser?.name}</p>}
                {curruser ? (
                    <p onClick={logout} className='cursor-pointer'>Logout</p>
                ):(
                    <Link to='/login'>Login</Link>
                )}
                <p className='write-link mt-[-5px] font-semibold tracking-wide bg-theme_dark text-theme_light py-1 px-2 self-start rounded-lg hover:bg-white hover:text-theme_dark hover:border-[1px] hover:border-theme_dark border-[1px] border-transparent'><Link to='/write'>Write</Link></p>
            </div>
            <div className='sm:hidden flex items-center relative'>
                {menuOpen ? <IoMdClose onClick={()=>setMenuOpen(false)} className='text-2xl text-theme_light z-20 absolute top-0 right-0 text-theme_dark cursor-pointer' /> : <IoMdMenu onClick={()=>setMenuOpen(true)} className='text-2xl z-20 absolute top-0 right-0 text-theme_dark cursor-pointer' />}
                {menuOpen && 
                    <div onClick={()=>setMenuOpen(false)} className='fixed z-10 top-0 flex items-center bottom-0 right-0 w-[75%] bg-theme_dark text-theme_light p-4 rounded-l-[10px] flex-col gap-4 pt-12'>
                        {curruser && 
                            <div className="flex items-center gap-2">
                                <FaUser/>
                                <p className='capitalize text-xl font-bold'> {curruser?.name}</p>
                            </div>
                        }
                        {links.map(item=>{
                        return (
                            <Link to={`/?cat=${item}`}>
                                <h1 className=" underline uppercase">{item}</h1>
                            </Link>
                        )
                        })}
                        {curruser ? (
                            <p onClick={logout} className='cursor-pointer'>Logout</p>
                        ):(
                            <Link to='/login'>Login</Link>
                        )}
                        <p className='write-link mt-[-5px] font-semibold tracking-wide text-theme_dark bg-theme_light py-1 px-2 rounded-lg hover:text-theme_dark hover:border-[1px] hover:scale-105 hover:border-black border-[1px] border-transparent'><Link to='/write'>Write</Link></p>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar
