import React from "react";
import "./SubmissionStatusTag.css";

const SubmissionStatusTag = ({ status }) => {
  return (
    <span className={`submission-status-tag submission-status-tag--${status}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default SubmissionStatusTag;
