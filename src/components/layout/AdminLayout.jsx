import { Outlet, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Sidebar from "../admin/Sidebar";
import Header from "../admin/Header";
import Footer from "../admin/Footer";
import "./AdminLayout.css";
import DashboardOverLays from "../admin/DashboardOverlays/DashboardOverLays";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [showOverlay, setShowOverlay] = useState(
    localStorage.getItem("justLoggedIn") === "true"
  );
  const [timer, setTimer] = useState(7); // Start at 7 seconds

  useEffect(() => {
    if (localStorage.getItem("justLoggedIn") === "true") {
      setTimer(7); // Initialize timer
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowOverlay(false);
            localStorage.removeItem("justLoggedIn"); // Clear login flag
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Update every second

      return () => clearInterval(interval);
    }
  }, []);

  const forceTimerToZero = () => {
    setTimer(0);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    console.log("Logging out from AdminLayout...");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("justLoggedIn");
    localStorage.removeItem("userId");
    setIsLoggedOut(true);
  };

  if (isLoggedOut) {
    console.log("Redirecting to /login...");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-layout">
      {showOverlay && (
        <DashboardOverLays timer={timer} forceTimerToZero={forceTimerToZero} />
      )}

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className="main-content"
        style={{ display: showOverlay ? "none" : "block" }}
      >
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
