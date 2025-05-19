import React from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { FaPlus, FaUsersCog, FaCog, FaChartBar } from "react-icons/fa";

const QuickActions = ({ theme = "light" }) => {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Create Event",
      icon: <FaPlus />,
      onClick: () => navigate("/admin/create-event"),
    },
    {
      label: "Manage Roles",
      icon: <FaUsersCog />,
      onClick: () => navigate("/admin/roles"), // Placeholder
    },
    {
      label: "Settings",
      icon: <FaCog />,
      onClick: () => console.log("Navigate to Settings"), // Placeholder
    },
    {
      label: "View Reports",
      icon: <FaChartBar />,
      onClick: () => console.log("Navigate to Reports"), // Placeholder
    },
  ];

  return (
    <div
      className={clsx("quick-actions-container", theme === "dark" && "dark")}
    >
      <h2 className="quick-actions-title">Quick Actions</h2>
      <div className="quick-actions-grid">
        {actions.map((action, index) => (
          <button
            key={index}
            className="action-button"
            onClick={action.onClick}
            aria-label={action.label}
          >
            {action.icon}
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
