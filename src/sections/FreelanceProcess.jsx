import React from 'react';
import { motion } from 'framer-motion';
import { freelanceProcess } from '../data/portfolioData';
import SectionHeading from '../components/SectionHeading';

const FreelanceProcess = () => {
  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      <SectionHeading 
        title="My Freelance Process" 
        subtitle="A structured approach to delivering high-quality digital solutions."
        className="text-center"
      />

      <div className="mt-16 relative">
        {/* Vertical Timeline Line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-200 via-rose-200 to-transparent dark:from-red-500 dark:via-orange-500 dark:to-transparent -translate-x-1/2 transition-colors duration-500"></div>
        
        <div className="space-y-12 relative z-10">
          {freelanceProcess.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                <div className="glass-card p-6 inline-block w-full max-w-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 font-bold text-6xl group-hover:scale-110 transition-transform duration-500 pointer-events-none text-slate-900 dark:text-white">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-4 transition-colors duration-300">
                    <span className="text-indigo-600 dark:text-orange-500 font-mono text-sm transition-colors duration-300">{step.step}</span>
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-neutral-400 transition-colors duration-300">{step.description}</p>
                </div>
              </div>
              
              {/* Timeline Dot */}
              <div className="hidden md:flex w-12 h-12 rounded-full bg-white dark:bg-neutral-900 border-2 border-indigo-500 dark:border-orange-500 items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.2)] dark:shadow-[0_0_15px_rgba(249,115,22,0.3)] z-10 transition-all duration-300">
                <div className="w-3 h-3 rounded-full bg-indigo-500 dark:bg-orange-500 dark:shadow-[0_0_10px_rgba(249,115,22,1)] transition-colors duration-300"></div>
              </div>
              
              <div className="hidden md:block w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreelanceProcess;
