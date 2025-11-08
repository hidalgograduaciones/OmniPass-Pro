
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-omni-gray-dark border border-omni-gray rounded-lg p-6 shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
