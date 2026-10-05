import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { services } from '../data/portfolioData';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';

const FreelanceServices = ({ onOpenModal }) => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <SectionHeading 
        title="Need a Digital Solution?" 
        subtitle="Let's Build It. Professional freelance services tailored to your requirements."
        className="text-center"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="h-full"
          >
            <Tilt className="h-full" tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.03} transitionSpeed={2000} glareEnable={true} glareMaxOpacity={0.05} glareColor="#f97316" glarePosition="all">
              <div className="glass-card p-6 flex flex-col h-full hover:shadow-[0_15px_30px_rgba(79,70,229,0.15)] dark:hover:shadow-[0_0_30px_rgba(249,115,22,0.25)] cursor-pointer transition-shadow duration-300">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transform translate-z-20 transition-colors duration-300">{service.title}</h3>
                <p className="text-slate-600 dark:text-neutral-400 text-sm mb-6 flex-grow transform translate-z-10 transition-colors duration-300">{service.description}</p>
                
                <div className="flex flex-col gap-3 mt-auto transform translate-z-20">
                  <Button variant="primary" className="w-full text-sm py-2" onClick={onOpenModal}>
                    Request Service &rarr;
                  </Button>
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FreelanceServices;
