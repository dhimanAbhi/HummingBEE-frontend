import React from 'react'
import "../styles/header.css"
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div className='header'>
        <div className='logo'>
            Employee Wellness
        </div>
        
        <div className='navigation-links'>
            <Link to='/' className='links'>Home</Link>
            <Link className='links'>Resources</Link>
            <Link className='links'>About us</Link>
            <Link className='links'>Login</Link>
            <Link to='/signup' className='links'>Sign Up</Link>
        </div>
    </div>
  )
}

export default Header