import React, { useState } from "react";
import "./Header.css";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const profileItems = ["Profile", "Settings", "Logout"];

  return (
    <header className="admin-header">
      <div className="header-container">
        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>

        {/* Logo/Title */}
        <div className="header-logo">
          <h1>SnapBattle Admin</h1>
        </div>

        {/* Admin Controls */}
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
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`}>{item}</a>
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
