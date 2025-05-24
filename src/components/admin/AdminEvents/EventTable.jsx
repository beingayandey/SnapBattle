import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import EventRow from "./EventRow";
import ReactPaginate from "react-paginate";
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
  limit,
  onLimitChange,
  onDeleteEvents, // New prop for handling deletion
}) => {
  const statusOptions = ["All", "Active", "Ended", "Voting"];
  const limitOptions = [10, 20, 30];
  const [goToPageValue, setGoToPageValue] = useState(currentPage);
  const [selectedEventIds, setSelectedEventIds] = useState([]);

  const handleGoToPage = () => {
    const page = Number(goToPageValue);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Handle individual row selection
  const handleRowSelect = (eventId) => {
    setSelectedEventIds((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedEventIds.length === events.length) {
      setSelectedEventIds([]);
    } else {
      setSelectedEventIds(events.map((event) => event.id));
    }
  };

  // Handle delete selected
  const handleDeleteSelected = () => {
    onDeleteEvents(selectedEventIds);
    setSelectedEventIds([]);
  };

  return (
    <div className="event-table-container relative">
      <div className="table-controls">
        <div className="flex items-center gap-4">
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
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="limit-filter"
          >
            {limitOptions.map((limitOption) => (
              <option key={limitOption} value={limitOption}>
                {limitOption} per page
              </option>
            ))}
          </select>
          {selectedEventIds.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="action-button delete-button"
            >
              {selectedEventIds.length === events.length && events.length > 1
                ? "Delete All"
                : `Delete (${selectedEventIds.length})`}
            </button>
          )}
        </div>
        <div className="create-event-button">
          <Link to="/admin/create-event" className="action-button">
            <FaPlus className="inline mr-2" /> Create Event
          </Link>
        </div>
      </div>

      <div className="event-table-wrapper">
        <table className="event-table">
          <thead>
            <tr>
              <th className="checkbox-column">
                <input
                  type="checkbox"
                  checked={
                    events.length > 0 &&
                    selectedEventIds.length === events.length
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th onClick={() => onSort("name")} className="cursor-pointer">
                Event Name
              </th>
              <th
                onClick={() => onSort("startDate")}
                className="cursor-pointer"
              >
                Start Date
              </th>
              <th onClick={() => onSort("endDate")} className="cursor-pointer">
                End Date
              </th>
              <th
                onClick={() => onSort("submissionCount")}
                className="cursor-pointer"
              >
                Submissions
              </th>
              <th
                onClick={() => onSort("visibility")}
                className="cursor-pointer"
              >
                Visibility
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <EventRow
                  key={event.id}
                  event={event}
                  isPublic={event.visibility === "Public"}
                  isSelected={selectedEventIds.includes(event.id)}
                  onSelect={() => handleRowSelect(event.id)}
                />
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={totalPages}
          onPageChange={({ selected }) => onPageChange(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination-button"}
          nextLinkClassName={"pagination-button"}
          disabledClassName={"pagination-button-disabled"}
          activeClassName={"pagination-button-active"}
          pageClassName={"pagination-page"}
          breakLabel={"..."}
          breakClassName={"pagination-break"}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
        />
        <div className="go-to-page">
          <input
            type="number"
            min="1"
            max={totalPages}
            value={goToPageValue}
            onChange={(e) => setGoToPageValue(e.target.value)}
            className="go-to-page-input"
            placeholder="Go to page"
          />
          <button onClick={handleGoToPage} className="go-to-page-button">
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventTable;
