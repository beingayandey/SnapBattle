import { useState } from "react";
import NotificationModal from "./NotificationModal";
import "./Navbar.css";

function Navbar({ toggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          <div className="notification" onClick={openModal}>
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
      <NotificationModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
}

export default Navbar;
