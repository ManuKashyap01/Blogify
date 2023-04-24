import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'


const Blog=({post})=>{
  return (
    <div className="post flex gap-10" key={post.id}>
      <div className="blog__img">
        <img className='w-full h-[350px]' src={post.img} alt={post.title} />
      </div>
      <div className="blog__content flex flex-col gap-2">
        <Link className='text-5xl font-bold cursor-pointer' to={'/post/'+post.id} state={{post:post}}>
          {post.title}
        </Link>
        <p dangerouslySetInnerHTML={{__html:post.desc}} className='text-base overflow-hidden'></p>
        <button className='self-start text-theme_dark border-b-[2px] border-theme_dark'>Read more</button>
      </div>
    </div>
  )
}
const Home = () => {
  const [posts, setposts] = useState([])
  const cat=useLocation().search
  // we cannot directly make the callback function of useeffect async
  useEffect(() => {
    const fetchdata=async() =>{
        await axios.get(`/posts${cat}`)
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
    <div className='home'>
      <div className="container">
      <Navbar/>
        <div className="posts mt-5 mb-20 flex flex-col gap-16">
          {posts.map(post=>{
            return <Blog post={post}/>
          })}
        </div>
      <Footer/>
      </div>
    </div>
  )
}

export default Home