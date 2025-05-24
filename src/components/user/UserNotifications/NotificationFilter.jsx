import React from "react";
import "./NotificationFilter.css";

function NotificationFilter({ onFilterChange, onSortChange }) {
  return (
    <div className="notification-filter">
      <div className="filter-group">
        <label htmlFor="typeFilter" className="filter-label">
          Filter by Type:
        </label>
        <select
          id="typeFilter"
          className="filter-select"
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="alert">Alert</option>
          <option value="result">Result</option>
          <option value="info">Info</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="sortFilter" className="filter-label">
          Sort by Date:
        </label>
        <select
          id="sortFilter"
          className="filter-select"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
    </div>
  );
}

export default NotificationFilter;
