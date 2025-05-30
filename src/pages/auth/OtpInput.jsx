import React, { useState, useRef, useEffect } from "react";
import "./OtpInput.css";

const OtpInput = ({ length = 4, onChange, disabled = false }) => {
  // Initialize state for OTP values
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  // Focus the first input on mount
  useEffect(() => {
    if (!disabled) {
      inputRefs.current[0]?.focus();
    }
  }, [disabled]);

  // Handle input change
  const handleChange = (e, index) => {
    if (disabled) return; // Prevent changes when disabled

    const value = e.target.value;

    // Only allow single digit
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Only call onChange when all digits are filled
    if (newOtp.every((digit) => digit !== "") && index === length - 1) {
      onChange(newOtp.join(""));
    }

    // Move to next input if a digit is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle key down events (e.g., backspace, arrow keys)
  const handleKeyDown = (e, index) => {
    if (disabled) return; // Prevent key events when disabled

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    if (disabled) return; // Prevent paste when disabled

    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (pastedData.length === length && /^[0-9]+$/.test(pastedData)) {
      const newOtp = pastedData.split("").slice(0, length);
      setOtp(newOtp);
      // Only call onChange when all digits are filled
      onChange(newOtp.join(""));
      inputRefs.current[length - 1].focus();
    }
  };

  return (
    <div className="otp-container">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el)}
          className={`otp-input ${disabled ? "otp-input-disabled" : ""}`}
          autoComplete="off"
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default OtpInput;
