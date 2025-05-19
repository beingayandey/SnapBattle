import React from "react";

const SubmissionsGrid = ({ openChooseWinners, submissions = [] }) => {
  return (
    <div className="card submissions-grid">
      <div className="submissions-grid__header">
        <h3>Submissions</h3>
        <button className="button" onClick={openChooseWinners}>
          Choose Winners
        </button>
      </div>
      <div className="submissions-grid__items">
        {submissions.map((submission) => (
          <div key={submission.id} className="submissions-grid__item">
            <img
              src={submission.url}
              alt={`Submission by ${submission.user} for the event`}
            />
            <p>{submission.user}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionsGrid;
