import React from "react";
import { Typewriter } from "react-simple-typewriter";

const WelcomeMsg = () => (
  <div className="text-center flex justify-center items-center w-full h-full">
    <p className="capitalize text-white font-bold text-[4rem]">
      <Typewriter
        words={["How can I help you?"]}
        loop={1} // Typing effect runs only once
        typeSpeed={70}
        deleteSpeed={35}
        cursor
        cursorStyle="|"
      />
    </p>
  </div>
);

export default WelcomeMsg;
