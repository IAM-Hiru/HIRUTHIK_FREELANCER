import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { skillsCategories } from '../data/portfolioData';
import Badge from '../components/Badge';
import SectionHeading from '../components/SectionHeading';

const Skills = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <SectionHeading title="Skills & Tools" className="text-center" />
      
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {skillsCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Tilt className="h-full" tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.01} transitionSpeed={2500} glareEnable={true} glareMaxOpacity={0.03} glareColor="#f97316" glarePosition="all">
              <div className="glass-card p-8 h-full shadow-sm hover:shadow-indigo-500/5 dark:shadow-lg dark:hover:shadow-[0_10px_30px_rgba(249,115,22,0.1)] transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 transform translate-z-20 transition-colors duration-300">
                  <span className="w-2 h-8 bg-indigo-500 dark:bg-orange-500 rounded-full inline-block shadow-[0_0_10px_rgba(79,70,229,0.3)] dark:shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all duration-300"></span>
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3 transform translate-z-10">
                  {category.skills.map(skill => (
                    <Badge key={skill} className="bg-indigo-50 text-indigo-600 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-100 dark:bg-neutral-900 dark:text-orange-400 dark:border-orange-500/30 dark:hover:border-orange-400 dark:hover:text-orange-300 cursor-default">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
