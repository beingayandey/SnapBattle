import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import HeroSection from "../components/Home/HeroSection";
import EventsShowcase from "../components/Home/EventsShowcase";
import ImageGallery from "../components/Home/ImageGallery";
import CallToAction from "../components/Home/CallToAction";
import "./HomePage.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const HomePage = () => {
  useEffect(() => {
    // Initialize ScrollSmoother
    const smoother = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: false,
    });

    // Fade in page
    gsap.to("body", { opacity: 1, duration: 0.5 });

    // Refresh ScrollTrigger and ScrollSmoother on resize and orientation change
    const refreshScroll = () => {
      ScrollTrigger.refresh();
      smoother.refresh();
    };

    window.addEventListener("resize", refreshScroll);
    window.addEventListener("orientationchange", refreshScroll);

    // Initial refresh after a short delay to ensure DOM is fully loaded
    setTimeout(() => {
      ScrollTrigger.refresh();
      smoother.refresh();
    }, 100);

    return () => {
      smoother.kill();
      window.removeEventListener("resize", refreshScroll);
      window.removeEventListener("orientationchange", refreshScroll);
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="homepage">
      <div id="smooth-content">
        <HeroSection />
        <ImageGallery />
        <EventsShowcase />
        <CallToAction />
      </div>
    </div>
  );
};

export default HomePage;
