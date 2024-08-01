import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'
function Home() {
  return (
    <div className='home'>
     <div class="home-heading">
      <div className='home-heading-container'>
      <div class="heading-icon">HummingBEE</div>
        <div class="lines">
          <div class="home-line"></div>
          <div class="home-line"></div>
          <div class="home-line"></div>
          <div class="home-line"></div>
          <div class="home-line"></div>
        </div>
        <Link to='/login' className="heading-login">Login</Link>
        <Link to='/signup' className="ms-3 heading-login">Sign Up</Link>
      </div>
   
    </div>
      <div className='home-content'>
        <div className='first-heading'>
          <div className='first-heading-1'>On a mission to create</div>
          <div className='first-heading-2'>thriving workplace</div>
        </div>
        <div className='second-heading'>
          At Humming BEE, we boost engagement, development, and well-being with advanced tools. Transform your workplace where everyone excels and feels valued.
        </div>
      </div>
    </div>


  )
}
{/* <div className='heading-line-container'> <div className='heading-lines'/> <div className='heading-lines'/> <div className='heading-lines'/> <div className='heading-lines'/> <div className='heading-lines'/> </div> */}

export default Home