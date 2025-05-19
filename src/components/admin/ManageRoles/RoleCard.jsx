import React from "react";
import "./roleCard.css";

const RoleCard = ({ user, onEdit }) => {
  return (
    <div className="role-card">
      <div className="card-header">
        <h3>{user.name}</h3>
        <span className={`role-badge role-${user.role}`}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      </div>
      <p className="card-email">{user.email}</p>
      <button className="edit-btn" onClick={() => onEdit(user)}>
        Edit Role
      </button>
    </div>
  );
};

export default RoleCard;
