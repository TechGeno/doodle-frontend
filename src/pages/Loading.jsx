import React from 'react';

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200">
      <div className="text-center">
        <p className="text-4xl mb-4">Loading...</p>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loading;
