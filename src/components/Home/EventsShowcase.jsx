import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./EventsShowcase.css";

const events = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  title: `Event ${i + 1}`,
  date: `June ${i + 10}`,
  image: `https://picsum.photos/300/200?random=${i + 1}`,
}));

const EventsShowcase = () => {
  return (
    <section className="events-showcase">
      <h2>Ongoing Events</h2>
      <div className="events-grid">
        {events.map((event, index) => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.title} />
            <h3>{event.title}</h3>
            <p>{event.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsShowcase;
