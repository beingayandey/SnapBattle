import React, { useState } from "react";
import SubmissionStatusTag from "./SubmissionStatusTag";
import DeleteConfirmModal from "./DeleteConfirmModal";
import "./MySubmissionCard.css";

const MySubmissionCard = ({ submission, eventId, eventName, onDelete }) => {
  const { images, submissionDate, status, id } = submission;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(eventId, id);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="submission-card">
        <div className="submission-card__image-container">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Submission ${index + 1}`}
              className="submission-card__thumbnail"
            />
          ))}
        </div>
        <div className="submission-card__content">
          <p className="submission-card__date">
            Submitted on {new Date(submissionDate).toLocaleDateString()}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <SubmissionStatusTag status={status} />
            {status === "pending" && onDelete && (
              <button
                className="submission-card__delete"
                onClick={handleDeleteClick}
                aria-label={`Delete submission for ${eventName}`}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        eventName={eventName}
      />
    </>
  );
};

export default MySubmissionCard;
