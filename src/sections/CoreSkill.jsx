import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Database, Server, Layout, FileCode2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const coreSkills = [
  { name: 'MongoDB', icon: Database, color: 'text-emerald-500', desc: 'NoSQL Database' },
  { name: 'Express.js', icon: Server, color: 'text-slate-700 dark:text-neutral-400', desc: 'Backend Framework' },
  { name: 'React.js', icon: Layout, color: 'text-indigo-500 dark:text-orange-500', desc: 'Frontend Library' },
  { name: 'Node.js', icon: FileCode2, color: 'text-emerald-600', desc: 'JavaScript Runtime' }
];

const CoreSkill = () => {
  return (
    <section id="skills" className="py-20 px-4 max-w-7xl mx-auto overflow-hidden">
      <SectionHeading 
        title="Core Stack" 
        subtitle="My primary technology stack for building scalable web applications."
        className="text-center"
      />
      
      <div className="relative mt-12">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-indigo-100 via-indigo-300 to-rose-100 dark:from-red-500/20 dark:via-orange-500/40 dark:to-yellow-500/20 -translate-y-1/2 opacity-50 transition-colors duration-500"></div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {coreSkills.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05} transitionSpeed={2000} glareEnable={true} glareMaxOpacity={0.05} glareColor="#f97316" glarePosition="all">
                <div className="glass-card p-6 flex flex-col items-center text-center relative cursor-pointer shadow-sm hover:shadow-[0_15px_30px_rgba(79,70,229,0.1)] dark:shadow-lg dark:hover:shadow-[0_15px_40px_rgba(249,115,22,0.2)]">
                  
                  <div className={`w-16 h-16 rounded-2xl bg-slate-50 dark:bg-neutral-950 flex items-center justify-center mb-4 border border-slate-100 dark:border-neutral-800 ${tech.color} shadow-sm group-hover:scale-110 transition-all duration-300 transform translate-z-20`}>
                    <tech.icon size={32} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transform translate-z-10 transition-colors duration-300">{tech.name}</h3>
                  <p className="text-slate-500 dark:text-neutral-400 text-sm transform translate-z-10 transition-colors duration-300">{tech.desc}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreSkill;
