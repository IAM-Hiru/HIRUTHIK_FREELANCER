import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Mail, MessageCircle } from 'lucide-react';
import { Github, Linkedin } from '../components/BrandIcons';
import { personalInfo } from '../data/portfolioData';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';

const Contact = ({ onOpenModal }) => {
  return (
    <section id="contact" className="py-20 px-4 max-w-4xl mx-auto text-center relative">
      <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.01} transitionSpeed={2500} glareEnable={true} glareMaxOpacity={0.03} glareColor="#f97316" glarePosition="all">
        <div className="glass-card p-12 border-slate-200 dark:border-neutral-800 relative overflow-hidden z-10 cursor-pointer shadow-lg hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] dark:hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] transition-all duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 dark:bg-orange-500/10 rounded-full blur-3xl z-[-1] transform translate-z-0 transition-colors duration-500"></div>
          
          <div className="transform translate-z-20 relative z-10">
            <SectionHeading 
              title={
                <>
                  Have an Idea?
                  <br />
                  Let's Build It Together
                </>
              } 
              subtitle="I'm currently available for freelance projects and collaborations."
              className="text-center mx-auto"
            />
            
            <div className="flex justify-center mt-8 mb-12">
              <Button variant="primary" className="text-lg px-8 py-4 shadow-lg hover:shadow-[0_15px_30px_rgba(79,70,229,0.2)] dark:shadow-[0_0_15px_rgba(249,115,22,0.3)] dark:hover:shadow-[0_15px_30px_rgba(249,115,22,0.5)] transition-shadow duration-300" onClick={onOpenModal}>
                Start a Project
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-slate-200 dark:border-neutral-800 transition-colors duration-300">
              <a href={personalInfo.socialLinks.email} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-orange-500 transition-colors">
                <Mail size={20} />
                <span>Email</span>
              </a>
              <a href={personalInfo.socialLinks.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-green-600 dark:text-neutral-400 dark:hover:text-green-500 transition-colors">
                <MessageCircle size={20} />
                <span>WhatsApp</span>
              </a>
              <a href={personalInfo.socialLinks.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-500 transition-colors">
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </Tilt>
    </section>
  );
};

export default Contact;
