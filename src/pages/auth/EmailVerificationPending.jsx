import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "./OtpInput";
import "./EmailVerificationPending.css";
import { useToast } from "../../components/toast/ToastNotification";
import { verifyOtp } from "../../api/api";

const EmailVerificationPending = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [identifier, setIdentifier] = useState(""); // Local state for email
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Memoize showError to ensure stability
  const stableShowError = useCallback(showError, [showError]);

  const handleResend = async () => {
    setIsLoading(true);
    try {
      // Replace with actual resend API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      showSuccess("Verification email resent successfully!");
    } catch (error) {
      stableShowError("Failed to resend verification email. Please try again.");
      console.error("Resend error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (otpValue) => {
    setOtp(otpValue);
    setIsLoading(true);
    try {
      const response = await verifyOtp(identifier, otpValue, "email");
      // Check for successful verification
      if (response.message === "User verified successfully") {
        showSuccess("Email verified successfully!");
        // Use email from response for consistency
        const verifiedEmail = response.data.user.email;
        navigate("/login", { state: { email: verifiedEmail }, replace: true });
      } else {
        stableShowError(response.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "OTP verification failed. Please try again.";
      stableShowError(errorMessage);
      console.error("OTP Verification Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="verification-container">
      <div className="verification-card">
        <div className="verification-content">
          {isLoading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
            </div>
          )}
          <h1 className="verification-title">Email Verification Required</h1>
          <p className="verification-message">
            Your email address has not been verified yet. Please check your
            inbox (and spam/junk folder) for the verification email to access
            your dashboard.
          </p>
          <div className="otp-section">
            <p className="verification-message">Enter OTP from email:</p>
            <OtpInput
              length={6}
              onChange={handleOtpSubmit}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleResend}
            className="resend-button"
            disabled={isLoading}
          >
            Resend Verification Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPending;
