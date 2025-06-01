import React, { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import "./UploadForm.css";
import { createSubmission } from "../../../api/api";
import { useToast } from "../../toast/ToastNotification";

const UploadForm = ({ eventId }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const maxFiles = 3;
  const maxSize = 200 * 1024; // 200KB in bytes
  const acceptedTypes = ["image/jpeg", "image/png"];
  const token = sessionStorage.getItem("token");
  const { showSuccess, showError } = useToast();

  const validateMimeType = async (file) => {
    try {
      const buffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(buffer.slice(0, 4));
      const signatures = {
        jpeg: [
          [0xff, 0xd8, 0xff, 0xe0],
          [0xff, 0xd8, 0xff, 0xe1],
          [0xff, 0xd8, 0xff, 0xdb],
        ],
        png: [[0x89, 0x50, 0x4e, 0x47]],
      };

      const isJpeg = signatures.jpeg.some((sig) =>
        sig.every((byte, i) => byte === uint8Array[i])
      );
      const isPng = signatures.png.some((sig) =>
        sig.every((byte, i) => byte === uint8Array[i])
      );

      return isJpeg || isPng;
    } catch (err) {
      console.error("MIME validation error:", err);
      return false;
    }
  };

  const compressFile = async (file) => {
    try {
      const options = {
        maxSizeMB: 0.2, // 200KB
        maxWidthOrHeight: 1920, // Resize to max 1920px
        useWebWorker: true,
        fileType: file.type, // Preserve original file type
      };
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (err) {
      console.error("Compression error:", err);
      return null;
    }
  };

  const validateFiles = async (newFiles) => {
    if (files.length + newFiles.length > maxFiles) {
      return `Cannot upload more than ${maxFiles} images.`;
    }

    for (let file of newFiles) {
      if (!(await validateMimeType(file))) {
        return "Invalid file format. Only JPG and PNG images are allowed.";
      }
      if (file.size > maxSize) {
        return `File ${file.name} exceeds 200KB limit.`;
      }
    }
    return "";
  };

  const handleFiles = async (newFiles) => {
    if (isUploading) return; // Prevent file handling during upload
    setError("");
    const compressedFiles = [];

    for (let file of newFiles) {
      const isValidMime = await validateMimeType(file);
      if (!isValidMime) {
        showError("Invalid file format. Only JPG and PNG images are allowed.");
        setError("Invalid file format. Only JPG and PNG images are allowed.");
        return;
      }

      let processedFile = file;
      if (file.size > maxSize) {
        processedFile = await compressFile(file);
        if (!processedFile) {
          showError(`Failed to compress ${file.name}.`);
          setError(`Failed to compress ${file.name}.`);
          return;
        }
      }
      compressedFiles.push(processedFile);
    }

    const validationError = await validateFiles(compressedFiles);
    if (validationError) {
      showError(validationError);
      setError(validationError);
      return;
    }

    setFiles([...files, ...compressedFiles]);
  };

  const doSubmission = async () => {
    setIsUploading(true);
    try {
      if (!token) {
        const errorMsg = "No authentication token found. Please log in.";
        showError(errorMsg);
        setError(errorMsg);
        return;
      }
      const data = {
        event: eventId,
        user_uploads: files,
      };
      const response = await createSubmission(data, token);
      console.log("Submission Response:", response);
      setFiles([]);
      setError("");
      showSuccess(response.message || "Files uploaded successfully!");
    } catch (err) {
      console.error("Submission Error:", err);
      console.error("Error Response:", err.response);
      const errorMsg =
        err.response?.message || err.message || "Failed to upload files.";
      showError(errorMsg);
      setError(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (isUploading) return;
    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleChange = (e) => {
    if (isUploading) return;
    const selectedFiles = e.target.files;
    handleFiles(selectedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length === 0) {
      const errorMsg = "Please select at least one file.";
      showError(errorMsg);
      setError(errorMsg);
      return;
    }
    doSubmission();
  };

  return (
    <div className="upload-form-container">
      <div
        className={`upload-form-drop-zone ${isUploading ? "uploading" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !isUploading && fileInputRef.current.click()}
      >
        {isUploading ? (
          <div className="upload-form-spinner"></div>
        ) : (
          <p className="upload-form-drop-text">
            Drag & drop images here or click to select
          </p>
        )}
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png"
          ref={fileInputRef}
          className="upload-form-file-input"
          onChange={handleChange}
          disabled={isUploading}
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
        disabled={files.length === 0 || isUploading}
      >
        {isUploading ? (
          <div className="upload-form-button-spinner"></div>
        ) : (
          "Upload"
        )}
      </button>
    </div>
  );
};

export default UploadForm;
