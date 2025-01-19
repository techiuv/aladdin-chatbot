import React from "react";

const AuthHeading = ({ heading }) => {
  return (
    <h2 className="md:text-[3rem] text-[2rem]  capitalize font-bold text-white text-center mb-4">
      {heading}
    </h2>
  );
};

export default AuthHeading;
