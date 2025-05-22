import React from "react";
import "./ExportReportPanel.css";

const ExportReportPanel = ({ onExport }) => {
  return (
    <div className="export-report-panel card">
      <h2>Export Report</h2>
      <div className="button-group">
        <button onClick={() => onExport("csv")}>Export as CSV</button>
        <button onClick={() => onExport("pdf")}>Export as PDF</button>
      </div>
    </div>
  );
};

export default ExportReportPanel;
