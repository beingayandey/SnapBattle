import React from "react";
import "./SettingsToggle.css";

const SettingsToggle = ({ label, checked, onChange }) => {
  return (
    <div className="settings-toggle">
      <label className="settings-toggle__label" htmlFor={label}>
        {label}
      </label>
      <input
        id={label}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="settings-toggle__input"
      />
      <span className="settings-toggle__slider"></span>
    </div>
  );
};

export default SettingsToggle;
