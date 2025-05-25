import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section" data-speed="0.8">
      <div className="hero-content">
        <h1>Discover Amazing Events</h1>
        <p>Join our community to explore and share unforgettable moments.</p>
        <a href="/signup" className="cta-button">
          Sign Up Now
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
