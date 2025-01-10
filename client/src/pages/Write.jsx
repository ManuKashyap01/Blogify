import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Write = () => {
  const state=useLocation().state
  const navigate=useNavigate()
  const uploadImg=async ()=>{
    if(!img){
      return
    }
    const formdata=new FormData()
    formdata.append('file',img)
    formdata.append('upload_preset','roraebvf')
    try{
      const res=await axios.post('https://api.cloudinary.com/v1_1/dcekzthut/image/upload',formdata,{withCredentials:false})
      console.log("res from clodinary",res)
      return res.data.secure_url
    }catch(err){
      console.log('error from image upload',err)
    }
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    const imgUrl = img ? await uploadImg() : ''
    console.log(imgUrl)
    try {
      const res=state
      ?await axios.put(`/posts/${state._id}`,{
        title,
        desc,
        cat,
        id:state?._id,
        img:imgUrl
      })
      :await axios.post('/posts',{
        title,
        desc,
        cat,
        img:imgUrl,
        date:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      })
      navigate('/')
      console.log('from write',res)
    } catch (error) {
      console.log('error in write submit',error)
    }
  }

  const [desc, setdesc] = useState(state?.desc || '');
  const [title, settitle] = useState(state?.title || '');
  const [img, setimg] = useState(state?.img || null);
  const [cat, setcat] = useState(state?.cat || '');
  
  const links=[
    'art',
    'science',
    'technology',
    'cinema',
    'design',
    'food'
  ]
  console.log('log from write',{
    title,desc,img,cat,state
  })
  return (
    <div className="mt-4 mb-8 max-w-4xl mx-auto flex sm:flex-row flex-col px-8 gap-8">
      <div className="quill flex flex-[3] flex-col gap-8">
        <input type="text" placeholder='Enter title . . .' value={title} onChange={e=>settitle(e.target.value)} className='placeholder:italic bg-transparent shadow-md rounded-md p-2'/>
        <div className="relative min-h-[375px]">
            <ReactQuill theme="snow" className='rounded-md shadow-md border-[1px] flex flex-col border-theme_dark/[0.5] absolute inset-0' value={desc} onChange={setdesc} />
        </div>
      </div>
      <div className="menu flex flex-[2] flex-col gap-5">
        <div className="publish rounded-md shadow-md border-[1px] flex flex-col gap-4 p-3 border-theme_dark/[0.5]">
          <h1 className="font-bold text-xl">Publish</h1>
          <div className="btns flex gap-8 items-center">
            <input type="file" name="file" onChange={e=>setimg(e.target.files[0])} id="file" className='hidden'/>
            <label htmlFor="file" className='cursor-pointer underline font-semibold hover:font-bold text-theme_dark text-sm'>Upload Image</label>
            <button onClick={handleSubmit} className="py-1 px-2 hover:shadow-md bg-theme_dark  rounded-md  text-theme_light text-sm border-theme_dark border-[1px]">Publish</button>
          </div>
        </div>
        <div className="category rounded-md shadow-md border-[1px] flex flex-col gap-[3px] p-3 border-theme_dark/[0.5]">
          <h1 className="font-bold text-xl">Category</h1>
          {links.map(item=>{
            return (
              <div className="flex gap-2 items-center">
                <input type="radio" checked={cat===item} onClick={()=>setcat(item)} name={item} id={item} />
                <label className='capitalize' htmlFor={item}>{item}</label>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Write