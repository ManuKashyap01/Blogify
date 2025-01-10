import React,{useState,useEffect} from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Blog=({post})=>{
  const navigate=useNavigate()
  return (
    <div className="sm:flex-row flex-col sm:even:flex-row-reverse flex sm:gap-10 gap-5" key={post._id}>
      <div className="sm:flex-[2] shadow-[10px_10px_0_0_#005AA7]">
        <img className='w-full object-cover sm:h-[350px] h-[150px]' src={post.img} alt={post.title} />
      </div>
      <div className="sm:flex-[3] flex flex-col gap-2">
        <Link className='text-5xl font-bold cursor-pointer' to={'/posts/'+post._id} state={{post:post}}>
          {post.title}
        </Link>
        <p dangerouslySetInnerHTML={{__html:post.desc}} className='text-base max-h-[50px] overflow-hidden'></p>
        <button onClick={()=>navigate('/posts/'+post._id,{state:{post:post}})} className='self-start text-theme_dark border-b-[2px] border-theme_dark'>Read more</button>
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
    <div className="my-5 max-w-4xl mx-auto p-8 flex flex-col sm:gap-16 gap-8">
      {posts.map(post=>{
        return <Blog post={post}/>
      })}
    </div>
  )
}

export default Home