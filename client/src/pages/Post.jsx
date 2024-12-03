import React, { useContext, useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
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
      console.log("id in useEffect ",id)
      await axios.get(`/posts/${id}`)
      .then(res=>{
        setpost(res.data.post)
        // setuser(res.data.username[0])
        // console.log(res.data.username[0])
        console.log('post',res.data.post)
      })
      .catch(err=>{
        console.log('error in get post request',err)
      })
    }
    fetchdata()
  },[id])
  console.log(post)
  // console.log('state and id',state,id)
  return (
    <div className='post'>
      {post && <div className="container">
        {/* <Navbar/> */}
        <div className="post">
          <div className="container mb-10 items-start flex gap-10">
            <div className="content">
              <img className='w-[100%] object-cover h-[300px]' src={post.img} alt="" />
              <div className="user my-3 items-center flex gap-3">
                {post && <img className='w-[50px] h-[50px] object-cover rounded-[50%]' src={post.userId.userImg} alt="" />}
                <div className="user-info text-sm">
                  <p className='capitalize font-bold'>{post.userId.name}</p>
                  {/* moment is used to show difference between current date and post date */}
                  <p>Posted {moment(post.updatedAt).fromNow()}</p>
                </div>
                {curruser && curruser.name===post.userId.name &&
                  <div className="btns ml-3 flex gap-3">
                  <Link to={`/write?edit=${post._id}`} state={post} className='p-1 rounded-[50%] bg-theme_dark'><img className='w-[20px]' src={edit} alt="" /></Link>
                  <div onClick={()=>setisdel(true)} className='p-1 rounded-[50%] cursor-pointer bg-theme_dark'><img className='w-[20px]' src={del} alt="" /></div>
                  {isdel && 
                  <div className="w-full h-[100vh] bg-black/[0.5] flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
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
              <h1 className="text-4xl leading-[50px] font-bold">{post.title}</h1>
              <p dangerouslySetInnerHTML={{__html:post.desc}}></p>
            </div>
            <div className="menu">
              <Menu id={post._id} cat={post.cat}/>
            </div>
          </div>
        </div>
        {/* <Footer/> */}
      </div>}
    </div>
  )
}

export default Post