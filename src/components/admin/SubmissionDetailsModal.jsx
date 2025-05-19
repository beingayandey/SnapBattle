import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useMediaQuery } from "react-responsive";
import { useToast } from "../toast/ToastNotification"; // Assumed custom hook for toasts
import Fancybox from "../common/Fancybox"; // Import the Fancybox wrapper
import "./SubmissionDetailsModal.css";

const SubmissionDetailsModal = ({ submission, onClose }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { showSuccess, showError, showInfo } = useToast();

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [status, setStatus] = useState(submission?.status || "Pending");

  // Placeholder admin action handlers
  const handleApprove = () => {
    setStatus("Approved");
    showSuccess({
      message: "Submission approved successfully!",
      type: "success",
    });
  };

  const handleReject = () => {
    setStatus("Rejected");
    showError({
      message: "Submission rejected successfully!",
      type: "error",
    });
  };

  const handleDelete = () => {
    setIsDeleteConfirmOpen(false);
    showInfo({
      message: "Submission deleted successfully!",
      type: "info",
    });
    onClose(); // Close modal after deletion
  };

  if (!submission) return null;

  return (
    <>
      <Dialog.Root open={true} onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            className={`dialog-content ${isMobile ? "mobile" : ""}`}
          >
            <Dialog.Title className="dialog-title">
              Submission Details
            </Dialog.Title>
            <Dialog.Close className="dialog-close">✕</Dialog.Close>

            <div className="submission-details">
              <Fancybox
                options={{
                  Toolbar: {
                    display: {
                      left: ["zoomIn", "zoomOut"],
                      right: ["close"],
                    },
                  },
                }}
              >
                <a
                  href={submission.image}
                  data-fancybox="submission"
                  data-caption={submission.caption || "Submission Image"}
                >
                  <img
                    src={submission.image}
                    alt="Submission"
                    className="submission-image"
                  />
                </a>
              </Fancybox>
              <div className="submission-info">
                <div className="info-row">
                  <span className="info-label">User:</span>
                  <span>{submission.user || submission.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Submission Date:</span>
                  <span>
                    {new Date(submission.date).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Event Name:</span>
                  <span>{submission.eventName || "N/A"}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Caption:</span>
                  <span>{submission.caption || "No caption provided"}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Status:</span>
                  <span className={`status status-${status.toLowerCase()}`}>
                    {status}
                  </span>
                </div>
              </div>
              <div className="admin-actions">
                <button
                  onClick={handleApprove}
                  className="action-button approve"
                  disabled={status === "Approved"}
                >
                  ✅ Approve
                </button>
                <button
                  onClick={handleReject}
                  className="action-button reject"
                  disabled={status === "Rejected"}
                >
                  ❌ Reject
                </button>
                <button
                  onClick={() => setIsDeleteConfirmOpen(true)}
                  className="action-button delete"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Delete Confirmation Modal */}
      <Dialog.Root
        open={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content confirm-dialog">
            <Dialog.Title className="dialog-title">
              Confirm Deletion
            </Dialog.Title>
            <Dialog.Description className="dialog-description">
              Are you sure you want to delete this submission? This action
              cannot be undone.
            </Dialog.Description>
            <div className="confirm-actions">
              <Dialog.Close asChild>
                <button className="action-button cancel">Cancel</button>
              </Dialog.Close>
              <button onClick={handleDelete} className="action-button delete">
                Delete
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default SubmissionDetailsModal;
