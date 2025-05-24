import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HeroSection.css";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const headingRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
        containerAnimation: ScrollTrigger.getById("smooth-content"),
      },
    });

    gsap.from(ctaRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
        containerAnimation: ScrollTrigger.getById("smooth-content"),
      },
    });
  }, []);

  return (
    <section className="hero-section" data-speed="0.8">
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
