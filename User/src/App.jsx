
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import Home from './page/Home/Home'
import Friend from './page/friends/friends'
import FirendNav from './page/FirendNav/FirendNav'
import Profile from './page/Profile/Profile'
import PageEmpty from './page/PageEmpty/PageEmpty'
import Reel from './page/Reel/Reel'
import Login from './page/Login/Login'
import Register from './page/Register/Register'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Splash from './page/Splash/Splash'
import EditProfile from './page/EditProfile/EditProfile'

function App() {

  const location = useLocation()

  // Navbar hide cheyyenda routes
  const hideNavbarRoutes = ["/","/login", "/register"]
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      {/* rest of your routes */}

      {/* Navbar condition */}
      {!hideNavbarRoutes.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/friend" element={<Friend />} />
        <Route path="/friend/:type" element={<FirendNav />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/reel" element={<Reel />} />
        <Route path="*" element={<PageEmpty />} />
      </Routes>
    </>
  )
}

export default App
