import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./HeroSection.css";

const HeroSection = () => {
  const headingRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(ctaRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 ref={headingRef}>Discover Amazing Events</h1>
        <p>Join our community to explore and share unforgettable moments.</p>
        <a href="/signup" ref={ctaRef} className="cta-button">
          Sign Up Now
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
