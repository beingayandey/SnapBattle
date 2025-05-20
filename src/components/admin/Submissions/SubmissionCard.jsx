import React from "react";
import dayjs from "dayjs";
import "./SubmissionCard.css";

function SubmissionCard({ submission }) {
  return (
    <div className="submission-card">
      <img
        src={submission.image}
        alt="Submission"
        className="submission-image"
      />
      <div className="submission-details">
        <div className="user-info">
          <img
            src={submission.user.avatar}
            alt={submission.user.name}
            className="user-avatar"
          />
          <span className="user-name">{submission.user.name}</span>
        </div>
        <p className="submitted-at">
          Submitted:{" "}
          {dayjs(submission.submittedAt).format("MMM D, YYYY h:mm A")}
        </p>
        <div className="likes">
          <span className="heart-icon">❤️</span>
          <span>{submission.likes} Likes</span>
        </div>
      </div>
    </div>
  );
}

export default SubmissionCard;
