import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import SectionHeading from '../components/SectionHeading';
import AboutMeAvatar from '../components/AboutMeAvatar';


const AboutMe = () => {
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="about" className="py-20 px-4 max-w-7xl mx-auto overflow-hidden">
      <SectionHeading title="About Me" />
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative flex justify-center items-center"
        >
          <AboutMeAvatar />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6 text-slate-600 dark:text-neutral-300 leading-relaxed text-lg whitespace-pre-wrap transition-colors duration-300">
            {personalInfo.aboutMe}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
