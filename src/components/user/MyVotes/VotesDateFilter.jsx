import React, { useState } from "react";
import "./VotesDateFilter.css";

const VotesDateFilter = ({ onApplyFilter, onClearFilter }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleApply = () => {
    if (fromDate && toDate) {
      onApplyFilter(fromDate, toDate);
    }
  };

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    onClearFilter();
  };

  return (
    <div className="votes-date-filter">
      <div className="date-inputs">
        <div className="date-field">
          <label htmlFor="from-date">From Date</label>
          <input
            type="date"
            id="from-date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="date-field">
          <label htmlFor="to-date">To Date</label>
          <input
            type="date"
            id="to-date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>
      <div className="filter-buttons">
        <button
          className="apply-btn"
          onClick={handleApply}
          disabled={!fromDate || !toDate}
        >
          Apply Filter
        </button>
        <button className="clear-btn" onClick={handleClear}>
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default VotesDateFilter;
