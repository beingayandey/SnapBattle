import React from "react";
import UploadRules from "./UploadRules";
import UploadForm from "./UploadForm";
import "./UploadSection.css";

const UploadSection = () => {
  return (
    <div className="upload-section">
      <UploadRules />
      <UploadForm />
    </div>
  );
};

export default UploadSection;
