<<<<<<< HEAD
import React, { useState, useEffect } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateProgress = () => {
      if (document.readyState === "loading") {
        setProgress(50); // Page is loading
      } else if (document.readyState === "interactive") {
        setProgress(75); // Page is partially loaded
      } else if (document.readyState === "complete") {
        setProgress(100); // Page is fully loaded
        setTimeout(() => setIsVisible(false), 500); // Hide after a delay
      }
    };

    // Attach the listener and run the initial check
    document.addEventListener("readystatechange", updateProgress);
    updateProgress();

    return () => {
      document.removeEventListener("readystatechange", updateProgress);
    };
  }, []);

  if (!isVisible) return null; // Hide component completely when not visible

  return (
    <div
      className="fixed h-[1px] left-0 top-0 bg-white transition-all duration-300"
      style={{ width: `${progress}%` }}
    ></div>
  );
};

export default ProgressBar;
=======
import React, { useState, useEffect } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateProgress = () => {
      if (document.readyState === "loading") {
        setProgress(50); // Page is loading
      } else if (document.readyState === "interactive") {
        setProgress(75); // Page is partially loaded
      } else if (document.readyState === "complete") {
        setProgress(100); // Page is fully loaded
        setTimeout(() => setIsVisible(false), 500); // Hide after a delay
      }
    };

    // Attach the listener and run the initial check
    document.addEventListener("readystatechange", updateProgress);
    updateProgress();

    return () => {
      document.removeEventListener("readystatechange", updateProgress);
    };
  }, []);

  if (!isVisible) return null; // Hide component completely when not visible

  return (
    <div
      className="fixed h-[1px] left-0 top-0 bg-white transition-all duration-300"
      style={{ width: `${progress}%` }}
    ></div>
  );
};

export default ProgressBar;
>>>>>>> c9973c7f94f4d329365fbbb2db74be7bcabde679
