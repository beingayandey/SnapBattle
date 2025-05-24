import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import NotificationItem from "../../components/user/UserNotifications/NotificationItem";
import "./NotificationModal.css";

// Mock notification data (same as before)
const mockNotifications = [
  {
    id: 1,
    type: "alert",
    title: "System Alert",
    message: "Server maintenance scheduled for tonight.",
    date: "2025-05-24T10:00:00Z",
  },
  {
    id: 2,
    type: "result",
    title: "Test Results Available",
    message: "Your recent test results are now available.",
    date: "2025-05-23T14:30:00Z",
  },
  {
    id: 3,
    type: "info",
    title: "New Feature Released",
    message: "Check out our new dashboard features!",
    date: "2025-05-22T09:15:00Z",
  },
];

function NotificationModal({ isOpen, onClose }) {
  // Handle Escape key to close the modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="notification-modal-wrapper">
      <div className="notification-modal-overlay" onClick={onClose} />
      <div className="notification-modal">
        <div className="modal-header">
          <h2>Notifications</h2>
          <span className="modal-close" onClick={onClose}>
            ✕
          </span>
        </div>
        <div className="modal-content">
          {mockNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
        <div className="modal-footer">
          <a
            href="/user/notifications"
            className="see-more-link"
            onClick={onClose}
          >
            See More Notifications
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default NotificationModal;
