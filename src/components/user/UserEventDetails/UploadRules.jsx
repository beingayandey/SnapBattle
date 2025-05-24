import React from "react";
import "./UploadRules.css";

const UploadRules = () => {
  return (
    <div className="upload-rules">
      <h2 className="upload-rules-title">Upload Rules</h2>
      <ul className="upload-rules-list">
        <li>Maximum of 3 images per submission.</li>
        <li>Accepted formats: JPG, PNG.</li>
        <li>Maximum file size: 5MB per image.</li>
      </ul>
    </div>
  );
};

export default UploadRules;
