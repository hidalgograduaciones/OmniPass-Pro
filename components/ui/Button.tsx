
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  Icon?: React.FC<{className?: string}>;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', Icon, ...props }) => {
  const baseClasses = 'px-6 py-2.5 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-omni-black';
  
  const variantClasses = {
    primary: 'bg-omni-blue text-omni-black hover:bg-opacity-80 shadow-glow-blue focus:ring-omni-blue',
    secondary: 'bg-omni-gold text-omni-black hover:bg-opacity-80 shadow-glow-gold focus:ring-omni-gold',
    ghost: 'bg-transparent border border-omni-gray-light text-gray-300 hover:bg-omni-gray-light hover:text-white',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {Icon && <Icon className="w-5 h-5" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
