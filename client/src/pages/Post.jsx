import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import edit from '../img/edit.png'
import del from '../img/delete.png'
import { Link, useLocation } from 'react-router-dom'
import Menu from '../components/Menu'

const Post = () => {
  const {state}=useLocation()
  console.log(state)
  return (
    <div className='post'>
      <div className="container">
        <Navbar/>
        <div className="post">
          <div className="container mb-10 items-start flex gap-10">
            <div className="content">
              <img className='w-[100%] object-cover h-[300px]' src={state.post.img} alt="" />
              <div className="user my-3 items-center flex gap-3">
                <img className='w-[50px] h-[50px] object-cover rounded-[50%]' src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600' alt="" />
                <div className="user-info text-sm">
                  <p className='font-bold'>Manu</p>
                  <p>Posted 2 days ago</p>
                </div>
                <div className="btns ml-3 flex gap-3">
                  <Link to={`/write?edit=${state.post.id}`} className='p-1 rounded-[50%] bg-theme_dark'><img className='w-[20px]' src={edit} alt="" /></Link>
                  <Link  className='p-1 rounded-[50%] bg-theme_dark'><img className='w-[20px]' src={del} alt="" /></Link>
                </div>
              </div>
              <h1 className="text-4xl leading-[50px] font-bold">{state.post.title}</h1>
              <p className="leading-7 text-sm">{state.post.desc}</p>
              <br />
              <p className="leading-7 text-sm">{state.post.desc}</p>
              <br />
              <p className="leading-7 text-sm">{state.post.desc}</p>
              <br />
              <p className="leading-7 text-sm">{state.post.desc}</p>
            </div>
            <div className="menu">
              <Menu id={state.post.id}/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default Post