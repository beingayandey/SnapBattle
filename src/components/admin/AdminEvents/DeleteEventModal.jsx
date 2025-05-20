import React from "react";
import "./DeleteEventModal.css";

const DeleteEventModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete this event? This action cannot be
          undone.
        </p>
        <div className="modal-actions">
          <button onClick={onClose} className="modal-btn cancel-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="modal-btn confirm-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventModal;
