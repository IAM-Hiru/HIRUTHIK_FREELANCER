import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const AboutMeAvatar = () => {
  const containerRef = useRef(null);
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Motion values for mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for natural movement
  const springConfig = { damping: 20, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Body sways slightly
  const bodyRotate = useTransform(smoothX, [-1, 1], [-3, 3]);

  // Mappings for head parts
  const headX = useTransform(smoothX, [-1, 1], [-15, 15]);
  const headY = useTransform(smoothY, [-1, 1], [-10, 15]);
  const headRotate = useTransform(smoothX, [-1, 1], [-6, 6]);

  // Eyes and Pupils
  const eyeX = useTransform(smoothX, [-1, 1], [-3, 3]);
  const eyeY = useTransform(smoothY, [-1, 1], [-3, 3]);
  const pupilX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const pupilY = useTransform(smoothY, [-1, 1], [-6, 6]);

  // Glasses Parallax
  const glassesX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const glassesY = useTransform(smoothY, [-1, 1], [-15, 20]);
  
  // Eyebrows
  const eyebrowY = useTransform(smoothY, [-1, 1], [-5, 2]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const limit = (val, min, max) => Math.min(Math.max(val, min), max);
      
      const distanceX = limit((e.clientX - centerX) / 400, -1, 1);
      const distanceY = limit((e.clientY - centerY) / 400, -1, 1);

      mouseX.set(distanceX);
      mouseY.set(distanceY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Blinking logic
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[500px] max-w-[400px] mx-auto relative flex flex-col items-center justify-end overflow-visible">
      
      {/* Sci-Fi Hologram Pedestal Background */}
      <div className="absolute bottom-0 w-[300px] h-[100px] perspective-[500px] z-0 flex items-center justify-center">
        <div className="absolute w-full h-full border-[6px] border-indigo-500/30 dark:border-orange-500/30 rounded-full transform rotateX-[70deg] animate-pulse"></div>
        <div className="absolute w-[80%] h-[80%] border-[2px] border-indigo-400/50 dark:border-orange-400/50 rounded-full transform rotateX-[70deg] border-dashed animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute top-1/2 w-[150%] h-[200px] bg-gradient-to-t from-indigo-500/20 dark:from-orange-500/20 to-transparent blur-xl -translate-y-1/2 pointer-events-none"></div>
      </div>

      <div className="relative w-full h-full flex flex-col items-center justify-end z-10 scale-90">
        
        {/* === HUMAN BODY (Breathing Animation) === */}
        <motion.div 
          animate={{ y: [0, -5, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{ rotate: bodyRotate }} 
          className="relative z-10 flex flex-col items-center w-full"
        >
          
          {/* Shoulders & Torso Container (Standing pose) */}
          <div className="w-[22rem] h-[18rem] relative z-10 flex justify-center">
            
            {/* Torso (Smart Casual or Hoodie) */}
            <div className="absolute top-0 w-64 h-[18rem] bg-indigo-600 dark:bg-indigo-700 rounded-t-[6rem] shadow-2xl flex flex-col items-center justify-start border-4 border-indigo-800 dark:border-indigo-900 overflow-hidden">
               {/* Chest line */}
               <div className="w-px h-32 bg-indigo-800 dark:bg-indigo-900 opacity-50 mt-12"></div>
               
               {/* ID Badge / Lanyard */}
               <div className="absolute top-0 w-32 h-[8.5rem] border-b-2 border-l border-r border-slate-900 dark:border-black rounded-b-full opacity-60"></div>
               <div className="absolute top-[8rem] w-12 h-16 bg-white dark:bg-slate-200 rounded-md shadow-lg border-2 border-slate-300 dark:border-slate-500 flex flex-col items-center justify-start pt-1 z-20">
                  <div className="w-6 h-6 bg-slate-300 dark:bg-slate-400 rounded-full"></div>
                  <div className="w-8 h-1 bg-slate-400 dark:bg-slate-500 mt-2 rounded-full"></div>
                  <div className="w-6 h-1 bg-slate-400 dark:bg-slate-500 mt-1 rounded-full"></div>
               </div>

               {/* Hoodie pocket */}
               <div className="absolute bottom-4 w-40 h-24 border-t-[3px] border-l-[3px] border-r-[3px] border-indigo-800/30 rounded-t-[2rem]"></div>
            </div>

            {/* Neck */}
            <div className="absolute -top-6 w-14 h-16 bg-[#F5C7A9] dark:bg-[#D9A384] rounded-b-2xl z-10 shadow-inner">
                <div className="absolute top-0 w-full h-8 bg-black/10 rounded-b-xl"></div>
            </div>

            {/* === HEAD === */}
            <motion.div 
              style={{ x: headX, y: headY, rotate: headRotate }}
              className="absolute -top-[11rem] w-36 h-[11rem] bg-[#FFD6BA] dark:bg-[#E8B597] rounded-[4rem] rounded-b-[3.5rem] shadow-xl flex flex-col items-center justify-start pt-5 overflow-visible z-40 border-2 border-[#E5B599] dark:border-[#C49579]"
            >
              {/* Hair */}
              <div className="absolute -top-5 w-[115%] h-16 bg-slate-900 dark:bg-black rounded-t-[4rem] z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.2)]">
                <div className="absolute -top-3 left-6 w-24 h-10 bg-slate-900 dark:bg-black rounded-full"></div>
                <div className="absolute top-6 -left-3 w-8 h-10 bg-slate-900 dark:bg-black rounded-full"></div>
                <div className="absolute top-6 -right-3 w-8 h-10 bg-slate-900 dark:bg-black rounded-full"></div>
                
                <div className="absolute top-12 left-6 w-5 h-8 bg-slate-900 dark:bg-black rounded-b-full rotate-[15deg]"></div>
                <div className="absolute top-12 right-6 w-5 h-8 bg-slate-900 dark:bg-black rounded-b-full rotate-[-15deg]"></div>
              </div>
              
              {/* Ears */}
              <div className="absolute top-16 -left-3 w-4 h-9 bg-[#F5C7A9] dark:bg-[#D9A384] rounded-l-full shadow-inner z-20"></div>
              <div className="absolute top-16 -right-3 w-4 h-9 bg-[#F5C7A9] dark:bg-[#D9A384] rounded-r-full shadow-inner z-20"></div>

              {/* Eyebrows */}
              <motion.div style={{ y: eyebrowY }} className="absolute top-10 flex gap-4 w-full justify-center z-40">
                <div className="w-9 h-2.5 bg-slate-800 dark:bg-black rounded-full rotate-[3deg]"></div>
                <div className="w-9 h-2.5 bg-slate-800 dark:bg-black rounded-full rotate-[-3deg]"></div>
              </motion.div>

              {/* EYES */}
              <div className="w-full flex items-center justify-center gap-6 mt-7 z-30 px-1">
                <div className="relative w-8 h-6">
                  <div className={`absolute inset-0 bg-white rounded-full shadow-inner transition-transform duration-150 ${isBlinking ? 'scale-y-0' : 'scale-y-100'} overflow-hidden border border-black/10`}>
                    <motion.div style={{ x: eyeX, y: eyeY }} className="w-full h-full flex items-center justify-center">
                      <motion.div style={{ x: pupilX, y: pupilY }} className="w-4 h-4 bg-slate-800 rounded-full flex items-start justify-end p-0.5 shadow-inner">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </motion.div>
                    </motion.div>
                  </div>
                  <div className={`absolute inset-0 bg-[#FFD6BA] dark:bg-[#E8B597] rounded-full transition-opacity duration-150 border-t border-[#E5B599] dark:border-[#C49579] ${isBlinking ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>
                
                <div className="relative w-8 h-6">
                  <div className={`absolute inset-0 bg-white rounded-full shadow-inner transition-transform duration-150 ${isBlinking ? 'scale-y-0' : 'scale-y-100'} overflow-hidden border border-black/10`}>
                    <motion.div style={{ x: eyeX, y: eyeY }} className="w-full h-full flex items-center justify-center">
                      <motion.div style={{ x: pupilX, y: pupilY }} className="w-4 h-4 bg-slate-800 rounded-full flex items-start justify-end p-0.5 shadow-inner">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </motion.div>
                    </motion.div>
                  </div>
                   <div className={`absolute inset-0 bg-[#FFD6BA] dark:bg-[#E8B597] rounded-full transition-opacity duration-150 border-t border-[#E5B599] dark:border-[#C49579] ${isBlinking ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>
              </div>

              {/* GLASSES */}
              <motion.div 
                style={{ x: glassesX, y: glassesY }} 
                className="absolute top-[3.2rem] w-full flex justify-center items-center gap-1.5 z-50 pointer-events-none"
              >
                 <div className="w-14 h-12 border-4 border-slate-900 dark:border-black rounded-[1rem] rounded-tr-sm bg-white/10 backdrop-blur-[1px] shadow-sm relative overflow-hidden">
                    <div className="absolute -top-2 left-0 w-4 h-20 bg-white/30 rotate-45"></div>
                 </div>
                 <div className="w-3 h-1 bg-slate-900 dark:bg-black -mt-6"></div>
                 <div className="w-14 h-12 border-4 border-slate-900 dark:border-black rounded-[1rem] rounded-tl-sm bg-white/10 backdrop-blur-[1px] shadow-sm relative overflow-hidden">
                    <div className="absolute -top-2 left-0 w-4 h-20 bg-white/30 rotate-45"></div>
                 </div>
              </motion.div>

              {/* NOSE */}
              <div className="w-5 h-7 mt-3 bg-[#E5CBBF] dark:bg-[#C9A692] rounded-full opacity-80 z-30"></div>

              {/* SMILE (Friendly presentation smile) */}
              <div className="mt-2 flex justify-center w-full z-30">
                <div className="w-16 h-7 bg-white border-4 border-slate-800 dark:border-slate-900 rounded-b-full overflow-hidden flex flex-col justify-between">
                  <div className="w-full h-1.5 bg-white"></div>
                  <div className="w-full h-3 bg-red-400 dark:bg-red-500 rounded-t-full mt-auto"></div>
                </div>
              </div>

            </motion.div>

            {/* === LEFT ARM (Holding Coffee) === */}
            <div className="absolute top-10 -left-6 w-16 h-[11rem] bg-indigo-600 dark:bg-indigo-700 rounded-full border-l-4 border-indigo-800 dark:border-indigo-900 transform rotate-[15deg] z-20 flex flex-col justify-end items-center pb-2">
               {/* Hand */}
               <div className="w-10 h-10 bg-[#F5C7A9] dark:bg-[#D9A384] rounded-full relative shadow-inner z-20">
                  {/* Starbucks Style Coffee Cup */}
                  <div className="absolute -top-10 -left-2 w-12 h-16 bg-white dark:bg-slate-100 rounded-lg rounded-b-xl shadow-xl z-10 flex flex-col items-center justify-between overflow-hidden border border-slate-200">
                     {/* Black Lid */}
                     <div className="w-[110%] h-3 bg-slate-900 dark:bg-black rounded-t-lg shadow-sm"></div>
                     {/* Cardboard Sleeve */}
                     <div className="w-full h-8 bg-[#C29E75] flex items-center justify-center shadow-inner">
                        <div className="w-4 h-4 bg-green-700 rounded-full border border-white"></div>
                     </div>
                     <div className="h-2"></div>
                     
                     {/* Steam */}
                     <motion.div 
                        animate={{ y: [-5, -15], opacity: [0, 0.8, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-6 left-2 w-1.5 h-6 bg-white rounded-full blur-sm"
                     ></motion.div>
                     <motion.div 
                        animate={{ y: [-2, -18], opacity: [0, 0.6, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                        className="absolute -top-6 right-3 w-1.5 h-5 bg-white rounded-full blur-sm"
                     ></motion.div>
                  </div>
               </div>
            </div>
            
            {/* === RIGHT ARM (Presenting Hologram) === */}
            <motion.div 
               animate={{ rotate: [-20, -15, -20] }}
               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               style={{ transformOrigin: "top center" }}
               className="absolute top-12 -right-8 w-16 h-[11rem] bg-indigo-600 dark:bg-indigo-700 rounded-full border-r-4 border-indigo-800 dark:border-indigo-900 z-30 flex flex-col justify-end items-center pb-2"
            >
               {/* Hand Palm Up */}
               <div className="w-12 h-10 bg-[#F5C7A9] dark:bg-[#D9A384] rounded-full shadow-inner relative z-10 flex justify-center">
                  {/* Hologram Projector Glow */}
                  <div className="absolute -top-2 w-6 h-4 bg-cyan-400/50 dark:bg-orange-400/50 rounded-full blur-md animate-pulse"></div>
                  
                  {/* Floating Hologram Object (React/Code Logo) */}
                  <motion.div 
                     animate={{ y: [-10, -20, -10], rotateY: [0, 360] }}
                     transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                     className="absolute -top-16 w-12 h-12 flex items-center justify-center perspective-[500px]"
                  >
                     {/* Hologram Rings */}
                     <div className="absolute w-full h-full border-2 border-cyan-400 dark:border-orange-500 rounded-full opacity-80 border-t-transparent animate-[spin_2s_linear_infinite]"></div>
                     <div className="absolute w-full h-full border-2 border-cyan-300 dark:border-orange-400 rounded-full opacity-80 border-b-transparent animate-[spin_3s_linear_infinite_reverse] scale-75"></div>
                     <div className="w-3 h-3 bg-cyan-200 dark:bg-orange-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] dark:shadow-[0_0_15px_rgba(249,115,22,1)]"></div>
                  </motion.div>
               </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AboutMeAvatar;
