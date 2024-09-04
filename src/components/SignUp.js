import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../api';
import { useDispatch } from 'react-redux';
import { FLASH_SUCCESS, FLASH_ERROR } from '../constants/actionTypes';
import '../styles/signup.css';

function SignUp() {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: '',
    team: ''
  });
  
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const auth = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!userData.name) newErrors.name = 'Name is required';
    if (!userData.username) newErrors.username = 'Username is required';
    if (!userData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!userData.password) {
      newErrors.password = 'Password is required';
    } else if (userData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!userData.role) newErrors.role = 'Role is required';
    if (!userData.team) newErrors.team = 'Team is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      submitRegister();
    }
  };

  const submitRegister = async () => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(`${apiUrl}/register`, userData, config);
      if (data.type === 'success') {
        dispatch({ type: FLASH_SUCCESS, payload: data.message });
        auth.logIn(data.data);
        navigate(data.data.role === 'Employee' ? '/onboarding' : '/hrdashboard');
      } else {
        dispatch({ type: FLASH_ERROR, payload: data.message });
      }
    } catch (err) {
      dispatch({ type: FLASH_ERROR, payload: err.message });
    }
  };

  return (
    <div className="signup-container">
      <div className="content">
        <div className="heading-1">Humming BEE</div>
        <div className="heading-2">Register Here</div>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="signup-input-container">
            <div className="input-label">Name</div>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className={`input-box ${errors.name ? 'input-error' : ''}`}
              placeholder="Full Name"
            />
            {errors.name && <div className="error-text">{errors.name}</div>}
          </div>

          <div className="signup-input-container">
            <div className="input-label">Username</div>
            <input
              type="text"
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              className={`input-box ${errors.username ? 'input-error' : ''}`}
              placeholder="Username"
            />
            {errors.username && <div className="error-text">{errors.username}</div>}
          </div>

          <div className="signup-input-container">
            <div className="input-label">Email</div>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className={`input-box ${errors.email ? 'input-error' : ''}`}
              placeholder="name@company.com"
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>

          <div className="signup-input-container">
            <div className="input-label">Password</div>
            <input
              type="password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              className={`input-box ${errors.password ? 'input-error' : ''}`}
              placeholder="At least 8 characters"
            />
            {errors.password && <div className="error-text">{errors.password}</div>}
          </div>

          <div className="signup-input-container">
            <div className="input-label">Role</div>
            <select
              className={`input-box ${errors.role ? 'input-error' : ''}`}
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e.target.value })}
            >
              <option value="">Select Role</option>
              <option value="Employee">Employee</option>
              <option value="HR">HR</option>
            </select>
            {errors.role && <div className="error-text">{errors.role}</div>}
          </div>

          <div className="signup-input-container">
            <div className="input-label">Team</div>
            <select
              className={`input-box ${errors.team ? 'input-error' : ''}`}
              value={userData.team}
              onChange={(e) => setUserData({ ...userData, team: e.target.value })}
            >
              <option value="">Select Team</option>
              <option value="Development">Development</option>
              <option value="Management">Management</option>
              <option value="Design">Design</option>
              <option value="Team">Team</option>
            </select>
            {errors.team && <div className="error-text">{errors.team}</div>}
          </div>

          <button type="submit" className="sub-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
