import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "./OtpInput";
import "./EmailVerificationPending.css";
import { useToast } from "../../components/toast/ToastNotification";
import { verifyOtp, sendOtp } from "../../api/api";

const EmailVerificationPending = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [identifier, setIdentifier] = useState(""); // Local state for email
  const [cooldown, setCooldown] = useState(0); // State for countdown timer
  const { showSuccess, showError } = useToast();
  const [resetOtpKey, setResetOtpKey] = useState(0); // Trigger value
  const navigate = useNavigate();
  const location = useLocation();

  // Memoize showError to ensure stability
  const stableShowError = useCallback(showError, [showError]);

  // Calculate remaining cooldown based on localStorage
  const calculateRemainingCooldown = () => {
    const cooldownStart = localStorage.getItem("resendCooldownStart");
    if (cooldownStart) {
      const startTime = parseInt(cooldownStart, 10);
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const remainingSeconds = Math.max(60 - elapsedSeconds, 0);
      return remainingSeconds;
    }
    return 0;
  };

  // Update cooldown every second
  useEffect(() => {
    const updateCooldown = () => {
      const remaining = calculateRemainingCooldown();
      setCooldown(remaining);

      if (remaining === 0) {
        localStorage.removeItem("resendCooldownStart");
      }
    };

    // Set initial cooldown
    updateCooldown();

    // Update every second
    const interval = setInterval(updateCooldown, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Extract email from location.state
  useEffect(() => {
    const email = location.state?.email;
    if (email && email !== "undefined") {
      setIdentifier(email);
    } else {
      stableShowError("Email not found. Please try signing up again.");
      navigate("/signup", { replace: true });
    }
  }, [location, stableShowError, navigate]);

  const handleResend = async () => {
    if (!identifier) {
      stableShowError("Email not found. Please try signing up again.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await sendOtp(identifier);
      showSuccess(
        response.message || "Verification email resent successfully!"
      );
      // Store the cooldown start time in localStorage
      const startTime = Date.now();
      localStorage.setItem("resendCooldownStart", startTime.toString());
      setCooldown(60); // Start 60-second cooldown after successful resend
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to resend verification email. Please try again.";
      stableShowError(errorMessage);
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
      if (response.message === "User verified successfully") {
        showSuccess("Email verified successfully!");
        const verifiedEmail = response.data.user.email;
        navigate("/login", { state: { email: verifiedEmail }, replace: true });
      } else {
        stableShowError(response.message || "Invalid OTP. Please try again.");
        setResetOtpKey((prev) => prev + 1); // Trigger reset
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "OTP verification failed. Please try again.";
      stableShowError(errorMessage);
      console.error("OTP Verification Error:", error);
      setResetOtpKey((prev) => prev + 1); // Trigger reset
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
            Your email address <strong>{identifier}</strong> has not been
            verified yet. Please check your inbox (and spam/junk folder) for the
            verification email to access your dashboard.
          </p>
          <div className="otp-section">
            <p className="verification-message">Enter OTP from email:</p>
            <OtpInput
              length={6}
              onChange={handleOtpSubmit}
              disabled={isLoading}
              resetTrigger={resetOtpKey}
            />
          </div>
          {cooldown > 0 && (
            <p className="cooldown-message">Resend available in {cooldown}s</p>
          )}
          <button
            onClick={handleResend}
            className="resend-button"
            disabled={isLoading || cooldown > 0}
          >
            Resend Verification Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPending;
