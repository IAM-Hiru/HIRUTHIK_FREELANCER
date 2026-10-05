import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, LineChart, Bot } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { skillsCategories } from '../data/portfolioData';

const getCategorySkills = (title) => {
  return skillsCategories.find(c => c.title === title)?.skills || [];
};

const AiAndDataScience = () => {
  return (
    <section id="ai-data-science" className="py-20 px-4 max-w-7xl mx-auto">
      <SectionHeading 
        title="AI & Data Science" 
        subtitle="Practical knowledge and exploration in data-driven solutions and AI assistance."
      />

      <div className="grid md:grid-cols-3 gap-8">
        {/* Machine Learning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 bg-gradient-to-br from-navy-800 to-navy-900 border-t-4 border-t-blue-500"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
              <BrainCircuit size={28} />
            </div>
            <h3 className="text-xl font-bold text-white">Machine Learning</h3>
          </div>
          <ul className="space-y-3">
            {['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'Data preprocessing', 'Feature engineering', 'Model training', 'Model evaluation'].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Data Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-8 bg-gradient-to-br from-navy-800 to-navy-900 border-t-4 border-t-purple-500"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
              <LineChart size={28} />
            </div>
            <h3 className="text-xl font-bold text-white">Data Analytics</h3>
          </div>
          <ul className="space-y-3">
            {['Data cleaning', 'EDA', 'Data visualization', 'Dataset analysis', 'Python', 'Pandas', 'NumPy', 'Matplotlib'].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* AI Development Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-8 bg-gradient-to-br from-navy-800 to-navy-900 border-t-4 border-t-cyan-400"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cyan-400/20 rounded-lg text-cyan-400">
              <Bot size={28} />
            </div>
            <h3 className="text-xl font-bold text-white">AI Tools</h3>
          </div>
          <ul className="space-y-3">
            {getCategorySkills('AI Tools').map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default AiAndDataScience;
