import React, { useState } from "react";

import NotificationSettings from "../../components/user/UserSettings/NotificationSettings";
import ThemeToggle from "../../components/user/UserSettings/ThemeToggle";
import LanguageSettings from "../../components/user/UserSettings/LanguageSettings";
import PrivacyControls from "../../components/user/UserSettings/PrivacyControls";
import "./SettingsPage.css";

function SettingsPage() {
  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1>Settings</h1>
      </header>
      <div className="settings-content">
        <NotificationSettings />
        <ThemeToggle />
        <LanguageSettings />
        <PrivacyControls />
      </div>
    </div>
  );
}

export default SettingsPage;
