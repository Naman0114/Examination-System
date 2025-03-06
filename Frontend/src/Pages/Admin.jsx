import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../css/style2.css'
import { addmin } from '../Redux/CartSlice';
import { useSelector, useDispatch } from 'react-redux';

function Admin() {
  const nevigate = useNavigate();
  const dispatch = useDispatch(); // Get dispatch function
  
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleToggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showSignUp && password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (email==="zafar@gmail.com" && password==="11") {
      console.log("yes");
      alert(`Form submitted! Email: ${email}`);
      nevigate('/Adminpage');
      
      
    }
    dispatch(addmin([email,password]));
    console.log(email,'memail');
    console.log(password,'memail');
    

  };
  return (
    <div>
      <div className="app-container">
        <div className="form-container">
          <h2>{showSignUp ? 'Sign Up' : 'Sign In'}</h2>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}
            <button type="submit" className="submit-btn">
              {showSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
          <p onClick={handleToggleForm} className="toggle-form">
            {showSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Admin
