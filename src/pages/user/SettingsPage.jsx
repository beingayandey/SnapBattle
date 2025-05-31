import "./SettingsPage.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ThemeToggle from "../../components/user/UserSettings/ThemeToggle";
import PrivacyControls from "../../components/user/UserSettings/PrivacyControls";
import LanguageSettings from "../../components/user/UserSettings/LanguageSettings";
import NotificationSettings from "../../components/user/UserSettings/NotificationSettings";
import PhoneVerificationAlert from "../../components/user/UserSettings/PhoneVerificationAlert";
import { cleanupVerification } from "../../redux/slices/verificationSlice";

function SettingsPage() {
  const dispatch = useDispatch();
  const { isPhoneVerified } = useSelector((state) => state.verification);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      dispatch(cleanupVerification()); // Clear verification data if no token
    }
  }, [dispatch, token]);

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1>Settings</h1>
      </header>
      <div className="settings-content">
        {!isPhoneVerified && <PhoneVerificationAlert />}
        <NotificationSettings />
        <ThemeToggle />
        <LanguageSettings />
        <PrivacyControls />
      </div>
    </div>
  );
}

export default SettingsPage;
