import React from "react";
import UploadRules from "./UploadRules";
import UploadForm from "./UploadForm";
import "./UploadSection.css";

const UploadSection = ({ eventId }) => {
  return (
    <div className="upload-section">
      <UploadRules />
      <UploadForm eventId={eventId} />
    </div>
  );
};

export default UploadSection;
