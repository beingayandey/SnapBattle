import React from "react";
import { NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import PropTypes from "prop-types";
import "./Sidebar.css";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaImages,
  FaVoteYea,
  FaChartBar,
  FaUsers,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { name: "Events", icon: <FaCalendarAlt />, path: "/admin/events" },
    { name: "Submissions", icon: <FaImages />, path: "/admin/submissions" },
    { name: "Voting", icon: <FaVoteYea />, path: "/admin/voting" },
    { name: "Stats", icon: <FaChartBar />, path: "/admin/stats" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
  ];

  return (
    <>
      <aside className={`admin-sidebar ${isOpen ? "expanded" : ""}`}>
        <div className="sidebar-header">
          <button
            className="toggle-btn"
            onClick={toggleSidebar}
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  end // Use for exact matching
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  data-tooltip-id={`tooltip-${item.name}`}
                  data-tooltip-content={item.name}
                  data-tooltip-place="right"
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.name}</span>
                </NavLink>
                {!isOpen && (
                  <Tooltip
                    id={`tooltip-${item.name}`}
                    className="custom-tooltip"
                    opacity={1}
                    style={{
                      backgroundColor: "var(--dropdown-bg)",
                      color: "var(--text-main)",
                      borderRadius: "4px",
                      padding: "0.5rem 1rem",
                      boxShadow: "var(--dropdown-shadow)",
                      zIndex: 1000,
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default React.memo(Sidebar);
