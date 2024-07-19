import React, { useEffect } from 'react'
import Navbar from './Navbar/Navbar'
import Auth from './Auth/Auth'
import Hero from './Hero/Hero'
import './Home.css';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const userdata = localStorage.getItem("Achilyon");
   useEffect(() => {
        if(userdata){
            navigate("/userpage");
        }
   }, [])
  return (
    <div className='home'>
        <Navbar />
        <Hero />
    </div>
  )
}

export default Home
