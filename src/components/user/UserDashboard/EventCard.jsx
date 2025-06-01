import React from "react";
import { useNavigate } from "react-router-dom";
import "./EventCard.css";

function EventCard({ event }) {
  const navigate = useNavigate();

  const handleJoinContest = () => {
    navigate(`/user/event/${event._id}`);
  };
  return (
    <div className="event-card">
      <div className="event-image-container">
        <img
          src={event?.banner?.url}
          alt={event.title}
          className="event-image"
        />
        <div className="event-overlay">
          <button className="event-button" onClick={handleJoinContest}>
            Join Contest
          </button>
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
