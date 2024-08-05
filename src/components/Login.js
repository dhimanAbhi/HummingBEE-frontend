import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import { Link } from 'react-router-dom';
import { apiUrl } from '../api';
import { useDispatch } from 'react-redux';
import { FLASH_SUCCESS, FLASH_ERROR } from '../constants/actionTypes';
import '../styles/signup.css';

function Login() { 
    const [logUserData, setlogUserData] = useState({ username: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                }
            };
            console.log(config)
            const { data } = await axios.post(`${apiUrl}/login`, logUserData, config);
            console.log(data.type === "success");

            const redirectedPath = location.state?.path || '/';
            if (data.type === "success") {
                auth.logIn(data.data);
                console.log(data.data);
                dispatch({ type: FLASH_SUCCESS, payload: data.message });
                console.log(auth.loggedUser);
                if (!data.data.scores)
                    navigate('/onboarding', { replace: true });
                else
                    navigate('/takeSurvey/graphs', { replace: true });
            } else if (data.type === "error") {
                console.log("happened");
                dispatch({ type: FLASH_ERROR, payload: data.message });
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className='signup-container'>
            <div className='content'>
                <div className='heading-1'>
                    Humming BEE
                </div>
                <div className='heading-2'>
                    Login Here
                </div>
                <form className='form-container' onSubmit={handleSubmit}>
                    <div className='signup-input-container'>
                        <div className='input-label'>Username</div>
                        <input value={logUserData.username} onChange={(e) => setlogUserData({ ...logUserData, username: e.target.value })} className='input-box' placeholder='username' />
                    </div>
                    <div className='signup-input-container'>
                        <div className='input-label'>Password</div>
                        <input type='password' value={logUserData.password} onChange={(e) => setlogUserData({ ...logUserData, password: e.target.value })} className='input-box' placeholder='at least 8 characters' />
                    </div>
                    <button type="submit" className='sub-btn'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
