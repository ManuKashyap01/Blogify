import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Write = () => {
  const state=useLocation().state
  const navigate=useNavigate()
  const uploadImg=async ()=>{
    // try{
    //   const formData=new FormData()
    //   // the name should match the one in the server post request
    //   formData.append('img',img)

    //   const res=await axios.post('/upload',formData)
    //   return res.data
    // }catch(err){
    //   console.log('error in upload',err)
    // }
    const formdata=new FormData()
    formdata.append('file',img)
    formdata.append('upload_preset','roraebvf')
    try{
      const res=await axios.post('https://api.cloudinary.com/v1_1/dcekzthut/image/upload',formdata,{withCredentials:false})
      return res.data.secure_url
    }catch(err){
      console.log('error from image upload',err)
    }
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    const imgUrl=await uploadImg()
    console.log(imgUrl)
    try {
      const res=state
      ?await axios.put(`/posts/${state.id}`,{
        title,
        desc,
        cat,
        id:state?.id,
        img:img?imgUrl:""
      })
      :await axios.post('/posts',{
        title,
        desc,
        cat,
        img:img?imgUrl:'',
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
    title,desc,img,cat
  })
  return (
    <div className='write'>
      <div className="container">
        <Navbar/>
        <div className="editor mb-10 mt-5">
          <div className="container flex gap-10">
            <div className="quill flex flex-col gap-8">
              <input type="text" placeholder='Title' value={title} onChange={e=>settitle(e.target.value)} className='w-[50%] p-1 focus:outline-none outline:none border:none border-theme_dark/[0.5] border-b-2'/>
              <div className="quill_container h-[350px] overflow-scroll rounded-sm border-[1px] border-theme_dark/[0.5]">
                  <ReactQuill theme="snow" className='h-full quill_act' value={desc} onChange={setdesc} />
              </div>
            </div>
            <div className="menu flex flex-col gap-3">
              <div className="publish rounded-sm border-[1px] flex flex-col gap-4 p-3 border-theme_dark/[0.5]">
                <h1 className="font-bold text-xl">Publish</h1>
                <p className="text-sm"><span className="font-bold">Status:</span> Draft</p>
                <p className="text-sm"><span className="font-bold">Visibility:</span> Public</p>
                <input type="file" name="file" onChange={e=>setimg(e.target.files[0])} id="file" className='hidden'/>
                <label htmlFor="file" className='cursor-pointer underline text-theme_dark text-sm'>Upload Image</label>
                <div className="btns flex justify-between">
                  <button className="p-1 border-theme_dark rounded-sm text-theme_dark border-[1px] text-sm">Save as a draft</button>
                  <button onClick={handleSubmit} className="p-1 bg-theme_dark rounded-sm text-theme_light text-sm border-theme_dark border-[1px]">Publish</button>
                </div>
              </div>
              <div className="category rounded-sm border-[1px] flex flex-col gap-[3px] p-3 border-theme_dark/[0.5]">
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
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default Write