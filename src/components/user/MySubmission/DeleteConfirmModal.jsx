import React from "react";
import "./DeleteConfirmModal.css";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, eventName }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-confirm-modal__overlay">
      <div className="delete-confirm-modal">
        <h2 className="delete-confirm-modal__title">Are you sure?</h2>
        <p className="delete-confirm-modal__message">
          This action can’t be undone. You are about to delete your submission
          for {eventName}.
        </p>
        <div className="delete-confirm-modal__actions">
          <button className="delete-confirm-modal__cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-confirm-modal__confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
