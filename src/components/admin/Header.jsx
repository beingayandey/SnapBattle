import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import { cleanupVerification } from "../../redux/slices/verificationSlice";
import "./Header.css";
import { useToast } from "../../components/toast/ToastNotification";
import { logOut } from "../../api/api";

const Header = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    if (!token) {
      showError("No session found. You are already logged out.");
      // Clear sessionStorage and verification data for safety
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("justLoggedIn");
      dispatch(cleanupVerification());
      navigate("/login");
      setIsProfileOpen(false);
      return;
    }

    try {
      const response = await logOut(token);
      showSuccess(response.message || "Logged out successfully!");
      // Clear sessionStorage
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("justLoggedIn");
      // Clear verification data
      dispatch(cleanupVerification());
      navigate("/login");
    } catch (err) {
      showError(err.message || "Logout failed. Please try again.");
      console.error("Logout error:", err.message);
      // Clear sessionStorage and verification data even on failure
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("justLoggedIn");
      dispatch(cleanupVerification());
      navigate("/login");
    } finally {
      setIsProfileOpen(false);
    }
  };

  const profileItems = [
    { name: "Profile", href: "#profile" },
    { name: "Settings", href: "/settings" },
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
