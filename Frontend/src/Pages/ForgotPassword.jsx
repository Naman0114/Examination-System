import React, { useState } from 'react';
import axios from 'axios';
import '../css/ForgotPassword.css';

function ForgotPassword() {
  const [formData, setFormData] = useState({
    enrollmentNumber: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const url = process.env.REACT_APP_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { enrollmentNumber, email, newPassword, confirmPassword } = formData;

    if (!enrollmentNumber || !email || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`${url}/api/resetpass`, {
        enrollmentNumber,
        email,
        newPassword
      });

      if (response.data.success) {
        setSuccess('Password reset successfully.');
      } else {
        setError(response.data.message || 'Failed to reset password.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error occurred.');
    }
  };

  return (
    <div className="forgot-main">
      <div className="left-side">
        <div className="image-overlay" />
      </div>
      <div className="right-side">
        <div className="form-box">
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Enrollment Number</label>
              <input
                type="text"
                name="enrollmentNumber"
                value={formData.enrollmentNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
