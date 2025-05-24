import React from "react";
import Masonry from "react-masonry-css";
import GalleryCard from "./GalleryCard";
import "./SubmissionGallery.css";

const SubmissionGallery = ({ submissions }) => {
  const breakpointColumnsObj = {
    default: 14, // Default number of columns
    1366: 10, // 3 columns for screens <= 1100px
    1280: 5, // 3 columns for screens <= 1100px
    1080: 4,
    768: 8, // 2 columns for screens <= 768px
    667: 6, // 2 columns for screens <= 768px
    575: 5, // 2 columns for screens <= 768px
    420: 3,
    320: 2, // 1 column for screens <= 320px
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="submission-gallery"
      columnClassName="submission-gallery-column"
    >
      {submissions.map((submission) => (
        <GalleryCard
          key={submission.id}
          url={submission.url}
          alt={submission.alt}
        />
      ))}
    </Masonry>
  );
};

export default SubmissionGallery;
