import React from "react";
import "./SubmissionTable.css";
import ApproveRejectActions from "./ApproveRejectActions";

const SubmissionTable = ({
  submissions,
  onView,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="submission-table-container">
      <table className="submission-table">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Event</th>
            <th>User</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr
              key={submission.id}
              className={
                submission.status !== "pending" ? "submission-reviewed" : ""
              }
            >
              <td>
                <img
                  src={submission.thumbnail}
                  alt="Thumbnail"
                  className="submission-thumbnail"
                />
              </td>
              <td>{submission.eventName}</td>
              <td>{submission.user}</td>
              <td>{submission.date}</td>
              <td className={`status-${submission.status}`}>
                {submission.status.charAt(0).toUpperCase() +
                  submission.status.slice(1)}
              </td>
              <td>
                <ApproveRejectActions
                  submission={submission}
                  onView={() => onView(submission)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SubmissionTable;
