import React from 'react';

const Badge = ({ children, className = '' }) => {
  return (
    <span 
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-600 border border-indigo-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20 transition-colors duration-300 ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
