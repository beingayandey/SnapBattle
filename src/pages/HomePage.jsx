import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "../components/Home/HeroSection";
import EventsShowcase from "../components/Home/EventsShowcase";
import ImageGallery from "../components/Home/ImageGallery";
import CallToAction from "../components/Home/CallToAction";
import "./HomePage.css";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  useEffect(() => {
    // Fade in page
    gsap.to("body", { opacity: 1, duration: 0.5 });

    // Refresh ScrollTrigger on resize and orientation change
    const refreshScroll = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", refreshScroll);
    window.addEventListener("orientationchange", refreshScroll);

    // Initial refresh after a short delay to ensure DOM is fully loaded
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      window.removeEventListener("resize", refreshScroll);
      window.removeEventListener("orientationchange", refreshScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="homepage">
      <HeroSection />
      <ImageGallery />
      <EventsShowcase />
      <CallToAction />
    </div>
  );
};

export default HomePage;
