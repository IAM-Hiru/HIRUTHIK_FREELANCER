import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { pricingTiers } from '../data/portfolioData';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { Check } from 'lucide-react';

const Pricing = () => {
  const [currency, setCurrency] = useState('inr'); // 'inr' or 'usd'

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <SectionHeading 
        title="Pricing & Packages" 
        subtitle="Transparent freelance packages tailored for various needs."
        className="text-center"
      />



      <div className="grid md:grid-cols-3 gap-8">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={tier.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={tier.isPopular ? 'md:-translate-y-4' : ''}
          >
            <Tilt className="h-full" tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={2000} glareEnable={true} glareMaxOpacity={0.05} glareColor="#f97316" glarePosition="all">
              <div className={`glass-card p-8 relative flex flex-col h-full cursor-pointer shadow-sm hover:shadow-[0_20px_40px_rgba(79,70,229,0.1)] dark:shadow-lg dark:hover:shadow-[0_20px_40px_rgba(249,115,22,0.15)] transition-shadow duration-300 ${tier.isPopular ? 'border-indigo-400 shadow-[0_10px_30px_rgba(79,70,229,0.15)] dark:border-orange-500 dark:shadow-[0_0_30px_rgba(249,115,22,0.1)]' : ''}`}>
                {tier.isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-rose-500 dark:from-red-500 dark:to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg dark:shadow-[0_0_15px_rgba(249,115,22,0.5)] transform translate-z-20 transition-all duration-300">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transform translate-z-20 transition-colors duration-300">{tier.title}</h3>
                <p className="text-slate-600 dark:text-neutral-400 mb-6 min-h-[48px] transform translate-z-10 transition-colors duration-300">{tier.description}</p>
                
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-8 transform translate-z-20 transition-colors duration-300">
                  {typeof tier.price === 'string' ? tier.price : tier.price[currency]}
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow transform translate-z-10">
                  {tier.features.map(feature => (
                    <li key={feature} className="flex items-center gap-3 text-slate-700 dark:text-neutral-300 transition-colors duration-300">
                      <div className="bg-indigo-100 dark:bg-orange-500/10 p-1 rounded-full text-indigo-600 dark:text-orange-500 transition-colors duration-300">
                        <Check size={16} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="transform translate-z-20 mt-auto">
                  <Button 
                    variant={tier.isPopular ? 'primary' : 'secondary'} 
                    className="w-full"
                    onClick={() => document.getElementById('contact').scrollIntoView()}
                  >
                    Request Quote
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

export default Pricing;
