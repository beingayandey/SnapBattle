import React from "react";
import "./SubmissionDetailsModal.css";
import ApproveRejectActions from "./ApproveRejectActions";

const SubmissionDetailsModal = ({ submission, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="submission-details-modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <img
          src={submission.thumbnail}
          alt="Submission"
          className="modal-image"
        />
        <div className="modal-content">
          <h2>{submission.eventName}</h2>
          <p>
            <strong>User:</strong> {submission.user}
          </p>
          <p>
            <strong>Date:</strong> {submission.date}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {submission.status.charAt(0).toUpperCase() +
              submission.status.slice(1)}
          </p>
          {/* Add more metadata as needed */}
          <ApproveRejectActions submission={submission} />
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailsModal;
