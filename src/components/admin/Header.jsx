import React, { useState } from "react";
import "./Header.css";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";

const Header = ({ toggleSidebar, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent any default behavior
    console.log("Logout clicked in Header..."); // Debug log
    onLogout(); // Call onLogout from AdminLayout
    setIsProfileOpen(false); // Close dropdown
  };

  const profileItems = [
    { name: "Profile", href: "#profile" },
    { name: "Settings", href: "#settings" },
    { name: "Logout", action: handleLogout },
  ];

  return (
    <header className="admin-header">
      <div className="header-container">
        <button className="mobile-menu-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div className="header-logo">
          <h1>SnapBattle Admin</h1>
        </div>
        <div className="header-controls">
          <div className="control-icon notification">
            <FaBell />
            <span className="notification-badge">3</span>
          </div>
          <div className="profile-dropdown">
            <button className="control-icon profile" onClick={toggleProfile}>
              <FaUserCircle />
            </button>
            {isProfileOpen && (
              <ul className="dropdown-menu">
                {profileItems.map((item) => (
                  <li key={item.name}>
                    {item.action ? (
                      <a onClick={item.action} className="dropdown-item-button">
                        {item.name}
                      </a>
                    ) : (
                      <a href={item.href}>{item.name}</a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
