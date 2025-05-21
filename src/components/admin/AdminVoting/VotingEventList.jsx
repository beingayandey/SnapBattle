import React from "react";
import "./VotingEventList.css";

function VotingEventList({ events, selectedEvent, onEventSelect }) {
  return (
    <div className="voting-event-list">
      <h2 className="event-list-title">Events</h2>
      <ul>
        {events.map((event) => (
          <li
            key={event.id}
            className={`event-item ${
              selectedEvent === event.id ? "active" : ""
            }`}
            onClick={() => onEventSelect(event.id)}
          >
            {event.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VotingEventList;
