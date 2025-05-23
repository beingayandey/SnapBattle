import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import EventRow from "./EventRow";
import "./EventTable.css";

const EventTable = ({
  events,
  sortConfig,
  onSort,
  filterStatus,
  onFilter,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const statusOptions = ["All", "Active", "Ended", "Voting"];

  return (
    <div className="event-table-container">
      <div className="table-controls">
        <select
          value={filterStatus}
          onChange={(e) => onFilter(e.target.value)}
          className="status-filter"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <div className="create-event-button action-button">
          <Link to={"/admin/create-event"}>
            <FaPlus /> Create Event
          </Link>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="event-table">
          <thead>
            <tr>
              <th onClick={() => onSort("name")}>
                Event Name
                {sortConfig.key === "name" && (
                  <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
                )}
              </th>
              <th onClick={() => onSort("startDate")}>
                Start Date
                {sortConfig.key === "startDate" && (
                  <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
                )}
              </th>
              <th onClick={() => onSort("endDate")}>
                End Date
                {sortConfig.key === "endDate" && (
                  <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
                )}
              </th>
              <th onClick={() => onSort("submissionCount")}>
                Submissions
                {sortConfig.key === "submissionCount" && (
                  <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
                )}
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventTable;
