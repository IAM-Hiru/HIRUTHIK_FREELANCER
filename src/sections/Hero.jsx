import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Mail, MessageCircle, Code, Layers, Sparkles } from 'lucide-react';
import { Github, Linkedin } from '../components/BrandIcons';
import { personalInfo } from '../data/portfolioData';
import Button from '../components/Button';
import Badge from '../components/Badge';

import InteractiveAvatar from '../components/InteractiveAvatar';

const Hero = ({ onOpenModal }) => {
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 1000], [0, 300]);

  // Mouse Parallax Effect for Background Elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const parallaxX1 = useTransform(smoothMouseX, [0, window.innerWidth || 1000], [-30, 30]);
  const parallaxY1 = useTransform(smoothMouseY, [0, window.innerHeight || 1000], [-30, 30]);

  const parallaxX2 = useTransform(smoothMouseX, [0, window.innerWidth || 1000], [40, -40]);
  const parallaxY2 = useTransform(smoothMouseY, [0, window.innerHeight || 1000], [40, -40]);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-24 pb-12 px-4 relative overflow-hidden" onMouseMove={handleMouseMove}>
      
      {/* Parallax Background Glow */}
      <motion.div 
        style={{ y: yBackground, x: parallaxX1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 dark:bg-red-600/10 rounded-full blur-[120px] pointer-events-none transition-colors duration-700" 
      />

      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="flex flex-col items-start text-left relative z-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 flex items-center gap-2">
                <Sparkles size={14} className="text-indigo-500 dark:text-orange-500" />
                {personalInfo.title}
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight text-slate-900 dark:text-white transition-colors duration-300"
            >
              Hi, I'm {personalInfo.name.split(' ')[0]} <br/>
              <span className="text-gradient text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">{personalInfo.headline}</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-600 dark:text-neutral-400 text-base md:text-lg max-w-md mb-8 leading-relaxed transition-colors duration-300"
            >
              {personalInfo.supportingText}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto"
            >
              <Button variant="primary" className="px-8 py-4 text-lg shadow-[0_0_20px_rgba(79,70,229,0.3)] dark:shadow-[0_0_20px_rgba(249,115,22,0.4)]" onClick={onOpenModal}>
                Start a Project &rarr;
              </Button>
              <Button variant="outline" className="px-8 py-4 text-lg" onClick={() => {
                const el = document.getElementById('projects');
                if(el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.hash = '#projects';
                }
              }}>
                View My Work
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-6"
            >
              <p className="text-sm font-medium text-slate-500 dark:text-neutral-500 uppercase tracking-wider">Connect</p>
              <div className="h-px w-8 bg-slate-300 dark:bg-neutral-700"></div>
              <a href={personalInfo.socialLinks.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:text-neutral-500 dark:hover:text-white transition-colors transform hover:scale-110">
                <Github size={24} />
              </a>
              <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 dark:text-neutral-500 dark:hover:text-blue-500 transition-colors transform hover:scale-110">
                <Linkedin size={24} />
              </a>
              <a href={personalInfo.socialLinks.whatsapp} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-green-500 dark:text-neutral-500 dark:hover:text-green-500 transition-colors transform hover:scale-110">
                <MessageCircle size={24} />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive Code Character */}
          <div className="hidden lg:block relative w-full aspect-square max-w-[380px] lg:max-w-[440px] xl:max-w-[500px] mx-auto z-20 mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="w-full h-full relative"
            >
              
              <InteractiveAvatar />

              {/* Floating Element 1: Code */}
              <motion.div 
                style={{ x: parallaxX1, y: parallaxY1 }}
                className="absolute -top-6 -left-6 z-30 glass-card p-4 animate-float border-t border-l border-white/40 dark:border-white/10 shadow-[0_10px_30px_rgba(79,70,229,0.3)] dark:shadow-[0_10px_30px_rgba(249,115,22,0.3)] bg-white/70 dark:bg-neutral-900/80 backdrop-blur-md rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-orange-500/20 flex items-center justify-center">
                    <Code className="text-indigo-600 dark:text-orange-500" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-neutral-400">Clean Code</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">React & Node</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Element 2: Design */}
              <motion.div 
                style={{ x: parallaxX2, y: parallaxY2 }}
                className="absolute -bottom-8 -right-8 z-30 glass-card p-4 animate-float-delayed border-t border-l border-white/40 dark:border-white/10 shadow-[0_10px_30px_rgba(79,70,229,0.3)] dark:shadow-[0_10px_30px_rgba(249,115,22,0.3)] bg-white/70 dark:bg-neutral-900/80 backdrop-blur-md rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-red-500/20 flex items-center justify-center">
                    <Layers className="text-rose-600 dark:text-red-500" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-neutral-400">Modern UI/UX</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Pixel Perfect</p>
                  </div>
                </div>
              </motion.div>

              {/* Background accent blobs for the character */}
              <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-indigo-500/20 to-rose-500/20 dark:from-red-500/30 dark:to-yellow-500/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
