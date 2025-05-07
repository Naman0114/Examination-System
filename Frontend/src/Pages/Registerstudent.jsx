import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../css/style3.css';

function LoginStudent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const deleteLoggedInUsers = async () => {
      try {
        await axios.delete(`${url}/api/loginedusercurrent`);
        console.log("All logged-in users have been deleted.");
      } catch (error) {
        console.error("Error deleting logged-in users:", error);
      }
    };
    deleteLoggedInUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEnrollmentNumber = enrollmentNumber.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEnrollmentNumber || !trimmedPassword) {
      setError('Both fields are required.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${url}/api/homes`, {
        enrollmentNumber: trimmedEnrollmentNumber,
        password: trimmedPassword,
      });

      if (response.data.success) {
        navigate('/userloginsucc', { state: { users: response.data.user } });
      } else {
        setError(response.data.message || 'Invalid enrollment number or password!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fullpage-otp-bg">
      <div className="card-form">
        <h1>Student Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="enrollmentNumber">Enrollment Number</label>
            <input
              id="enrollmentNumber"
              type="text"
              value={enrollmentNumber}
              onChange={(e) => setEnrollmentNumber(e.target.value)}
              placeholder="Enter Enrollment Number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="toggle-form">
          <Link to="/forgetpass">Forgot Password?</Link>
        </p>
        <p className="toggle-form">
          Don’t have an account? <Link to="/Users">Create New Account</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginStudent;
