import React from "react";
import "./UserFilters.css";

const UserFilters = ({ searchQuery, setSearchQuery, filters, setFilters }) => {
  return (
    <div className="user-filters">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <div className="filter-group">
        <select
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="User">User</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Banned">Banned</option>
        </select>
      </div>
    </div>
  );
};

export default UserFilters;
