import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import Sidebar from "../admin/Sidebar";
import Header from "../admin/Header";
import Footer from "../admin/Footer"; // optional
import "./AdminLayout.css";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="admin-layout">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} />
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
