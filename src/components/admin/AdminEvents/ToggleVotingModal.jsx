import React from "react";
import "./ToggleVotingModal.css";

const ToggleVotingModal = ({ isOpen, onClose, onConfirm, isVoting }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isVoting ? "Stop Voting" : "Start Voting"}</h2>
        <p>
          Are you sure you want to {isVoting ? "stop" : "start"} voting for this
          event?
        </p>
        <div className="modal-actions">
          <button onClick={onClose} className="modal-btn cancel-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="modal-btn confirm-btn">
            {isVoting ? "Stop Voting" : "Start Voting"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleVotingModal;
