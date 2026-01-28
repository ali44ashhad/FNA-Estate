import React from 'react';

export const TestimonialCard = ({ name, role, text, avatar }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg mr-4">
          {avatar || name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">"{text}"</p>
      <div className="flex mt-4 text-yellow-400">
        {[...Array(5)].map((_, i) => <span key={i}>⭐</span>)}
      </div>
    </div>
  );
};
