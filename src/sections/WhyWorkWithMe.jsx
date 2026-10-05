import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { whyWorkWithMe, currentlyLearning } from '../data/portfolioData';
import SectionHeading from '../components/SectionHeading';
import { CheckCircle2, Zap } from 'lucide-react';

export const WhyWorkWithMe = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <SectionHeading title="Why Work With Me" className="text-center" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {whyWorkWithMe.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Tilt className="h-full" tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05} transitionSpeed={2000} glareEnable={true} glareMaxOpacity={0.05} glareColor="#f97316" glarePosition="all">
              <div className="glass-card p-6 flex gap-4 h-full cursor-pointer hover:shadow-[0_10px_30px_rgba(79,70,229,0.1)] dark:hover:shadow-[0_10px_30px_rgba(249,115,22,0.15)] transition-shadow duration-300">
                <div className="mt-1 transform translate-z-20">
                  <CheckCircle2 className="text-indigo-500 dark:text-orange-500 transition-colors duration-300" size={24} />
                </div>
                <div className="transform translate-z-10">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">{item.title}</h3>
                  <p className="text-slate-600 dark:text-neutral-400 text-sm transition-colors duration-300">{item.description}</p>
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const CurrentlyLearning = () => {
  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2500} glareEnable={true} glareMaxOpacity={0.02} glareColor="#ef4444" glarePosition="all">
        <div className="glass-card p-8 md:p-12 relative overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_15px_40px_rgba(244,63,94,0.1)] dark:shadow-lg dark:hover:shadow-[0_15px_40px_rgba(239,68,68,0.2)] transition-shadow duration-300">
          {/* Background gradient effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 dark:bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 transform translate-z-0 transition-colors duration-500"></div>
          
          <div className="transform translate-z-20 relative z-10">
            <SectionHeading 
              title="Currently Learning & Exploring" 
              subtitle="Continuous growth is key. Here's what I'm diving into right now." 
              className="mb-8"
            />
            
            <div className="flex flex-wrap gap-4">
              {currentlyLearning.map((topic, index) => (
                <motion.div
                  key={topic}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full shadow-sm hover:border-rose-300 hover:bg-rose-50 dark:bg-neutral-950 dark:border-neutral-800 dark:hover:border-red-500/50 dark:hover:bg-neutral-900 transition-all duration-300"
                >
                  <Zap className="text-rose-500 dark:text-red-500 transition-colors duration-300" size={16} />
                  <span className="text-slate-700 dark:text-neutral-300 font-medium text-sm transition-colors duration-300">{topic}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Tilt>
    </section>
  );
};
