import React, { useState } from "react";
import "./NotificationSettings.css";

function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });

  const handleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="notification-settings card">
      <h2>Notifications</h2>
      <div className="toggle-group">
        <label className="toggle-item">
          <span>Email Notifications</span>
          <input
            type="checkbox"
            checked={notifications.email}
            onChange={() => handleToggle("email")}
          />
        </label>
        <label className="toggle-item">
          <span>Push Notifications</span>
          <input
            type="checkbox"
            checked={notifications.push}
            onChange={() => handleToggle("push")}
          />
        </label>
        <label className="toggle-item">
          <span>SMS Notifications</span>
          <input
            type="checkbox"
            checked={notifications.sms}
            onChange={() => handleToggle("sms")}
          />
        </label>
      </div>
    </section>
  );
}

export default NotificationSettings;
