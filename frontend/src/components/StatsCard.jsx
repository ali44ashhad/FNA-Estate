import React from "react";

export const StatsCard = ({ number, label }) => {
  return (
    <div className="
      bg-white/80 backdrop-blur-md
      border border-white/30
      rounded-2xl p-8 text-center
      shadow-lg hover:shadow-2xl
      transform hover:-translate-y-2
      transition-all duration-300
    ">
      <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
        {number}
      </h3>
      <p className="text-gray-700 font-medium tracking-wide">
        {label}
      </p>
    </div>
  );
};
