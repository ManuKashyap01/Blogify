import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'


const Blog=({post})=>{
  return (
    <div className="post flex gap-10" key={post.id}>
      <div className="blog__img">
        <img className='w-full max-h-[350px]' src={post.img} alt={post.title} />
      </div>
      <div className="blog__content flex flex-col gap-2">
        <Link className='text-5xl font-bold cursor-pointer' to={'/post/'+post.id} state={{post:post}}>
          {post.title}
        </Link>
        <p className='text-base'>{post.desc.substr(0,300)} . . .</p>
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
  
//   const posts = [
//   {
//     id: 1,
//     title: "Delicious Culinary Adventures",
//     desc: "Join us on a gastronomic journey as we explore the world of culinary delights! From savory street food in Bangkok to mouthwatering pasta in Rome, we'll take you on a virtual tour of global flavors. Learn about the rich history and cultural significance of different cuisines, and get insider tips from renowned chefs. Indulge in tantalizing food photography that will leave your taste buds tingling. Whether you're a foodie or simply enjoy good eats, our blog will inspire your taste buds and whet your appetite for culinary adventures.",
//     img: "https://images.pexels.com/photos/15819503/pexels-photo-15819503.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
//   },
//   {
//     id: 2,
//     title: "Exploring the World of Art",
//     desc: "Immerse yourself in the world of art, where creativity knows no bounds! Discover the latest art movements, from abstract expressionism to street art, and learn about renowned artists and their masterpieces. Dive into the techniques and inspirations behind different art forms, from painting to sculpture to photography. Delve into the history and significance of art in various cultures and time periods, and explore the evolving landscape of contemporary art. Be captivated by stunning visuals and thought-provoking discussions that will ignite your artistic curiosity and broaden your horizons.",
//     img: "https://images.pexels.com/photos/15819503/pexels-photo-15819503.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
//   },
//   {
//     id: 3,
//     title: "Unraveling the Wonders of Science",
//     desc: "Embark on a fascinating journey through the realm of science, where curiosity and exploration reign supreme! From uncovering the mysteries of the universe to unraveling the complexities of the human body, we'll delve into the awe-inspiring world of scientific discoveries. Explore breakthrough research and cutting-edge technologies across various disciplines, including physics, chemistry, biology, and more. Learn about the scientists and visionaries who have shaped our understanding of the world and transformed our lives. Get ready to be captivated by mind-bending concepts, mind-blowing experiments, and mind-expanding insights that will ignite your passion for science.",
//     img: "https://images.pexels.com/photos/15819503/pexels-photo-15819503.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
//   },
//   {
//     id: 4,
//     title: "Savoring Nature's Bounty",
//     desc: "Join us on a journey to discover the wonders of nature's bounty! From exploring lush rainforests to traversing rugged mountains, we'll delve into the breathtaking beauty of the great outdoors. Learn about diverse ecosystems and the unique flora and fauna that call them home. Dive into the fascinating world of wildlife, from majestic elephants in Africa to elusive tigers in Asia. Discover the ecological importance of conservation and sustainable practices to protect our planet's precious resources. Be inspired by awe-inspiring landscapes, heartwarming wildlife encounters, and tales of adventure that will ignite your love for nature.",
//     img: "https://images.pexels.com/photos/15819503/pexels-photo-15819503.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
//   },
// ]
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