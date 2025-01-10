import React, { useContext, useEffect, useState } from 'react'
import { FaUserPen } from "react-icons/fa6";
import edit from '../img/edit.png'
import del from '../img/delete.png'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext'
// import AvatarReactjs from 'avatar-reactjs'

// TODO:reduce the description content to only description coming from the api

const Post = () => {
  const navigate=useNavigate()
  const [isdel, setisdel] = useState(false)
  const {id} = useParams()
  // to check if we have authorization controls over the post
  const {curruser}=useContext(AuthContext)
  console.log("the curruser in post",curruser)
  const [post, setpost] = useState(null)
  // console.log(id)
  const handleDelete=async ()=>{
    // setisdel(true)
    try{
      const res=await axios.delete('/posts/'+id)
      console.log('from delete',res)
      navigate('/')
    }catch(err){
      console.log('error in delete',err)
    }
  }

  useEffect(() => {
    const fetchdata=async () =>{
      console.log("id in useEffect post ",id)
      await axios.get(`/posts/${id}`)
      .then(res=>{
        setpost(res.data.post)
        console.log('post in fetch data ',res.data.post)
      })
      .catch(err=>{
        console.log('error in get post request',err)
      })
    }
    fetchdata()
  },[id])
  console.log("post " + post)
  console.log('id '+ id)
  return (
    <div className="mb-10 items-start max-w-4xl mx-auto p-8 flex sm:flex-row flex-col sm:gap-16 gap-8">
      <div className="flex-[3]">
        {post && <img className='w-[100%] rounded-md object-cover h-[300px]' src={post.img} alt="" />}
        <div className="user my-3 items-center flex gap-3">
          {/* {post && <img className='w-[50px] h-[50px] object-cover rounded-[50%]' src={post.userId.userImg} alt="" />} */}
          <FaUserPen className='w-[50px] h-[50px] object-cover' />
          <div className="user-info text-md">
            {post && <p className='capitalize font-bold'>{post.userId.name}</p>}
            {/* moment is used to show difference between current date and post date */}
            {post && <p className='text-sm'>Posted {moment(post.updatedAt).fromNow()}</p>}
          </div>
          {curruser && post && curruser.name===post.userId.name &&
            <div className="ml-3 flex items-center gap-3">
            <Link to={`/write?edit=${post._id}`} state={post} className='p-1 shadow-md rounded-md bg-theme_dark'><img className='w-[20px]' src={edit} alt="" /></Link>
            <div onClick={()=>setisdel(true)} className='p-1 rounded-md shadow-md cursor-pointer bg-theme_dark'><img className='w-[20px]' src={del} alt="" /></div>
            {isdel && 
            <div className="w-full bg-black/[0.5] flex justify-center  absolute top-0 bottom-0 left-0 right-0">
              <div className="bg-theme_dark rounded-[10px] flex gap-4 flex-col text-theme_light p-4 w-[300px]">
                <p className="text-lg">Are you sure you want to delete this post?</p>
                <div className="flex font-bold justify-center gap-4">
                  <button onClick={handleDelete} className="uppercase px-2 py-1 rounded-lg bg-theme_light text-theme_dark">Yes</button>
                  <button onClick={()=>setisdel(false)} className='uppercase px-2 py-1 rounded-lg bg-theme_light text-theme_dark'>No</button>
                </div>
              </div>
            </div>
            }
          </div>
          }
        </div>
        {post && <h1 className="text-4xl leading-[50px] font-bold">{post.title}</h1>}
        {post && <p dangerouslySetInnerHTML={{__html:post.desc}}></p>}
      </div>
      <div className="flex-[1]">
        {post && <Menu id={post._id} cat={post.cat}/>}
      </div>
    </div>
  )
}

export default Post