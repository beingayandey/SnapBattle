import React, { useState } from "react";
import SettingsToggle from "./SettingsToggle";
import "./SettingsToggleGroup.css";

const SettingsToggleGroup = () => {
  const [toggles, setToggles] = useState({
    enableNewUserRegistration: false,
    enablePublicGallery: true,
    enableEventCreation: false,
  });

  const handleToggleChange = (key) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    // Placeholder: Save to Firebase
    console.log("Updated toggles:", { ...toggles, [key]: !toggles[key] });
  };

  return (
    <div className="settings-toggle-group">
      <h3 className="settings-toggle-group__title">App Settings</h3>
      <SettingsToggle
        label="Enable New User Registration"
        checked={toggles.enableNewUserRegistration}
        onChange={() => handleToggleChange("enableNewUserRegistration")}
      />
      <SettingsToggle
        label="Enable Public Gallery"
        checked={toggles.enablePublicGallery}
        onChange={() => handleToggleChange("enablePublicGallery")}
      />
      <SettingsToggle
        label="Enable Event Creation"
        checked={toggles.enableEventCreation}
        onChange={() => handleToggleChange("enableEventCreation")}
      />
    </div>
  );
};

export default SettingsToggleGroup;
