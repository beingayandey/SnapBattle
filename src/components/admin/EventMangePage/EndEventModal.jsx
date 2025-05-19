import React from "react";

const EndEventModal = ({ isOpen, onClose }) => {
  const handleConfirm = () => {
    // API call to end event
    alert("Event ended!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h3>End Event</h3>
        <p>
          Are you sure you want to end this event? This action cannot be undone.
        </p>
        <div className="modal__actions">
          <button className="button" onClick={handleConfirm}>
            Confirm
          </button>
          <button
            className="button"
            style={{ background: "var(--danger)" }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndEventModal;
