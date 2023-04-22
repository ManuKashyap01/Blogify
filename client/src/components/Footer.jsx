import React from 'react'
import logo from '../img/logo.png'
const Footer = () => {
  return (
      <div className="container items-center px-4 bg-theme_dark/[0.8] flex justify-between py-5">
        <div className="logo max-w-[75px]">
          <img className='rounded-[25px]' src={logo} alt="" />
        </div>
        <p className="text-theme_light">Made with ❤, Vite and React.js</p>
      </div>
  )
}

export default Footer