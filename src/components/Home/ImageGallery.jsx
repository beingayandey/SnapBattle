import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ImageGallery.css";

gsap.registerPlugin(ScrollTrigger);

const images = Array.from(
  { length: 120 },
  (_, i) => `https://picsum.photos/400/400?random=${i + 1}`
);

const ImageGallery = () => {
  const galleryRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const images = imagesRef.current;

    images.forEach((img, index) => {
      // Flip animation with interval break
      gsap.to(img, {
        rotationY: 360,
        duration: 2,
        repeat: -1,
        repeatDelay: 2,
        delay: index * 0.3,
        ease: "none",
        transformOrigin: "center center",
      });

      // Scroll-triggered slide-in animation
      gsap.fromTo(
        img,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
            end: "top 50%",
            scrub: 1,
            containerAnimation: ScrollTrigger.getById("smooth-content"), // Sync with ScrollSmoother
          },
        }
      );

      // Honeycomb effect: tilt top-left corner up and back down
      gsap.to(img, {
        rotationX: 20,
        duration: 1,
        ease: "power2.out",
        repeat: -1,
        repeatDelay: 9,
        delay: index * 0.2,
        yoyo: true,
        transformOrigin: "top left",
      });

      // Magnet effect
      const handleMouseMove = (e) => {
        const rect = img.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const moveX = (e.clientX - centerX) / 10;
        const moveY = (e.clientY - centerY) / 10;
        const constrainedX = Math.max(-10, Math.min(10, moveX));
        const constrainedY = Math.max(-10, Math.min(10, moveY));

        gsap.to(img, {
          x: constrainedX,
          y: constrainedY,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(img, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      img.addEventListener("mousemove", handleMouseMove);
      img.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        img.removeEventListener("mousemove", handleMouseMove);
        img.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="image-gallery" data-speed="0.9">
      <h2>Community Gallery</h2>
      <div className="gallery-container" ref={galleryRef}>
        {images.map((src, index) => (
          <div key={index} className="gallery-item">
            <img
              src={src}
              alt={`Gallery image ${index + 1}`}
              className="gallery-image"
              ref={(el) => (imagesRef.current[index] = el)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageGallery;
