import React, { useState } from "react";
import "./EmailVerificationPending.css";

const EmailVerificationPending = () => {
  const [isResent, setIsResent] = useState(false);

  const handleResend = () => {
    // Simulate sending verification email
    setIsResent(true);
    setTimeout(() => setIsResent(false), 3000); // Reset message after 3 seconds
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
        <button onClick={handleResend} className="resend-button">
          Resend Verification Link
        </button>
        {isResent && (
          <p className="success-message">
            Verification link sent! Please check your email.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationPending;
