import React from "react";
import "./EventCard.css";

function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-image-container">
        <img src={event.image} alt={event.title} className="event-image" />
        <div className="event-overlay">
          <button className="event-button">Join Contest</button>
        </div>
      </div>
      <div className="event-details">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-end-date">Ends: {event.endDate}</p>
      </div>
    </div>
  );
}

export default EventCard;
