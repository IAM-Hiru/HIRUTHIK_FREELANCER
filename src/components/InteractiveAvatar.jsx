import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const InteractiveAvatar = () => {
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
  const bodyRotate = useTransform(smoothX, [-1, 1], [-2, 2]);

  // Mappings for head parts
  const headX = useTransform(smoothX, [-1, 1], [-15, 15]);
  const headY = useTransform(smoothY, [-1, 1], [-10, 15]);
  const headRotate = useTransform(smoothX, [-1, 1], [-6, 6]);

  // Eyes and Pupils
  const eyeX = useTransform(smoothX, [-1, 1], [-3, 3]);
  const eyeY = useTransform(smoothY, [-1, 1], [-3, 3]);
  const pupilX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const pupilY = useTransform(smoothY, [-1, 1], [-6, 6]);

  // Glasses Parallax (glasses move slightly more than head for 3D effect)
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
    }, 4500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative flex flex-col items-center justify-end p-0 bg-slate-100/50 dark:bg-neutral-900/50 rounded-[2rem] border border-slate-200 dark:border-neutral-800 shadow-inner overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MCAwSDBWMGg0MHY0MEgzOVYxSDQweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')] opacity-50 dark:opacity-20 pointer-events-none"></div>

      <div className="relative w-full h-full flex flex-col items-center justify-end z-10">
        
        {/* === HUMAN BODY (Breathing Animation) === */}
        <motion.div 
          animate={{ y: [0, -4, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{ rotate: bodyRotate }} 
          className="relative z-10 flex flex-col items-center mb-10 w-full"
        >
          
          {/* Shoulders & Body Container */}
          <div className="w-72 h-56 relative z-10 flex justify-center">
            
            {/* Inner Hoodie (Overflow Hidden for clothes) */}
            <div className="absolute inset-0 bg-indigo-600 dark:bg-indigo-700 rounded-t-[6rem] shadow-2xl flex flex-col items-center justify-start border-4 border-indigo-800 dark:border-indigo-900 overflow-hidden">
              
              {/* Hoodie strings */}
              <div className="absolute top-6 left-[6.5rem] w-1.5 h-16 bg-white/80 rounded-full shadow-md"></div>
              <div className="absolute top-6 right-[6.5rem] w-1.5 h-16 bg-white/80 rounded-full shadow-md"></div>
              
              {/* Hoodie pocket */}
              <div className="absolute bottom-4 w-40 h-24 border-t-[3px] border-l-[3px] border-r-[3px] border-indigo-800/30 rounded-t-[2rem]"></div>
            </div>

            {/* Neck (Outside overflow-hidden) */}
            <div className="absolute -top-6 w-14 h-16 bg-[#F5C7A9] dark:bg-[#D9A384] rounded-b-2xl z-10 shadow-inner">
                {/* Neck Shadow under chin */}
                <div className="absolute top-0 w-full h-8 bg-black/10 rounded-b-xl"></div>
            </div>

            {/* === HEAD (Outside overflow-hidden) === */}
            <motion.div 
              style={{ x: headX, y: headY, rotate: headRotate }}
              className="absolute -top-[11rem] w-36 h-[11rem] bg-[#FFD6BA] dark:bg-[#E8B597] rounded-[4rem] rounded-b-[3.5rem] shadow-xl flex flex-col items-center justify-start pt-5 overflow-visible z-30 border-2 border-[#E5B599] dark:border-[#C49579]"
            >
              {/* Hair (Cool textured hair) */}
              <div className="absolute -top-5 w-[115%] h-16 bg-slate-900 dark:bg-black rounded-t-[4rem] z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.2)]">
                {/* Fluffy top */}
                <div className="absolute -top-3 left-6 w-24 h-10 bg-slate-900 dark:bg-black rounded-full"></div>
                <div className="absolute top-6 -left-3 w-8 h-10 bg-slate-900 dark:bg-black rounded-full"></div>
                <div className="absolute top-6 -right-3 w-8 h-10 bg-slate-900 dark:bg-black rounded-full"></div>
                
                {/* Front bangs falling over */}
                <div className="absolute top-12 left-6 w-5 h-8 bg-slate-900 dark:bg-black rounded-b-full rotate-[15deg]"></div>
                <div className="absolute top-12 right-6 w-5 h-8 bg-slate-900 dark:bg-black rounded-b-full rotate-[-15deg]"></div>
              </div>
              
              {/* Ears */}
              <div className="absolute top-16 -left-3 w-4 h-9 bg-[#F5C7A9] dark:bg-[#D9A384] rounded-l-full shadow-inner z-20"></div>
              <div className="absolute top-16 -right-3 w-4 h-9 bg-[#F5C7A9] dark:bg-[#D9A384] rounded-r-full shadow-inner z-20"></div>

              {/* Eyebrows (Thick, confident) */}
              <motion.div style={{ y: eyebrowY }} className="absolute top-10 flex gap-4 w-full justify-center z-40">
                <div className="w-9 h-2.5 bg-slate-800 dark:bg-black rounded-full rotate-[5deg]"></div>
                <div className="w-9 h-2.5 bg-slate-800 dark:bg-black rounded-full rotate-[-5deg]"></div>
              </motion.div>

              {/* === EYES === */}
              <div className="w-full flex items-center justify-center gap-6 mt-7 z-30 px-1">
                {/* Left Eye */}
                <div className="relative w-8 h-6">
                  <div className={`absolute inset-0 bg-white rounded-full shadow-inner transition-transform duration-150 ${isBlinking ? 'scale-y-0' : 'scale-y-100'} overflow-hidden border border-black/10`}>
                    <motion.div style={{ x: eyeX, y: eyeY }} className="w-full h-full flex items-center justify-center">
                      <motion.div style={{ x: pupilX, y: pupilY }} className="w-4 h-4 bg-slate-800 rounded-full flex items-start justify-end p-0.5 shadow-inner">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </motion.div>
                    </motion.div>
                  </div>
                  {/* Eyelid (when closed) */}
                  <div className={`absolute inset-0 bg-[#FFD6BA] dark:bg-[#E8B597] rounded-full transition-opacity duration-150 border-t border-[#E5B599] dark:border-[#C49579] ${isBlinking ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>
                
                {/* Right Eye */}
                <div className="relative w-8 h-6">
                  <div className={`absolute inset-0 bg-white rounded-full shadow-inner transition-transform duration-150 ${isBlinking ? 'scale-y-0' : 'scale-y-100'} overflow-hidden border border-black/10`}>
                    <motion.div style={{ x: eyeX, y: eyeY }} className="w-full h-full flex items-center justify-center">
                      <motion.div style={{ x: pupilX, y: pupilY }} className="w-4 h-4 bg-slate-800 rounded-full flex items-start justify-end p-0.5 shadow-inner">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </motion.div>
                    </motion.div>
                  </div>
                   {/* Eyelid (when closed) */}
                   <div className={`absolute inset-0 bg-[#FFD6BA] dark:bg-[#E8B597] rounded-full transition-opacity duration-150 border-t border-[#E5B599] dark:border-[#C49579] ${isBlinking ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>
              </div>

              {/* === GLASSES (Specs) === */}
              <motion.div 
                style={{ x: glassesX, y: glassesY }} 
                className="absolute top-[3.2rem] w-full flex justify-center items-center gap-1.5 z-50 pointer-events-none"
              >
                 {/* Left Lens */}
                 <div className="w-14 h-12 border-4 border-slate-900 dark:border-black rounded-[1rem] rounded-tr-sm bg-white/10 backdrop-blur-[1px] shadow-sm relative overflow-hidden">
                    {/* Glass glare */}
                    <div className="absolute -top-2 left-0 w-4 h-20 bg-white/30 rotate-45"></div>
                 </div>
                 {/* Bridge */}
                 <div className="w-3 h-1 bg-slate-900 dark:bg-black -mt-6"></div>
                 {/* Right Lens */}
                 <div className="w-14 h-12 border-4 border-slate-900 dark:border-black rounded-[1rem] rounded-tl-sm bg-white/10 backdrop-blur-[1px] shadow-sm relative overflow-hidden">
                    {/* Glass glare */}
                    <div className="absolute -top-2 left-0 w-4 h-20 bg-white/30 rotate-45"></div>
                 </div>
              </motion.div>

              {/* === NOSE === */}
              <div className="w-5 h-7 mt-3 bg-[#E5CBBF] dark:bg-[#C9A692] rounded-full opacity-80 z-30"></div>

              {/* === BIG HAPPY SMILE === */}
              <div className="mt-2 flex justify-center w-full z-30">
                <div className="w-16 h-8 bg-white border-4 border-slate-800 dark:border-slate-900 rounded-b-full overflow-hidden flex flex-col justify-between">
                  <div className="w-full h-2 bg-white"></div> {/* Teeth top */}
                  <div className="w-full h-4 bg-red-400 dark:bg-red-500 rounded-t-full mt-auto"></div> {/* Tongue */}
                </div>
              </div>

            </motion.div>

            {/* === ARMS & HANDS (Outside overflow-hidden) === */}
            <div className="absolute top-20 -left-8 w-14 h-40 bg-indigo-600 dark:bg-indigo-700 rounded-full border-l-4 border-indigo-800 dark:border-indigo-900 transform rotate-[25deg] z-20">
               {/* Hand resting on desk */}
               <div className="absolute bottom-[-10px] left-2 w-10 h-6 bg-[#F5C7A9] dark:bg-[#D9A384] rounded-full"></div>
            </div>
            
            <div className="absolute top-20 -right-8 w-14 h-40 bg-indigo-600 dark:bg-indigo-700 rounded-full border-r-4 border-indigo-800 dark:border-indigo-900 transform rotate-[-25deg] z-20">
               {/* Hand resting on desk */}
               <div className="absolute bottom-[-10px] right-2 w-10 h-6 bg-[#F5C7A9] dark:bg-[#D9A384] rounded-full"></div>
            </div>

          </div>
        </motion.div>

        {/* === LARGE DESK === */}
        <div className="absolute bottom-0 w-full h-28 bg-slate-800 dark:bg-neutral-950 border-t-[8px] border-slate-700 dark:border-neutral-900 z-40 flex flex-col items-center shadow-[0_-15px_30px_rgba(0,0,0,0.2)]">
          
          {/* Edge highlight */}
          <div className="absolute top-0 w-full h-1 bg-white/10"></div>

          {/* === LAPTOP === */}
          <div className="absolute -top-[5rem] w-[18rem] h-24 bg-slate-300 dark:bg-neutral-700 rounded-t-xl border-b-[8px] border-slate-400 dark:border-neutral-600 shadow-2xl flex justify-center items-center relative perspective-[1000px]">
             
             {/* Back of Laptop / Glowing Logo */}
             <div className="absolute inset-0 bg-slate-200 dark:bg-neutral-800 rounded-t-xl overflow-hidden flex items-center justify-center border-t-2 border-white/50 dark:border-white/10">
                <div className="w-8 h-8 rounded-full bg-white/80 dark:bg-white/10 blur-sm flex items-center justify-center">
                  <div className="w-4 h-4 bg-indigo-500 dark:bg-orange-500 rounded-full shadow-[0_0_15px_rgba(255,255,255,1)]"></div>
                </div>
             </div>
             
          </div>

          {/* Glowing Code reflection on desk */}
          <div className="absolute top-2 w-[16rem] h-8 bg-indigo-500/20 dark:bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
        </div>

      </div>
    </div>
  );
};

export default InteractiveAvatar;
