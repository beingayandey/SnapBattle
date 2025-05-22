import React from "react";
import "./UserNotifications.css";

// Mock data (replace with real data)
const notifications = [
  { id: 1, message: "Your photo was approved!", time: "2h ago" },
  { id: 2, message: "New contest: Autumn Colors", time: "1d ago" },
];

function UserNotifications() {
  return (
    <div className="user-notifications">
      <h2 className="notifications-title">Notifications</h2>
      <ul className="notifications-list">
        {notifications.map((notification) => (
          <li key={notification.id} className="notification-item">
            <span className="notification-message">{notification.message}</span>
            <span className="notification-time">{notification.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserNotifications;
