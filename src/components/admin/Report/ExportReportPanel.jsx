import React from "react";
import "./ExportReportPanel.css";
import { FaFileExport } from "react-icons/fa";

const ExportReportPanel = () => {
  const handleExport = (type) => {
    alert(`Exporting ${type} report to CSV...`);
    // Implement CSV export logic here
  };

  return (
    <div className="report-box">
      <div className="report-header">
        <FaFileExport size={24} />
        <h2>Export Reports</h2>
      </div>
      <div className="export-content">
        <button
          className="export-button"
          onClick={() => handleExport("Submissions")}
        >
          Export Submissions
        </button>
        <button className="export-button" onClick={() => handleExport("Votes")}>
          Export Votes
        </button>
        <button
          className="export-button"
          onClick={() => handleExport("User Activity")}
        >
          Export User Activity
        </button>
      </div>
    </div>
  );
};

export default ExportReportPanel;
