import React from "react";
import { FiX } from "react-icons/fi";
import "./PhoneVerificationModal.css";

const PhoneVerificationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          <FiX size={20} />
        </button>
        <h2 className="modal-title">Phone Number Not Verified</h2>
        <p className="modal-message">
          Your phone number is not verified yet. You cannot use many features
          until you verify your phone number.
        </p>
        <button className="modal-confirm-button" onClick={onConfirm}>
          OK
        </button>
      </div>
    </div>
  );
};

export default PhoneVerificationModal;
