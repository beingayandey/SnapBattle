import React from "react";
import "./RoleBadge.css";

const RoleBadge = ({ role }) => {
  return (
    <span className={`role-badge role-${role.toLowerCase()}`}>{role}</span>
  );
};

export default RoleBadge;
