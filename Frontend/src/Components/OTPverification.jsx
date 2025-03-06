import React, { useState } from "react";

function OTPverification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState(""); // State for error messages

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Keep only the last digit
    console.log(newOtp);
    
    setOtp(newOtp);

    // Move to the next input automatically
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const previousInput = document.getElementById(`otp-${index - 1}`);
      
      
      if (previousInput) previousInput.focus();
    }
  };

  const handleSubmit = () => {
    
    
    if (otp.every((digit) => digit.trim() !== "")) {
      setError(""); // Clear the error
      const otpString = otp.join("");
      console.log("Entered OTP:", otpString);
      alert(`OTP Submitted: ${otpString}`);
    } else {
      setError("Please enter all 4 digits of the OTP."); // Set error if OTP is incomplete
    }
  };

  return (
    <div className="otp">
      <div className="otp-container">
        <h2 className="otp-title">Verify Your OTP</h2>
        <p className="otp-description">Enter the 4-digit code sent to your email</p>
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              maxLength="1"
              className="otp-input"
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              required
            />
          ))}
        </div>
        {error && <p className="error-message">{error}</p>} {/* Error message */}
        <button className="otp-submit" onClick={handleSubmit}>
          Verify
        </button>
      </div>
    </div>
  );
}

export default OTPverification;
