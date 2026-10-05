import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`mb-16 ${className}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300"
      >
        {title}
        <span className="text-rose-500 dark:text-orange-500 transition-colors duration-300">.</span>
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 dark:text-neutral-400 text-lg max-w-2xl transition-colors duration-300"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
