import React, { useState } from "react";
import MySubmissionCard from "./MySubmissionCard";
import EventDetailsModal from "./EventDetailsModal";
import "./EventSubmissionGroup.css";

const EventSubmissionGroup = ({ event, onDelete }) => {
  const { eventName, submission, eventId } = event;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGroupClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className="event-submission-group"
        onClick={handleGroupClick}
        style={{ cursor: "pointer" }}
      >
        <h2 className="event-submission-group__title">{eventName}</h2>
        <div className="event-submission-group__grid">
          <MySubmissionCard
            submission={submission}
            eventId={eventId}
            eventName={eventName}
            onDelete={onDelete}
          />
        </div>
      </div>
      <EventDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={event}
      />
    </>
  );
};

export default EventSubmissionGroup;
