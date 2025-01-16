import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center bg-transparent">
      <div className="relative m-3 w-12 h-12">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className={`absolute top-0 left-1/2 transform -translate-x-1/2  h-6 rounded-full bg-gray-300 opacity-50 `}
            style={{
              transform: `rotate(${index * 30}deg) translateX(8px)`,
              animation: `fade 1.2s linear infinite`,
              animationDelay: `${index * 0.1}s`,
            }}
          ></div>
        ))}
      </div>
      <style>
        {`
          @keyframes fade {
            0%, 39%, 100% {
              opacity: 0.5;
            }
            40% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
