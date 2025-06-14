import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useDispatch } from "react-redux"; // Import useDispatch for Redux actions
import UserInfoForm from "../../components/user/UserProfile/UserInfoForm";
import PasswordChangeForm from "../../components/user/UserProfile/PasswordChangeForm";
import PhoneVerifyForm from "../../components/user/UserProfile/PhoneVerifyForm";
import LogoutButton from "../../components/user/UserProfile/LogoutButton";
import "./ProfilePage.css";
import { logOut } from "../../api/api";
import { cleanupVerification } from "../../redux/slices/verificationSlice"; // Adjust path to your action
import { toast } from "react-toastify"; // For showing success/error messages (or your preferred library)

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    isPhoneVerified: false,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Define dropdown state
  const navigate = useNavigate(); // Initialize navigate
  const dispatch = useDispatch(); // Initialize dispatch

  const handleUserUpdate = (updatedUser) => {
    setUser({ ...user, ...updatedUser });
  };

  const handlePhoneVerify = () => {
    setUser({ ...user, isPhoneVerified: true });
  };

  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent default event behavior
    e.stopPropagation(); // Prevent event bubbling to parent elements

    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("No session found. You are already logged out.");
      // Clear sessionStorage for safety
      sessionStorage.clear(); // Simplified cleanup
      dispatch(cleanupVerification());
      navigate("/login");
      setIsDropdownOpen(false);
      return;
    }

    try {
      const response = await logOut(token); // Make logout API call
      toast.success(response?.message || "Logged out successfully!");
      // Clear sessionStorage
      sessionStorage.clear();
      dispatch(cleanupVerification());
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Logout failed. Please try again.");
      console.error("Logout error:", err);
      // Clear sessionStorage even on failure
      sessionStorage.clear();
      dispatch(cleanupVerification());
      navigate("/login");
    } finally {
      setIsDropdownOpen(false); // Close dropdown
    }
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1 className="profile-title">User Profile</h1>
        <div className="profile-actions" onClick={handleLogout}>
          {/* Pass handleLogout directly to LogoutButton */}
          <LogoutButton />
        </div>
      </header>
      <main className="profile-content">
        <UserInfoForm user={user} onUpdate={handleUserUpdate} />
        <PhoneVerifyForm
          phone={user.phone}
          isPhoneVerified={user.isPhoneVerified}
          onVerify={handlePhoneVerify}
        />
        <PasswordChangeForm />
      </main>
    </div>
  );
};

export default ProfilePage;
