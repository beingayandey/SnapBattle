import React, { useState } from "react";
import "./UserActionsDropdown.css";

const UserActionsDropdown = ({ userId, handleAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { label: "View", value: "view" },
    { label: "Ban", value: "ban" },
    { label: "Delete", value: "delete" },
    { label: "Change Role", value: "changeRole" },
  ];

  return (
    <div className="user-actions-dropdown">
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        Actions
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {actions.map((action) => (
            <li
              key={action.value}
              onClick={() => {
                handleAction(userId, action.value);
                setIsOpen(false);
              }}
            >
              {action.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserActionsDropdown;
