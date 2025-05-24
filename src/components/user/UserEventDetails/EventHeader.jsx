import React from "react";
import "./EventHeader.css";

const EventHeader = ({ name, totalParticipants, totalSubmissions }) => {
  return (
    <header className="event-header">
      <h1 className="event-header-title">{name}</h1>
      <div className="event-header-stats">
        <div className="event-header-stat">
          <span className="event-header-stat-value">{totalParticipants}</span>
          <span className="event-header-stat-label">Participants</span>
        </div>
        <div className="event-header-stat">
          <span className="event-header-stat-value">{totalSubmissions}</span>
          <span className="event-header-stat-label">Submissions</span>
        </div>
      </div>
    </header>
  );
};

export default EventHeader;
