import React from "react";
import "./ExportVotingData.css";

function ExportVotingData({ onExport }) {
  return (
    <div className="export-voting-data">
      <button className="export-button" onClick={onExport}>
        Export Voting Data
      </button>
    </div>
  );
}

export default ExportVotingData;
