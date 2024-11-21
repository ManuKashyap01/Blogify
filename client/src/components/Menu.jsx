import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Post=({post})=>{
    return (
        <div className="post w-full" id={post._id}>
            <img className='max-h-[200px] object-center object-cover w-full' src={post.img} alt="" />
            <h1 className="text-xl font-bold">{post.title}</h1>
            <Link to={`/posts/${post._id}`}><button className='self-start text-theme_dark border-b-[2px] border-theme_dark'>Read more</button></Link>
            
        </div>
    )
}

const Menu = ({id,cat=''}) => {
  const [posts, setposts] = useState([])
  
  // we cannot directly make the callback function of useeffect async
  useEffect(() => {
    const fetchdata=async() =>{
        await axios.get(`/posts?cat=${cat}`)
        .then(res=>{
          setposts(res.data.posts)
          console.log('posts',res.data.posts)
        })
        .catch(err=>{
          console.log('error in get posts request',err)
        })
    }
    fetchdata()
  }, [cat])
  return (
    <div>
        <h1 className="text-xl font-bold">Other posts you may like</h1>
        <div className="posts flex gap-5 items-stretch flex-col mt-5">
            {posts.filter(post=>{
                return post._id!==id
            }).map(post=>{
                return <Post post={post}/>
            })}
        </div>
    </div>
  )
}

export default Menu