import React, { useState } from "react";
import "./SubmissionFilterBar.css";

const SubmissionFilterBar = ({ onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [event, setEvent] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApplyFilters = () => {
    onFilterChange({
      search,
      event,
      status,
      dateRange: { start: startDate, end: endDate },
    });
  };

  return (
    <div className="submission-filter-bar">
      <input
        type="text"
        placeholder="Search by username or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="filter-input"
      />
      <select
        value={event}
        onChange={(e) => setEvent(e.target.value)}
        className="filter-select"
      >
        <option value="">All Events</option>
        <option value="Summer Snap 2025">Summer Snap 2025</option>
        <option value="Winter Lights">Winter Lights</option>
        {/* Add more events from API */}
      </select>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="filter-select"
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="filter-input"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="filter-input"
      />
      <button onClick={handleApplyFilters} className="filter-button">
        Apply Filters
      </button>
    </div>
  );
};

export default SubmissionFilterBar;
