import React, { useState, useRef } from "react";
import "./EventImageUploader.css";

const EventImageUploader = ({ image, onImageChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && ["image/jpeg", "image/png"].includes(file.type)) {
      onImageChange(file);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleRemove = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="event-image-uploader card">
      <h2 className="card-title">Event Image</h2>
      <div
        className={`upload-zone ${dragActive ? "drag-active" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {image ? (
          <div className="image-preview">
            <img
              src={URL.createObjectURL(image)}
              alt="Event preview"
              className="preview-image"
            />
            <button
              type="button"
              className="remove-button"
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            <svg
              className="upload-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <p>Drag & drop or click to upload</p>
            <p className="supported-formats">JPG, PNG, JPEG</p>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleChange}
              ref={fileInputRef}
              className="file-input"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventImageUploader;
