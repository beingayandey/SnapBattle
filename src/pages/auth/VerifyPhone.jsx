import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPhoneVerificationStatus } from "../../redux/slices/verificationSlice";
import { useToast } from "../../components/toast/ToastNotification";
import OtpInput from "../auth/OtpInput";
// import { sendPhoneOtp, verifyPhoneOtp } from "../../api/api";
import "./VerifyPhone.css";

const VerifyPhone = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState(null);
  const phoneNumber = sessionStorage.getItem("phone") || "Not available";
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
    // handleSendOtp();
  }, []);

  //   const handleSendOtp = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       await sendPhoneOtp({ token });
  //       setOtpSent(true);
  //       showSuccess("OTP sent to your phone number!");
  //     } catch (err) {
  //       setError(
  //         err.response?.data?.message || "Failed to send OTP. Please try again."
  //       );
  //       showError(
  //         err.response?.data?.message || "Failed to send OTP. Please try again."
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const handleVerifyOtp = async () => {
  //     if (!otp || otp.length !== 4) {
  //       showError("Please enter a valid 4-digit OTP.");
  //       return;
  //     }

  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await verifyPhoneOtp({ token, otp });
  //       dispatch(setPhoneVerificationStatus(true));
  //       showSuccess(
  //         response.data.message || "Phone number verified successfully!"
  //       );
  //       navigate("/user/dashboard");
  //     } catch (err) {
  //       setError(
  //         err.response?.data?.message ||
  //           "OTP verification failed. Please try again."
  //       );
  //       showError(
  //         err.response?.data?.message ||
  //           "OTP verification failed. Please try again."
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

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
            Please enter the 4-digit OTP sent to your phone number:{" "}
            <strong>{phoneNumber}</strong>
          </p>
          {error && <p className="error-message">{error}</p>}
          <OtpInput
            length={4}
            onChange={(otpValue) => setOtp(otpValue)}
            disabled={loading}
          />
          <div className="otp-actions">
            <button
              //   onClick={handleSendOtp}
              className="resend-otp-button"
              disabled={loading}
            >
              {otpSent ? "Resend OTP" : "Send OTP"}
            </button>
            <button
              //   onClick={handleVerifyOtp}
              className="verify-otp-button"
              disabled={loading || !otp || otp.length !== 4}
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
