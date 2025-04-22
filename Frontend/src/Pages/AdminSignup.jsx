import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/style2.css';
import '../javascript/ja';

function AdminSignup() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        gender: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [showOTPSection, setShowOTPSection] = useState(false);
    const [otpError, setOtpError] = useState("");

    const navigate = useNavigate();
    const url = process.env.REACT_APP_API_BASE_URL;

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setError(""); // Clear errors
        console.log("Sending Email:", formData.email);
        axios
            .post(`${url}/api/sendemail12`, {
                NAME: formData.fullName,
                Email: formData.email,
                GENDER: formData.gender,
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

    // Handle OTP input
    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Automatically move focus to the next field
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

    // Handle OTP submission
    const handleOtpSubmit = () => {
        if (otp.every((digit) => digit.trim() !== "")) {
            setOtpError("");
            const otpString = otp.join("");

            axios
                .post(`${url}/api/verify-otp`, { email: formData.email, otp: otpString })
                .then(() => {
                    return axios.post(`${url}/api/admins`, {
                        NAME: formData.fullName,
                        Email: formData.email,
                        GENDER: formData.gender,
                        PASSWORD: formData.password,
                    });
                })
                .then(() => {
                    alert("Registration complete!");
                    navigate("/Admin");
                })
                .catch((err) => {
                    console.error("OTP verification or saving error:", err);
                    setOtpError("Invalid OTP or server error.");
                });
        } else {
            setOtpError("Please enter all 4 digits of the OTP.");
        }
    };

    return (
        <div className="signupbg"> {/* Apply background image here */}
            <div className="registration-container">
                <h1>Administration Form</h1>
                {!showOTPSection ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name:</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Gender:</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>New Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="register-button">
                            Register
                        </button>
                    </form>
                ) : (
                    <div className="otp-container">
                        <h2>Verify Your OTP</h2>
                        <p>Enter the 4-digit code sent to your email</p>
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
                        <button onClick={handleOtpSubmit} className="otp-submit">
                            Verify OTP
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminSignup;
