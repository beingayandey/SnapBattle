import { useState, useEffect } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { getUserCountry } from "../api/api";

const usePhoneVerification = (initialPhone, onVerify) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(true);

  // Format and validate phone number
  const formatPhoneNumber = (phone, country) => {
    let formattedPhone = phone.replace(/[^0-9]/g, "");
    if (country === "in") {
      formattedPhone = `+91${formattedPhone.slice(-10)}`;
    } else {
      formattedPhone = `+1${formattedPhone}`;
    }
    return formattedPhone;
  };

  const validatePhoneNumber = (number, country) => {
    if (!number) return "Please enter a phone number.";
    if (!country) return "Please select a country.";
    const parsedNumber = parsePhoneNumberFromString(
      number,
      country.toUpperCase()
    );
    if (!parsedNumber || !parsedNumber.isValid()) {
      return "Invalid phone number for the selected country.";
    }
    return "";
  };

  // Fetch country on mount
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await getUserCountry();
        const country = data.country ? data.country.toLowerCase() : "us";
        setCountryCode(country);

        const formattedPhone = formatPhoneNumber(initialPhone, country);
        setPhoneNumber(formattedPhone);

        const validationError = validatePhoneNumber(formattedPhone, country);
        if (validationError) setPhoneError(validationError);
      } catch (err) {
        console.error("Failed to fetch country from IP:", err);
        setCountryCode("us");
        const formattedPhone = formatPhoneNumber(initialPhone, "us");
        setPhoneNumber(formattedPhone);
        const validationError = validatePhoneNumber(formattedPhone, "us");
        if (validationError) setPhoneError(validationError);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [initialPhone]);

  const handlePhoneChange = (value, countryData) => {
    setPhoneNumber(value);
    setCountryCode(countryData.countryCode);
    setPhoneError("");

    const validationError = validatePhoneNumber(value, countryData.countryCode);
    if (validationError) setPhoneError(validationError);
  };

  const handleSendCode = () => {
    const validationError = validatePhoneNumber(phoneNumber, countryCode);
    if (validationError) {
      setPhoneError(validationError);
      return;
    }
    setIsCodeSent(true);
    setError("");
    console.log(`Verification code sent to ${phoneNumber}`);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (code.trim() === "") {
      setError("Please enter a verification code.");
      return;
    }
    if (code === "123456") {
      onVerify();
      setCode("");
      setIsCodeSent(false);
      setError("");
      console.log("Phone number verified");
    } else {
      setError("Invalid verification code.");
    }
  };

  const handleCancelVerification = () => {
    setIsCodeSent(false);
    setCode("");
    setError("");
  };

  return {
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
  };
};

export default usePhoneVerification;
