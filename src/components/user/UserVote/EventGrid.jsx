import React from "react";
import EventCard from "./EventCard";
import "./EventGrid.css";

const EventGrid = ({ events, submissions }) => {
  return (
    <div className="event-grid">
      {events.length > 0 ? (
        events.map((event) => {
          const eventSubmissions =
            submissions.find((sub) => sub.eventId === event.id)?.submissions ||
            [];
          return (
            <EventCard
              key={event.id}
              event={event}
              submissions={eventSubmissions}
            />
          );
        })
      ) : (
        <p className="no-events">No active events available.</p>
      )}
    </div>
  );
};

export default EventGrid;
