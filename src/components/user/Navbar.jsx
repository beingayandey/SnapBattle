import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { cleanupVerification } from "../../redux/slices/verificationSlice";
import NotificationModal from "./NotificationModal";
import "./Navbar.css";
import { useToast } from "../../components/toast/ToastNotification";
import { logOut } from "../../api/api";

function Navbar({ toggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      sessionStorage.removeItem("phone");
      dispatch(cleanupVerification());
      navigate("/login");
      setIsDropdownOpen(false);
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
      setIsDropdownOpen(false);
    }
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
                <Link to="/user/profile">Profile</Link>
                <Link to="/user/settings">Settings</Link>
                <Link to="#" onClick={handleLogout}>
                  Logout
                </Link>
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
