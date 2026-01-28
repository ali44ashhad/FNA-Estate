import React from 'react';

export const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-96 gap-4">
      <div className="spinner"></div>
      <p className="text-gray-600 font-semibold animate-pulse">Loading amazing properties...</p>
    </div>
  );
};
