import React, { useState } from "react";
import AlertBox from "./AlertBox";
import "./UploadForm.css";

function UploadForm({ event, userSubmissionCount, uploads, setUploads }) {
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const remainingUploads = event.maxUploads - userSubmissionCount;

    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        setError(
          `Invalid file type for ${file.name}. Only JPG and PNG are allowed.`
        );
        return false;
      }
      if (file.size > maxSize) {
        setError(`File ${file.name} exceeds 5MB limit.`);
        return false;
      }
      return true;
    });

    if (validFiles.length + userSubmissionCount > event.maxUploads) {
      setError(
        `You can only upload ${remainingUploads} more photo${
          remainingUploads !== 1 ? "s" : ""
        }.`
      );
      return;
    }

    setError("");
    setUploads(validFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uploads.length === 0) {
      setError("Please select at least one image.");
      return;
    }
    AlertBox(
      `Successfully uploaded ${uploads.length} photo${
        uploads.length !== 1 ? "s" : ""
      }!`
    );
    setUploads([]);
  };

  return (
    <div className="upload-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload">Select Images</label>
        <input
          id="file-upload"
          type="file"
          accept="image/jpeg,image/png"
          multiple
          onChange={handleFileChange}
        />
        {error && <p className="error">{error}</p>}
        {uploads.length > 0 && (
          <div className="preview-container">
            {uploads.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="preview-image"
              />
            ))}
          </div>
        )}
        <button
          type="submit"
          disabled={!event || uploads.length === 0}
          className={!event || uploads.length === 0 ? "disabled" : ""}
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
