import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/user/Sidebar";
import Footer from "../../components/user/Footer";
import "./UserLayout.css";

function UserLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="user-layout">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="container">
        <div className="layout-content">
          <main className="mains-content">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
