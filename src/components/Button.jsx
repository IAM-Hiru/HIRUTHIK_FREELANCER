import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-rose-500 text-white hover:shadow-[0_10px_20px_rgba(79,70,229,0.2)] hover:scale-105 dark:from-red-500 dark:via-orange-500 dark:to-yellow-500 dark:hover:shadow-[0_10px_20px_rgba(249,115,22,0.3)]",
    secondary: "bg-white border border-slate-200 text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-orange-500/50 dark:hover:text-orange-400 dark:hover:bg-neutral-900",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-orange-500 dark:text-orange-500 dark:hover:bg-orange-500/10",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
