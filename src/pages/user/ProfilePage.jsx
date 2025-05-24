import React, { useState } from "react";
import UserInfoForm from "../../components/user/UserProfile/UserInfoForm";
import PasswordChangeForm from "../../components/user/UserProfile/PasswordChangeForm";
import PhoneVerifyForm from "../../components/user/UserProfile/PhoneVerifyForm";
import LogoutButton from "../../components/user/UserProfile/LogoutButton";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    isPhoneVerified: false,
  });

  const handleUserUpdate = (updatedUser) => {
    setUser({ ...user, ...updatedUser });
  };

  const handlePhoneVerify = () => {
    setUser({ ...user, isPhoneVerified: true });
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1 className="profile-title">User Profile</h1>
        <div className="profile-actions">
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
