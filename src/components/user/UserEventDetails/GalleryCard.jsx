import React from "react";
import "./GalleryCard.css";

const GalleryCard = ({ url, alt }) => {
  return (
    <div className="gallery-card">
      <img src={url} alt={alt} className="gallery-card-image" />
    </div>
  );
};

export default GalleryCard;
