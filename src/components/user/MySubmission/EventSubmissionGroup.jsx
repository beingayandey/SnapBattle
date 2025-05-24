import React from "react";
import MySubmissionCard from "./MySubmissionCard";
import "./EventSubmissionGroup.css";

const EventSubmissionGroup = ({ event, onDelete }) => {
  const { eventName, submission, eventId } = event;

  return (
    <div className="event-submission-group">
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
  );
};

export default EventSubmissionGroup;
