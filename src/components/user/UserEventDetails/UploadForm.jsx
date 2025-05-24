import React, { useState, useRef } from "react";
import "./UploadForm.css";

const UploadForm = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const maxFiles = 3;
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  const acceptedTypes = ["image/jpeg", "image/png"];

  const validateFiles = (newFiles) => {
    if (files.length + newFiles.length > maxFiles) {
      return `Cannot upload more than ${maxFiles} images.`;
    }

    for (let file of newFiles) {
      if (!acceptedTypes.includes(file.type)) {
        return "Only JPG and PNG files are allowed.";
      }
      if (file.size > maxSize) {
        return "Each file must be under 5MB.";
      }
    }
    return "";
  };

  const handleFiles = (newFiles) => {
    const validationError = validateFiles(newFiles);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setFiles([...files, ...Array.from(newFiles)]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleChange = (e) => {
    const selectedFiles = e.target.files;
    handleFiles(selectedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setError("Please select at least one file.");
      return;
    }
    // Simulate upload
    console.log("Uploading files:", files);
    setFiles([]);
    setError("");
    alert("Files uploaded successfully!");
  };

  return (
    <div className="upload-form-container">
      <div
        className="upload-form-drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current.click()}
      >
        <p className="upload-form-drop-text">
          Drag & drop images here or click to select
        </p>
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png"
          ref={fileInputRef}
          className="upload-form-file-input"
          onChange={handleChange}
        />
      </div>
      {error && <p className="upload-form-error">{error}</p>}
      {files.length > 0 && (
        <ul className="upload-form-file-list">
          {files.map((file, index) => (
            <li key={index} className="upload-form-file-item">
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={handleSubmit}
        className="upload-form-submit-button"
        disabled={files.length === 0}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadForm;
