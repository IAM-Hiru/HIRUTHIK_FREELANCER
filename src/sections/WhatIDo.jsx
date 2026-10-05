import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Globe, Code, Layout, Smartphone, Cpu, BarChart, Palette, Bot } from 'lucide-react';
import { services } from '../data/portfolioData';
import SectionHeading from '../components/SectionHeading';

const iconMap = {
  Globe: <Globe className="text-indigo-500 dark:text-orange-500 transition-colors duration-300" size={32} />,
  Code: <Code className="text-indigo-600 dark:text-red-500 transition-colors duration-300" size={32} />,
  Layout: <Layout className="text-rose-500 dark:text-yellow-500 transition-colors duration-300" size={32} />,
  Smartphone: <Smartphone className="text-indigo-500 dark:text-orange-500 transition-colors duration-300" size={32} />,
  Cpu: <Cpu className="text-indigo-600 dark:text-red-500 transition-colors duration-300" size={32} />,
  BarChart: <BarChart className="text-rose-500 dark:text-yellow-500 transition-colors duration-300" size={32} />,
  Palette: <Palette className="text-indigo-500 dark:text-orange-500 transition-colors duration-300" size={32} />,
  Bot: <Bot className="text-indigo-600 dark:text-red-500 transition-colors duration-300" size={32} />
};

const WhatIDo = () => {
  return (
    <section id="services" className="py-20 px-4 max-w-7xl mx-auto relative">
      <SectionHeading 
        title="What I Can Build" 
        subtitle="Practical development services I offer as a freelance developer."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Tilt className="h-full" tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} transitionSpeed={2500} glareEnable={true} glareMaxOpacity={0.05} glareColor="#f97316" glarePosition="all">
              <div className="glass-card p-6 flex flex-col items-start h-full cursor-pointer hover:shadow-[0_10px_30px_rgba(79,70,229,0.1)] dark:hover:shadow-[0_10px_30px_rgba(249,115,22,0.15)] transition-shadow duration-300">
                <div className="bg-indigo-50 dark:bg-neutral-950 p-4 rounded-xl mb-4 border border-indigo-100 dark:border-neutral-800 transform translate-z-10 transition-colors duration-300">
                  {iconMap[service.icon]}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white transform translate-z-20 transition-colors duration-300">{service.title}</h3>
                <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed transform translate-z-10 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhatIDo;
