import React from "react";
import "./EventSelector.css";

const EventSelector = ({ events, selectedEventId, onEventChange }) => {
  return (
    <select
      className="event-selector"
      value={selectedEventId || ""}
      onChange={(e) => onEventChange(Number(e.target.value))}
    >
      <option value="" disabled>
        Select an event
      </option>
      {events.map((event) => (
        <option key={event.id} value={event.id}>
          {event.name}
        </option>
      ))}
    </select>
  );
};

export default EventSelector;
