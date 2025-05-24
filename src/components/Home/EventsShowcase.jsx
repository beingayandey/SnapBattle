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
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });
  }, []);

  return (
    <section className="events-showcase">
      <h2>Ongoing Events</h2>
      <div className="events-grid">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="event-card"
            ref={(el) => (cardsRef.current[index] = el)}
          >
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
