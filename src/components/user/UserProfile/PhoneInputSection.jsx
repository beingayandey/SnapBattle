import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInputSection = ({
  phoneNumber,
  countryCode,
  isPhoneVerified,
  phoneError,
  handlePhoneChange,
  loading,
}) => {
  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="form-group">
      <label htmlFor="phone">Phone Number</label>
      <PhoneInput
        country={countryCode}
        value={phoneNumber}
        onChange={handlePhoneChange}
        disabled={isPhoneVerified}
        inputClass={`form-input ${
          isPhoneVerified ? "form-input-disabled" : ""
        }`}
        buttonClass="country-dropdown"
        placeholder="Enter phone number"
      />
      {phoneError && <p className="form-error">{phoneError}</p>}
      {isPhoneVerified && <span className="verified-badge">Verified</span>}
    </div>
  );
};

export default PhoneInputSection;
