import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Post from './pages/Post'
import Write from './pages/Write'
import { createBrowserRouter,Outlet,Route,RouterProvider } from 'react-router-dom'
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
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  )
}

export default App
