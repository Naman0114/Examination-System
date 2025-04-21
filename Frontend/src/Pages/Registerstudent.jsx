import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addtempenrollmentnumber } from '../Redux/CartSlice';

function LoginStudent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name2 = useSelector((state) => state.cart);

  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userDetail, setuserDetail] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const url = process.env.REACT_APP_API_BASE_URL;

  // ✅ Log updated userDetail when it changes
  useEffect(() => {
    if (userDetail && userDetail.enrollmentNumber) {
      console.log('✅ userDetail updated:', userDetail);
    }
  }, [userDetail]);
  useEffect(() => {
    const deleteLoggedInUsers = async () => {
      try {
        // Call API to delete all logged-in users
        await axios.delete(`${url}/api/loginedusercurrent`);
        console.log("All logged-in users have been deleted.");
      } catch (error) {
        console.error("Error deleting logged-in users:", error);
      }
    };

    deleteLoggedInUsers();  // Call to delete users on component mount
  }, []); // Em

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
        const user = response.data.user;

        setuserDetail(user); // ✅ updates the user state
        // dispatch(addtempenrollmentnumber(user.enrollmentNumber)); // ✅ store in Redux
        navigate('/userloginsucc', { state: { users: user } }); // ✅ navigate with user

        console.log('✅ Logged in user:', user);
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
            type="text"
            name="enrollmentNumber"
            value={enrollmentNumber}
            onChange={(e) => setEnrollmentNumber(e.target.value)}
            required
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
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <p className="create-account">
        Don't have an account? <Link to="/Users">Create New Account</Link>
      </p>
    </div>
  );
}

export default LoginStudent;
