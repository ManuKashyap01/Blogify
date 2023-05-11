import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Post from './pages/Post'
import Write from './pages/Write'
import { createBrowserRouter,Outlet,Route,RouterProvider } from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// this is done using outlet component coming from react-router-dom which uses children props
// const Layout=()=>{
//   return (
//     <>
//       <Navbar/>
//       <Outlet/>
//       <Footer/>
//     </>
//   )
// }

function App() {
  // since proxy in package.json file was not working so, I changed the default base url of the axios.
  // It is set in the top component i.e. app.jsx so that the changes get reflected before all the other components render
  axios.defaults.baseURL = 'https://blogify-j0y3.onrender.com/api/'
  axios.defaults.withCredentials=true
  const router=createBrowserRouter([
    // {
    //   path:'/',
    //   element:<Layout/>,
    //   // chilren will hold all the paths that are going to be rendered using Layout component
    //   children:[
    //     {
    //       path:'/',
    //       element:<Home/>
    //     },
    //     {
    //       path:'/post',
    //       element:<Post/>
    //     },
    //     {
    //       path:'/write',
    //       element:<Write/>
    //     },
    //   ]
    // },
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/post/:id',
      element:<Post/>
    },
    {
      path:'/write',
      element:<Write/>
    },
    {
      path:'/register',
      element:<Register/>
    },
    {
      path:'/login',
      element:<Login/>
    },
  ])
  return (
    <div className="app relative">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  )
}

export default App
