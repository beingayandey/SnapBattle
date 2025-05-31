// OtpInput.jsx
import React, { useState, useRef, useEffect } from "react";
import "./OtpInput.css";

const OtpInput = ({ length = 4, onChange, disabled = false, resetTrigger }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!disabled) {
      inputRefs.current[0]?.focus();
    }
  }, [disabled]);

  useEffect(() => {
    setOtp(Array(length).fill(""));
    inputRefs.current[0]?.focus();
  }, [resetTrigger, length]); // Reset on change

  const handleChange = (e, index) => {
    if (disabled) return;
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (newOtp.every((digit) => digit !== "") && index === length - 1) {
      onChange(newOtp.join(""));
    }

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (disabled) return;
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    if (disabled) return;
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (pastedData.length === length && /^[0-9]+$/.test(pastedData)) {
      const newOtp = pastedData.split("").slice(0, length);
      setOtp(newOtp);
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
