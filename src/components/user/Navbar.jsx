import { useState } from "react";
import "./Navbar.css";

function Navbar({ toggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <button className="menu-toggle" onClick={toggleSidebar}>
            ☰
          </button>
          <div className="navbar-logo">UserPanel</div>
        </div>
        <div className="navbar-right">
          <div className="notification">
            <span className="notification-icon">🔔</span>
            <span className="notification-count">3</span>
          </div>
          <div className="user-menu">
            <button className="user-avatar" onClick={toggleDropdown}>
              <span>JD</span>
            </button>
            {isDropdownOpen && (
              <div className="user-dropdown">
                <a href="/profile">Profile</a>
                <a href="/settings">Settings</a>
                <a href="/logout">Logout</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
