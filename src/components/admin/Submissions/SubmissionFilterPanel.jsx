import React from "react";
import "./SubmissionFilterPanel.css";

function SubmissionFilterPanel({ filters, setFilters, submissions }) {
  const uniqueUsers = [...new Set(submissions.map((s) => s.user.name))];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label>User</label>
        <select
          value={filters.user}
          onChange={(e) => handleFilterChange("user", e.target.value)}
        >
          <option value="">All Users</option>
          {uniqueUsers.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Date Range</label>
        <input
          type="date"
          value={filters.dateRange.start}
          onChange={(e) =>
            handleFilterChange("dateRange", {
              ...filters.dateRange,
              start: e.target.value,
            })
          }
        />
        <input
          type="date"
          value={filters.dateRange.end}
          onChange={(e) =>
            handleFilterChange("dateRange", {
              ...filters.dateRange,
              end: e.target.value,
            })
          }
        />
      </div>
      <div className="filter-group">
        <label>Likes</label>
        <input
          type="number"
          placeholder="Min"
          value={filters.likes.min}
          onChange={(e) =>
            handleFilterChange("likes", {
              ...filters.likes,
              min: e.target.value,
            })
          }
        />
        <input
          type="number"
          placeholder="Max"
          value={filters.likes.max}
          onChange={(e) =>
            handleFilterChange("likes", {
              ...filters.likes,
              max: e.target.value,
            })
          }
        />
        <label>
          <input
            type="checkbox"
            checked={filters.likes.mostLiked}
            onChange={(e) =>
              handleFilterChange("likes", {
                ...filters.likes,
                mostLiked: e.target.checked,
              })
            }
          />
          Most Liked
        </label>
      </div>
    </div>
  );
}

export default SubmissionFilterPanel;
