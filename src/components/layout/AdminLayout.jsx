import { Outlet, Navigate } from "react-router-dom";
import React, { useState } from "react";
import Sidebar from "../admin/Sidebar";
import Header from "../admin/Header";
import Footer from "../admin/Footer";
import "./AdminLayout.css";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    console.log("Logging out from AdminLayout..."); // Debug log
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedOut(true); // Trigger redirect
  };

  if (isLoggedOut) {
    console.log("Redirecting to /login..."); // Debug log
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-layout">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} onLogout={handleLogout} />
        <main>
          <div className="container">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
