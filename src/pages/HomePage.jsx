import React, { useEffect } from "react";
import { gsap } from "gsap";
import HeroSection from "../components/Home/HeroSection";
import EventsShowcase from "../components/Home/EventsShowcase";
import ImageGallery from "../components/Home/ImageGallery";
import CallToAction from "../components/Home/CallToAction";
import "./HomePage.css";

const HomePage = () => {
  useEffect(() => {
    gsap.to("body", { opacity: 1, duration: 0.5 }); // Fade in page
  }, []);

  return (
    <div className="homepage">
      <HeroSection />
      <EventsShowcase />
      <ImageGallery />
      <CallToAction />
    </div>
  );
};

export default HomePage;
