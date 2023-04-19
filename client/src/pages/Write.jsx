import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Write = () => {
  const [value, setValue] = useState('');
  const links=[
    'art',
    'science',
    'technology',
    'cinema',
    'design',
    'food'
  ]
  return (
    <div className='write'>
      <div className="container">
        <Navbar/>
        <div className="editor mb-10 mt-5">
          <div className="container flex gap-10">
            <div className="quill flex flex-col gap-8">
              <input type="text" placeholder='Title' className='w-[50%] p-1 focus:outline-none outline:none border:none border-theme_dark/[0.5] border-b-2'/>
              <div className="quill_container h-[350px] overflow-scroll rounded-sm border-[1px] border-theme_dark/[0.5]">
                  <ReactQuill theme="snow" className='h-full quill_act' value={value} onChange={setValue} />
              </div>
            </div>
            <div className="menu flex flex-col gap-3">
              <div className="publish rounded-sm border-[1px] flex flex-col gap-4 p-3 border-theme_dark/[0.5]">
                <h1 className="font-bold text-xl">Publish</h1>
                <p className="text-sm"><span className="font-bold">Status:</span> Draft</p>
                <p className="text-sm"><span className="font-bold">Visibility:</span> Public</p>
                <input type="file" name="file" id="file" className='hidden'/>
                <label htmlFor="file" className='underline text-theme_dark text-sm'>Upload Image</label>
                <div className="btns flex justify-between">
                  <button className="p-1 border-theme_dark rounded-sm text-theme_dark border-[1px] text-sm">Save as a draft</button>
                  <button className="p-1 bg-theme_dark rounded-sm text-theme_light text-sm border-theme_dark border-[1px]">Update</button>
                </div>
              </div>
              <div className="category rounded-sm border-[1px] flex flex-col gap-[3px] p-3 border-theme_dark/[0.5]">
                <h1 className="font-bold text-xl">Publish</h1>
                {links.map(item=>{
                  return (
                    <div className="flex gap-2 items-center">
                      <input type="radio" name={item} id={item} />
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