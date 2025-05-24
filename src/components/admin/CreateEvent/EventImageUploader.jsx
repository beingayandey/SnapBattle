import React, { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import imageCompression from "browser-image-compression";
import "./EventImageUploader.css";

const EventImageUploader = ({ image, onImageChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropping, setCropping] = useState(false);

  const fileInputRef = useRef(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && ["image/jpeg", "image/png"].includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
      setCropping(true);
    }
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
      setCropping(true);
    }
  };

  const getCroppedImage = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) {
      console.error("Missing imageSrc or croppedAreaPixels");
      return;
    }

    try {
      const image = new Image();
      image.src = imageSrc;
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!croppedAreaPixels.width || !croppedAreaPixels.height) {
        console.error("Invalid cropped area dimensions");
        return;
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x * scaleX,
        croppedAreaPixels.y * scaleY,
        croppedAreaPixels.width * scaleX,
        croppedAreaPixels.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      return new Promise((resolve, reject) => {
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              console.error("Failed to create blob");
              reject(new Error("Failed to create blob"));
              return;
            }

            const file = new File([blob], "cropped.jpg", {
              type: "image/jpeg",
            });

            const options = {
              maxSizeMB: 0.2, // Target 200KB
              maxWidthOrHeight: 800, // Reduced resolution to help meet size limit
              useWebWorker: true,
              initialQuality: 0.9, // Start with high quality
            };

            try {
              const compressedFile = await imageCompression(file, options);
              if (compressedFile.size <= 200 * 1024) {
                onImageChange(compressedFile);
              } else {
                alert(
                  "Image is still too large after compression. Please try a smaller or less detailed image."
                );
                reject(new Error("Compressed image exceeds 200KB"));
              }
              resolve();
            } catch (err) {
              console.error("Compression error:", err);
              alert("Failed to compress image. Please try again.");
              reject(err);
            }
          },
          "image/jpeg",
          0.9 // Initial canvas quality
        );
      });
    } catch (err) {
      console.error("Error in getCroppedImage:", err);
      alert("Error processing image. Please try again.");
    }
  }, [imageSrc, croppedAreaPixels, onImageChange]);

  const handleCropDone = async (e) => {
    e.preventDefault();
    await getCroppedImage();
    setImageSrc(null);
    setCropping(false);
  };

  const handleRemove = () => {
    onImageChange(null);
    fileInputRef.current.value = "";
  };

  const handleUploadZoneClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const handleFileInputClick = (e) => {
    e.stopPropagation();
  };

  const handleZoomChange = (e) => {
    setZoom(parseFloat(e.target.value));
  };

  return (
    <div className="event-image-uploader card">
      <h2 className="card-title">Event Cover Image</h2>

      {cropping && imageSrc ? (
        <div className="cropper-container">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3} // Maintain rectangular aspect ratio
            restrictPosition={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="rect"
            showGrid={true}
          />
          <div className="zoom-slider-container">
            <label htmlFor="zoom-slider" className="zoom-label">
              Zoom: {zoom.toFixed(1)}x
            </label>
            <input
              id="zoom-slider"
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={handleZoomChange}
              className="zoom-slider"
            />
          </div>
          <button
            type="button"
            className="crop-button"
            onClick={handleCropDone}
          >
            Done
          </button>
        </div>
      ) : (
        <div
          className={`upload-zone ${dragActive ? "drag-active" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleUploadZoneClick}
        >
          {image ? (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(image)}
                alt="Event cover preview"
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
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <p>Drag & drop or click to upload cover image</p>
              <p className="supported-formats">JPG, PNG, JPEG (Max 200KB)</p>
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleChange}
                onClick={handleFileInputClick}
                ref={fileInputRef}
                className="file-input"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventImageUploader;
