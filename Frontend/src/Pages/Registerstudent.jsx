import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addtempenrollmentnumber } from '../Redux/CartSlice';



function LoginStudent() {
  const navigate = useNavigate();
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [userDetail, setuserDetail] = useState([]);
  const name2 = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Trim the input fields to avoid issues with leading/trailing spaces
    const trimmedEnrollmentNumber = enrollmentNumber.trim();
    const trimmedPassword = password.trim();
  
    if (!trimmedEnrollmentNumber || !trimmedPassword) {
      setError('Both fields are required.');
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/homes', {
        enrollmentNumber: trimmedEnrollmentNumber,
        password: trimmedPassword,
      });
  
      if (response.data.success) {
        setuserDetail(response.data.user);
   
        navigate('/userloginsucc', { state: { users: response.data.user } });
      } else {
        setError(response.data.message || 'Invalid enrollment number or password!');
      }
    } catch (error) {
      console.error('Error during login:', error);
  
      if (error.response) {
        if (error.response.status === 401) {
          setError('Incorrect enrollment number or password.');
        } else {
          setError(error.response.data.message || 'An error occurred. Please try again.');
        }
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="enrollmentNumber">Enrollment Number:</label>
          <input
            id="enrollmentNumber"
            type="text" // Use text instead of number to handle leading zeros
            name="enrollmentNumber"
            value={enrollmentNumber}
            onChange={(e) => setEnrollmentNumber(e.target.value)}
            required
            // placeholder="Enter your enrollment number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            // placeholder="Enter your password"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Display error message if login fails */}
      {error && <div className="error-message">{error}</div>}

      <p className="create-account">
        Don't have an account?{' '}
        <Link to={'/Users'}>Create New Account</Link>
      </p>
    </div>
  );
}

export default LoginStudent;
