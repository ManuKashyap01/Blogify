import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
      <div className="items-center bg-theme_dark/[0.8] flex justify-between py-5 sm:px-10 px-4">
        <div className="logo text-white font-bold sm:max-w-[100px] max-w-[75px]">
          <Link to='/'>Abhinav <span className='text-black'>V.</span></Link>
        </div>
        <p className="text-theme_light text-sm">Made with ❤ and React.js</p>
      </div>
  )
}

export default Footer
