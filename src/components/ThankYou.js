import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/thankyou.css'
function ThankYou() {
  return (
    <div className='thankyou-home'>
        <div className='thankyou-content'>
            <div className='thank-heading'>Thankyou for participating!</div>
            <div className='thank-message'>We want you to answer some questions which will provide us with the valuable insights about you. We're exicted to share these insights to help you thrive.</div>
            <div className='thank-message-2'>ARE YOU READY FOR IT</div>
            <div className='mt-5'>
                <Link to='/takeSurvey' className='lets-start'>Lets's Start</Link>
                <Link to='/' className='go-to-home'>Go to Home</Link>
            </div>
        </div>
    </div>
  )
}

export default ThankYou