import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPhoneVerificationStatus } from "../../redux/slices/verificationSlice";
import { useToast } from "../../components/toast/ToastNotification";
import OtpInput from "../auth/OtpInput";
import { sendOtp, verifyOtp } from "../../api/api"; // Import the API functions
import "./VerifyPhone.css";

const VerifyPhone = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState(null);
  const phoneNumber = sessionStorage.getItem("phone");
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  // Request OTP on component mount
  useEffect(() => {
    if (!token) {
      showError("Authentication token not found. Please log in again.");
      navigate("/login");
      return;
    }
    handleSendOtp(); // Automatically send OTP on page load
  }, []);

  const handleSendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      await sendOtp(phoneNumber);
      setOtpSent(true);
      showSuccess("OTP sent to your phone number!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.errors ||
        err.response?.data?.message ||
        "Failed to send OTP. Please try again.";
      if (errorMessage === "phone already verified") {
        dispatch(setPhoneVerificationStatus(true));
        showSuccess("Phone number already verified!");
        navigate("/user/dashboard");
      } else {
        setError(errorMessage);
        showError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      showError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await verifyOtp({ code: otp, channel: "phone" });
      dispatch(setPhoneVerificationStatus(true));
      showSuccess(response.message || "Phone number verified successfully!");
      navigate("/user/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "OTP verification failed. Please try again.";
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-phone-container">
      <div className="verify-phone-card">
        <div className="verify-phone-content">
          {loading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
            </div>
          )}
          <h2 className="verify-phone-title">Verify Your Phone Number</h2>
          <p className="verify-phone-message">
            Please enter the 6-digit OTP sent to your phone number:
            <strong>{phoneNumber}</strong>
          </p>
          {error && <p className="error-message">{error}</p>}
          <OtpInput
            length={6}
            onChange={(otpValue) => setOtp(otpValue)}
            disabled={loading}
          />
          <div className="otp-actions">
            <button
              onClick={handleSendOtp}
              className="resend-otp-button"
              disabled={loading}
            >
              {otpSent ? "Resend OTP" : "Send OTP"}
            </button>
            <button
              onClick={handleVerifyOtp}
              className="verify-otp-button"
              disabled={loading || !otp || otp.length !== 6}
            >
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhone;
