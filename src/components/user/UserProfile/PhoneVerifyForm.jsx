import React from "react";
import usePhoneVerification from "../../../hooks/usePhoneVerification";
import PhoneInputSection from "./PhoneInputSection";
import VerificationCodeSection from "./VerificationCodeSection";
import "./PhoneVerifyForm.css";

const PhoneVerifyForm = ({ phone, isPhoneVerified, onVerify }) => {
  const {
    phoneNumber,
    countryCode,
    code,
    isCodeSent,
    error,
    phoneError,
    loading,
    setCode,
    handlePhoneChange,
    handleSendCode,
    handleVerifyCode,
    handleCancelVerification,
  } = usePhoneVerification(phone, onVerify);

  return (
    <div className="phone-verify-form">
      <h2 className="form-title">Phone Number Verification</h2>
      <PhoneInputSection
        phoneNumber={phoneNumber}
        countryCode={countryCode}
        isPhoneVerified={isPhoneVerified}
        phoneError={phoneError}
        handlePhoneChange={handlePhoneChange}
        loading={loading}
      />
      {!isPhoneVerified && (
        <>
          {!isCodeSent ? (
            <button
              type="button"
              className="form-button form-button-primary"
              onClick={handleSendCode}
              disabled={loading}
            >
              Send Verification Code
            </button>
          ) : (
            <VerificationCodeSection
              code={code}
              setCode={setCode}
              error={error}
              handleVerifyCode={handleVerifyCode}
              handleCancelVerification={handleCancelVerification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PhoneVerifyForm;
