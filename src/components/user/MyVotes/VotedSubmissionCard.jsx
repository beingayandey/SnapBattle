import React from "react";
import "./VotedSubmissionCard.css";

const VotedSubmissionCard = ({ thumbnail, title, voteCount, voteDate }) => {
  return (
    <div className="voted-submission-card">
      <img src={thumbnail} alt={title || "Submission"} className="thumbnail" />
      <div className="card-content">
        {title && <h3 className="submission-title">{title}</h3>}
        <p className="vote-count">Votes: {voteCount}</p>
        <p className="vote-date">
          Voted on: {new Date(voteDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default VotedSubmissionCard;
