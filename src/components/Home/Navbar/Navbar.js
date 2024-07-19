import React from 'react'
import './Navbar.css';
const Navbar = () => {
  return (
    <nav className='navbar'>
        <img className='logo'src={"logo.png"} />
        <ul >
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
        </ul>
    </nav>
  )
}

export default Navbar
