import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import {
  HiOutlineHome,
  HiOutlineUpload,
  HiOutlineDocumentText,
  HiOutlineThumbUp,
  HiOutlineCheckCircle,
  HiOutlineBell,
  HiOutlineUser,
  HiOutlineBookOpen,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import "./Sidebar.css";

function Sidebar({ isOpen, toggleSidebar }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      to: "/user/dashboard",
      label: "Dashboard",
      icon: <HiOutlineHome />,
      end: true,
    },
    { to: "/user/upload", label: "Upload", icon: <HiOutlineUpload /> },
    {
      to: "/user/submissions",
      label: "My Submissions",
      icon: <HiOutlineDocumentText />,
    },
    { to: "/user/vote", label: "Vote", icon: <HiOutlineThumbUp /> },
    { to: "/user/my-votes", label: "My Votes", icon: <HiOutlineCheckCircle /> },
    {
      to: "/user/notifications",
      label: "Notifications",
      icon: <HiOutlineBell />,
    },
    { to: "/user/profile", label: "Profile", icon: <HiOutlineUser /> },
    { to: "/user/rules", label: "Rules", icon: <HiOutlineBookOpen /> },
  ];

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`sidebar ${isOpen ? "open" : ""} ${
        isCollapsed ? "collapsed" : ""
      }`}
    >
      <div className="sidebar-content">
        <div className="sidebar-header">
          <button className="sidebar-close" onClick={toggleSidebar}>
            ✕
          </button>
          <button className="sidebar-collapse" onClick={handleToggleCollapse}>
            {isCollapsed ? <HiOutlineChevronRight /> : <HiOutlineChevronLeft />}
          </button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <>
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
                onClick={() => window.innerWidth <= 768 && toggleSidebar()}
                data-tooltip-id={
                  isCollapsed ? `tooltip-${item.label}` : undefined
                }
                data-tooltip-content={isCollapsed ? item.label : undefined}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </NavLink>
              {isCollapsed && (
                <Tooltip
                  id={`tooltip-${item.label}`}
                  place="right"
                  className="custom-tooltip"
                  delayShow={200}
                />
              )}
            </>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
