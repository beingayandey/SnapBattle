import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ImageGallery.css";

gsap.registerPlugin(ScrollTrigger);

const images = Array.from(
  { length: 6 },
  (_, i) => `https://picsum.photos/400/300?random=${i + 1}`
);

const ImageGallery = () => {
  const galleryRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    imagesRef.current.forEach((img, index) => {
      gsap.fromTo(
        img,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    });
  }, []);

  return (
    <section className="image-gallery">
      <h2>Community Gallery</h2>
      <div className="gallery-container" ref={galleryRef}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery image ${index + 1}`}
            className="gallery-image"
            ref={(el) => (imagesRef.current[index] = el)}
          />
        ))}
      </div>
    </section>
  );
};

export default ImageGallery;
