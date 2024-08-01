import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useAuth } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import { apiUrl } from '../api'
import { useDispatch } from 'react-redux'
import { FLASH_SUCCESS, FLASH_ERROR } from '../constants/actionTypes'
import { Link } from 'react-router-dom'

import '../styles/signup.css'

function SignUp() {

  const [userData, setUserData] = useState({name:'', username:'', email:'', password:'', team:''})
  const dispatch = useDispatch()
  const auth = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    submitRegister()
}

const submitRegister = async () => {
    try{
        const config = {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          };
        const {data} = await axios.post(`${apiUrl}/register`, userData, config)
        if(data.type === "success"){
            console.log("Registered Succuessfully")
            dispatch({type:FLASH_SUCCESS, payload:data.message})
            auth.logIn(data.data)
            navigate('/onboarding')
        }
        else{
          console.log("Not Registered Succuessfully", data.message)
          dispatch({type:FLASH_ERROR, payload:data.message})

        }
        
    }
    catch(err){
        dispatch({type:FLASH_ERROR, payload:err.message})
    }
}
  

  return (
    <div className='signup-container'>
        <div className='content'>
          <div className='heading-1'>
            Humming BEE
          </div>
          <div className='heading-2'>
            Register Here
          </div>
          
            <form className='form-container' onSubmit={handleSubmit}>
              <div className='input-container'>
                <div className='input-label'>Name</div>
                <input type='text' value={userData.name} onChange={(e) => setUserData({...userData, name:e.target.value})} className='input-box' placeholder='Full Name'/>
              </div>
              <div className='input-container'>
                <div className='input-label'>Username</div>
                <input type='text' value={userData.username} onChange={(e) => setUserData({...userData, username:e.target.value})} className='input-box' placeholder='Username'/>
              </div>
              <div className='input-container'>
                <div className='input-label'>Email</div>
                <input type='email' value={userData.email} onChange={(e) => setUserData({...userData, email:e.target.value})} className='input-box' placeholder='name@company.com'/>
              </div>
              <div className='input-container'>
                <div className='input-label'>Password</div>
                <input type='password' value={userData.password} onChange={(e) => setUserData({...userData, password:e.target.value})} className='input-box' placeholder='atleast 8 charachters'/>
              </div>
              <div className='input-container'>
                <div className='input-label'>Team</div>
                <select className='input-box' value={userData.team} onChange={(e) => setUserData({...userData, team:e.target.value})}>
                  <option className='option'>Development</option>
                  <option className='option'>Management</option>
                  <option className='option'>Design</option>
                  <option className='option'>Team</option>
                </select>
              </div>
              <button type="submit" className='sub-btn'>Submit</button>
            </form>
          
      </div>
        
    </div>
  )
}

export default SignUp