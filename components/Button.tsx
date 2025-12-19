import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  href,
  ...props 
}) => {
  const baseStyles = "font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer no-underline";
  
  const variants = {
    primary: "bg-neon text-black hover:bg-[#00CC6A] shadow-[0_0_15px_rgba(0,255,136,0.3)]",
    secondary: "bg-gray-800 text-white hover:bg-gray-700",
    outline: "border-2 border-gray-700 text-white hover:border-neon hover:text-neon bg-transparent"
  };

  const classes = `${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <a 
        href={href} 
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};