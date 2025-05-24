import React from "react";
import "./EventSelect.css";

function EventSelect({ events, onSelect }) {
  return (
    <div className="event-select">
      <label htmlFor="event-select">Select an Event</label>
      <select
        id="event-select"
        onChange={(e) => onSelect(e.target.value)}
        defaultValue=""
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
    </div>
  );
}

export default EventSelect;
