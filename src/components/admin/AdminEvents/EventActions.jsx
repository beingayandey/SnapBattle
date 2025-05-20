import React, { useState } from "react";
import axios from "axios";
import DeleteEventModal from "./DeleteEventModal";
import ToggleVotingModal from "./ToggleVotingModal";
import "./EventActions.css";

const EventActions = ({ eventId, status, onView, onEdit }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isToggleVotingModalOpen, setToggleVotingModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/events/${eventId}`);
      window.location.reload(); // Refresh to update event list
    } catch (err) {
      console.error("Failed to delete event", err);
    }
  };

  const handleToggleVoting = async () => {
    try {
      await axios.patch(`/api/events/${eventId}`, {
        status: status === "Voting" ? "Active" : "Voting",
      });
      window.location.reload();
    } catch (err) {
      console.error("Failed to toggle voting", err);
    }
  };

  return (
    <div className="event-actions">
      <button onClick={onView} className="action-btn view-btn">
        View
      </button>
      <button onClick={onEdit} className="action-btn edit-btn">
        Edit
      </button>
      <button
        onClick={() => setDeleteModalOpen(true)}
        className="action-btn delete-btn"
      >
        Delete
      </button>
      <button
        onClick={() => setToggleVotingModalOpen(true)}
        className="action-btn toggle-voting-btn"
      >
        {status === "Voting" ? "Stop Voting" : "Start Voting"}
      </button>
      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
      <ToggleVotingModal
        isOpen={isToggleVotingModalOpen}
        onClose={() => setToggleVotingModalOpen(false)}
        onConfirm={handleToggleVoting}
        isVoting={status === "Voting"}
      />
    </div>
  );
};

export default EventActions;
