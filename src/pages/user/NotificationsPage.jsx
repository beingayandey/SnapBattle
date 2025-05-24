import React, { useState } from "react";
import NotificationItem from "../../components/user/UserNotifications/NotificationItem";
import NotificationFilter from "../../components/user/UserNotifications/NotificationFilter";
import "./NotificationsPage.css";

// Mock notification data
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
  {
    id: 4,
    type: "admin",
    title: "Admin Update",
    message: "Please update your profile information.",
    date: "2025-05-21T16:45:00Z",
  },
];

function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filterType, setFilterType] = useState("all");
  const [sortByDate, setSortByDate] = useState("desc");

  const handleFilterChange = (type) => {
    setFilterType(type);
    let filtered = mockNotifications;
    if (type !== "all") {
      filtered = mockNotifications.filter((n) => n.type === type);
    }
    applySorting(filtered);
  };

  const handleSortChange = (order) => {
    setSortByDate(order);
    applySorting(notifications);
  };

  const applySorting = (notifs) => {
    const sorted = [...notifs].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortByDate === "desc" ? dateB - dateA : dateA - dateB;
    });
    setNotifications(sorted);
  };

  return (
    <div className="notifications-page">
      <h1 className="notifications-title">Notifications</h1>
      <NotificationFilter
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <p className="no-notifications">No notifications found.</p>
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
