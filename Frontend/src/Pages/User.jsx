import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/style2.css'; // Custom styles
import '../javascript/ja';

function User() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    email: "",
    gender: "",
    course: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showOTPSection, setShowOTPSection] = useState(false);
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    axios
      .post(`${url}/api/sendemail1`, {
        NAME: formData.fullName,
        AGE: formData.age,
        Email: formData.email,
        GENDER: formData.gender,
        COURSE: formData.course,
        PASSWORD: formData.password,
      })
      .then(() => {
        alert("Registration Successful! OTP has been sent to your email.");
        setShowOTPSection(true);
      })
      .catch((err) => {
        console.error("Error during registration:", err);
      });
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const previousInput = document.getElementById(`otp-${index - 1}`);
      if (previousInput) previousInput.focus();
    }
  };

  const handleOtpSubmit = () => {
    if (otp.every((digit) => digit.trim() !== "")) {
      const otpString = otp.join("");

      axios
        .post(`${url}/api/verify-otp`, { email: formData.email, otp: otpString })
        .then(() => {
          const enrollmentNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

          axios.post(`${url}/api/store`, {
            enrollmentNumber,
            NAME: formData.fullName,
            Email: formData.email,
            AGE: formData.age,
            GENDER: formData.gender,
            COURSE: formData.course,
            PASSWORD: formData.password,
          });

          alert("OTP Verified! Registration Complete.");
          navigate("/Register");
        })
        .catch((err) => {
          console.error("OTP Error:", err);
          setOtpError("Invalid OTP. Please try again.");
        });
    } else {
      setOtpError("Please enter all 4 digits of the OTP.");
    }
  };

  return (
    <div className="fullpage-otp-bg">
      <div className="card-form">
        <h1 className="text-center">{!showOTPSection ? "Registration Form" : "Verify OTP"}</h1>

        {!showOTPSection ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group"><label>Full Name:</label><input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required /></div>
            <div className="form-group"><label>Age:</label><input type="number" name="age" value={formData.age} onChange={handleChange} required /></div>
            <div className="form-group"><label>Email:</label><input type="email" name="email" value={formData.email} onChange={handleChange} required /></div>
            <div className="form-group"><label>Gender:</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select</option><option value="Male">Male</option>
                <option value="Female">Female</option><option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group"><label>Course:</label>
              <select name="course" value={formData.course} onChange={handleChange} required>
                <option value="">Select</option><option value="B.Tech">B.Tech</option>
                <option value="B.Sc">B.Sc</option><option value="M.Sc">M.Sc</option>
              </select>
            </div>
            <div className="form-group"><label>Password:</label><input type="password" name="password" value={formData.password} onChange={handleChange} required /></div>
            <div className="form-group"><label>Confirm Password:</label><input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required /></div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="btn-primary-full">Register</button>
          </form>
        ) : (
          <>
            <p className="text-center">Enter the 4-digit code sent to your email</p>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  maxLength="1"
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleOtpBackspace(e, index)}
                  required
                />
              ))}
            </div>
            {otpError && <p className="error-message">{otpError}</p>}
            <button onClick={handleOtpSubmit} className="btn-primary-full">Verify OTP</button>
          </>
        )}
      </div>
    </div>
  );
}

export default User;
