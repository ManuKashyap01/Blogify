import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Post=({post})=>{
    return (
        <div className="post">
            <img className='max-h-[200px] object-center w-full' src={post.img} alt="" />
            <h1 className="text-xl font-bold">{post.title}</h1>
            <Link to={`/post/${post.id}`}><button className='self-start text-theme_dark border-b-[2px] border-theme_dark'>Read more</button></Link>
            
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
          setposts(res.data)
          console.log('posts',res.data)
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
        <div className="posts flex gap-5 flex-col mt-5">
            {posts.filter(post=>{
                return post.id!==id
            }).map(post=>{
                return <Post post={post}/>
            })}
        </div>
    </div>
  )
}

export default Menu