import React from 'react';

const ActionButton = ({ icon, label, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center px-4 py-2 rounded-lg text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      <span className="mr-2">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;