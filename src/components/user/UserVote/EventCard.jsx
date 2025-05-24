import React from "react";
import { useNavigate } from "react-router-dom";
import "./EventCard.css";

const EventCard = ({ event, submissions }) => {
  const navigate = useNavigate();
  const previewSubmissions = submissions.slice(0, 3); // Limit to 3 images for preview

  const handleCardClick = () => {
    navigate(`/user/vote/${event.id}`);
  };

  return (
    <div className="event-card" onClick={handleCardClick}>
      <h3 className="event-card-title">{event.name}</h3>
      <div className="event-card-images">
        {previewSubmissions.map((submission) => (
          <img
            key={submission.id}
            src={submission.imageUrl}
            alt={submission.title}
            className="event-card-image"
          />
        ))}
      </div>
    </div>
  );
};

export default EventCard;
