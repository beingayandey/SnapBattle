// src/components/Fancybox.js
import React, { useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function Fancybox({ children, options = {}, delegate = "[data-fancybox]" }) {
  useEffect(() => {
    NativeFancybox.bind(delegate, {
      ...options,
      // Prevent caption from showing by default (customize as needed)
      caption: (fancybox, slide) => {
        return slide.caption || "";
      },
    });

    return () => {
      NativeFancybox.destroy();
    };
  }, [delegate, options]);

  return <>{children}</>;
}

export default Fancybox;
