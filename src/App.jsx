import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import Hero from './sections/Hero';
import WhatIDo from './sections/WhatIDo';
import AboutMe from './sections/AboutMe';
import CoreSkill from './sections/CoreSkill';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import FreelanceServices from './sections/FreelanceServices';
import FreelanceProcess from './sections/FreelanceProcess';
import Pricing from './sections/Pricing';
import { WhyWorkWithMe, CurrentlyLearning } from './sections/WhyWorkWithMe';
import Contact from './sections/Contact';
import HireMeModal from './components/HireMeModal';
import Navbar from './components/Navbar';
import AddProjectPage from './pages/AddProjectPage';

// ── Main Portfolio Page ───────────────────────────────────────────────────────
function PortfolioHome() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [footerClicks, setFooterClicks] = useState(0);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Secret Admin Trigger Logic — click name 5 times → go to /add-project
  const handleFooterClick = () => {
    const newClicks = footerClicks + 1;
    setFooterClicks(newClicks);

    if (newClicks >= 5) {
      navigate('/add-project');
      setFooterClicks(0);
      return;
    }

    // Reset if user stops clicking for 2 seconds
    setTimeout(() => {
      setFooterClicks(0);
    }, 2000);
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden relative transition-colors duration-500 bg-slate-50 text-slate-900 selection:bg-indigo-500/20 dark:bg-neutral-950 dark:text-white dark:selection:bg-orange-500/30 ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Dynamic Backgrounds */}
      <div className={`fixed inset-0 z-[-1] transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/50 via-slate-50 to-white ${isDarkMode ? 'opacity-0' : 'opacity-80'}`} />
      <div className={`fixed inset-0 z-[-1] transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-950/20 via-neutral-950 to-neutral-950 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`} />

      {/* Theme Toggle Button */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 bg-white text-slate-800 border border-slate-200 dark:bg-neutral-900 dark:text-orange-500 dark:border-neutral-700 dark:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
        aria-label="Toggle Theme"
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
      
      {/* Modal */}
      <HireMeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main>
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <WhatIDo />
        <AboutMe />
        <CoreSkill />
        <Skills />
        <Projects />
        <FreelanceServices onOpenModal={() => setIsModalOpen(true)} />
        <FreelanceProcess />
        <Pricing />
        <WhyWorkWithMe />
        <CurrentlyLearning />
        <Contact onOpenModal={() => setIsModalOpen(true)} />
      </main>

      {/* Footer with Secret Admin Trigger — click name 5× to open /add-project */}
      <footer className="py-8 text-center border-t transition-colors duration-500 text-slate-500 border-slate-200 dark:text-neutral-500 dark:border-neutral-800">
        <p>
          © {new Date().getFullYear()}{' '}
          <span 
            className="cursor-pointer hover:text-indigo-500 dark:hover:text-orange-500 transition-colors select-none"
            onClick={handleFooterClick}
            title={footerClicks > 0 ? `${5 - footerClicks} more clicks...` : ''}
          >
            Hiruthik Prashanth
          </span>
          . Built with React &amp; Tailwind.
        </p>
      </footer>
    </div>
  );
}

// ── App with Router ───────────────────────────────────────────────────────────
function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />
      <Route path="/add-project" element={<AddProjectPage />} />
    </Routes>
  );
}

export default App;
