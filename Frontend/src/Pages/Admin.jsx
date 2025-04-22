import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/style2.css';
import axios from 'axios';

function Admin() {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_BASE_URL;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Both fields are required.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${url}/api/admin-login`, {
        email: email.trim(),
        password: password.trim(),
      });

      if (response.data.success) {
        const admin = response.data.user;
        console.log('✅ Admin logged in:', admin);

        navigate('/Adminpage', { state: { admin } });
      } else {
        setError(response.data.message || 'Invalid credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-bg"> {/* ✅ Background wrapper */}
      <div className="login-container transparent-box"> {/* ✅ Transparent box */}
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email ID:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
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
          Don't have an account? <Link to="/AdminSignup">Create New Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Admin;
