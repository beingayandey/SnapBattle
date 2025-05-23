import React from "react";
import SplitText from "./SpiltText";
import BlurText from "./BlurText";
import "./DashboardOverLays.css";
import Orb from "./Orb";
import ShinyText from "./ShinyText";
const DashboardOverLays = ({ timer, forceTimerToZero }) => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const getIndianTimeOfDay = (date) => {
    const hour = date.getHours() + date.getTimezoneOffset() / 60;
    if (hour >= 3 && hour < 6) return "Morning";
    if (hour >= 6 && hour < 12) return "Afternoon";
    if (hour === 12) return "Noon";
    if (hour > 12 && hour <= 16) return "Evening";
    return "Night";
  };

  return (
    <>
      <div className="dashboard-overlays">
        <ShinyText
          text={`Redirecting you automatically in ${timer} seconds`}
          disabled={false}
          speed={3}
          className="shiny-redirecting"
        />
        <div className="shiny-button" onClick={forceTimerToZero}>
          <ShinyText
            text="Redirect"
            disabled={false}
            speed={3}
            className="shiny-btn"
          />
        </div>
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
        <SplitText
          text="Hello, Admin!"
          className="text-2xl font-semibold text-center"
          delay={150}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <BlurText
          text={` Good ${getIndianTimeOfDay(new Date())}`}
          delay={1000}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-2xl timings mb-8"
        />
      </div>
    </>
  );
};

export default DashboardOverLays;
