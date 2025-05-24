import React from "react";
import "./NotificationItem.css";

function NotificationItem({ notification }) {
  const getIcon = (type) => {
    switch (type) {
      case "alert":
        return <span className="notification-icon danger">⚠️</span>;
      case "result":
        return <span className="notification-icon success">✅</span>;
      case "info":
        return <span className="notification-icon info">ℹ️</span>;
      case "admin":
        return <span className="notification-icon admin">👤</span>;
      default:
        return <span className="notification-icon">🔔</span>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="notification-item">
      {getIcon(notification.type)}
      <div className="notification-content">
        <h2 className="notification-title">{notification.title}</h2>
        <p className="notification-message">{notification.message}</p>
        <p className="notification-date">{formatDate(notification.date)}</p>
      </div>
    </div>
  );
}

export default NotificationItem;
