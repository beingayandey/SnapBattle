import React from "react";
import "./SubmissionSummary.css";

// Mock data (replace with real data)
const stats = {
  totalSubmissions: 15,
  pending: 3,
  approved: 10,
  rejected: 2,
};

function SubmissionSummary() {
  return (
    <div className="submission-summary">
      <h2 className="summary-title">Your Submission Stats</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3 className="stat-value">{stats.totalSubmissions}</h3>
          <p className="stat-label">Total Submissions</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-value">{stats.pending}</h3>
          <p className="stat-label">Pending</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-value">{stats.approved}</h3>
          <p className="stat-label">Approved</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-value">{stats.rejected}</h3>
          <p className="stat-label">Rejected</p>
        </div>
      </div>
    </div>
  );
}

export default SubmissionSummary;
