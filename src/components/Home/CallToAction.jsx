import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./CallToAction.css";
import { Link } from "react-router-dom";

const CallToAction = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.to(buttonRef.current, {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="cta-section">
      <h2>Join the Community</h2>
      <p>Sign up to share your events and photos with the world!</p>
      <Link href="/signup" ref={buttonRef} className="cta-button">
        Get Started
      </Link>
    </section>
  );
};

export default CallToAction;
