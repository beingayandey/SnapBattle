import React from "react";
import "./UploadRules.css";

function UploadRules({ event, userSubmissionCount }) {
  return (
    <div className="upload-rules">
      <h2>Upload Rules for {event.name}</h2>
      <ul>
        <li>Maximum submissions allowed: {event.maxUploads}</li>
        <li>
          You have uploaded: {userSubmissionCount} photo
          {userSubmissionCount !== 1 ? "s" : ""}
        </li>
        <li>Maximum file size: 5MB</li>
        <li>Allowed formats: JPG, PNG</li>
      </ul>
    </div>
  );
}

export default UploadRules;
