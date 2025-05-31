import React from "react";
import { useNavigate } from "react-router-dom";
import "./PhoneVerificationAlert.css";

const PhoneVerificationAlert = () => {
  const navigate = useNavigate();

  return (
    <div className="phone-verification-alert">
      <p className="alert-message">
        Your phone number is not verified yet. You cannot use some features of
        this app.
      </p>
      <button
        className="verify-now-button"
        onClick={() => navigate("/verify-phone")}
      >
        Verify Phone Number Now
      </button>
    </div>
  );
};

export default PhoneVerificationAlert;
