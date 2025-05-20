import React from "react";
import "./ApproveRejectActions.css";

const ApproveRejectActions = ({ submission, onView }) => {
  const handleApprove = () => {
    console.log(`Approve submission ${submission.id}`);
    // Add API call here
  };

  const handleReject = () => {
    console.log(`Reject submission ${submission.id}`);
    // Add API call here
  };

  const handleDelete = () => {
    console.log(`Delete submission ${submission.id}`);
    // Add API call here with fade-out animation trigger
  };

  return (
    <div className="action-buttons">
      <button
        className="action-button approve"
        onClick={handleApprove}
        disabled={submission.status !== "pending"}
      >
        ✅ Approve
      </button>
      <button
        className="action-button reject"
        onClick={handleReject}
        disabled={submission.status !== "pending"}
      >
        ❌ Reject
      </button>
      <button className="action-button delete" onClick={handleDelete}>
        🗑️ Delete
      </button>
      <button className="action-button view" onClick={onView}>
        🔍 View
      </button>
    </div>
  );
};

export default ApproveRejectActions;
