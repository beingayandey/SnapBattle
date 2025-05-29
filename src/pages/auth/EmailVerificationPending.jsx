import React, { useState } from "react";
import OtpInput from "./OtpInput";
import "./EmailVerificationPending.css";
import { useToast } from "../../components/toast/ToastNotification";

const EmailVerificationPending = () => {
  const [otp, setOtp] = useState("");
  const { showSuccess } = useToast();

  const handleResend = () => {
    // Simulate sending verification email

    setTimeout(() => setIsResent(false), 3000); // Reset message after 3 seconds
    showSuccess("Verification email resent successfully!");
  };

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
    // Add logic to verify OTP if needed
    console.log("OTP Entered:", otpValue);
  };

  return (
    <div className="verification-container">
      <div className="verification-card">
        <h1 className="verification-title">Email Verification Required</h1>
        <p className="verification-message">
          Your email address has not been verified yet. Please check your inbox
          (and spam/junk folder) for the verification email to access your
          dashboard.
        </p>
        <div className="otp-section">
          <p className="verification-message">Enter OTP from email:</p>
          <OtpInput length={6} onChange={handleOtpChange} />
        </div>
        <button onClick={handleResend} className="resend-button">
          Resend Verification Link
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationPending;
