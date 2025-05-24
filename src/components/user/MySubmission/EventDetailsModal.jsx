import React from "react";
import "./EventDetailsModal.css";

const EventDetailsModal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  const { eventName, submission } = event;

  return (
    <div className="event-details-modal__overlay">
      <div className="event-details-modal">
        <h2 className="event-details-modal__title">{eventName}</h2>
        <div className="event-details-modal__content">
          <h3>Submission Details</h3>
          <p>
            Submitted on:{" "}
            {new Date(submission.submissionDate).toLocaleDateString()}
          </p>
          <p>Status: {submission.status}</p>
          <h3>Images</h3>
          <div className="event-details-modal__image-grid">
            {submission.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Submission image ${index + 1}`}
                className="event-details-modal__image"
              />
            ))}
          </div>
        </div>
        <button
          className="event-details-modal__close"
          onClick={onClose}
          aria-label="Close event details"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventDetailsModal;
