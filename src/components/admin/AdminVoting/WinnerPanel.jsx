import React from "react";
import "./WinnerPanel.css";

function WinnerPanel({ submissions, onSelectWinner }) {
  const topSubmission = submissions.reduce(
    (prev, curr) => (prev.votes > curr.votes ? prev : curr),
    submissions[0]
  );

  return (
    <div className="winner-panel">
      <h2>Top Submission</h2>
      {topSubmission && (
        <div className="winner-content">
          <img src={topSubmission.image} alt={topSubmission.title} />
          <h3>{topSubmission.title}</h3>
          <p>Votes: {topSubmission.votes}</p>
          <button
            className="select-winner-button"
            onClick={() => onSelectWinner(topSubmission.id)}
          >
            Select as Winner
          </button>
        </div>
      )}
    </div>
  );
}

export default WinnerPanel;
