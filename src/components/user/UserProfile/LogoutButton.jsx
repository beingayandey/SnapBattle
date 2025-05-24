import React from "react";
import "./LogoutButton.css";

const LogoutButton = () => {
  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
