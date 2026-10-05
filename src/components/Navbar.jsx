import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button';
import { personalInfo } from '../data/portfolioData';

const Navbar = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-neutral-800' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="text-xl font-bold font-sans tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
           <span className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-orange-500 flex items-center justify-center text-white font-black text-lg shadow-[0_0_15px_rgba(79,70,229,0.4)] dark:shadow-[0_0_15px_rgba(249,115,22,0.4)]">
              {personalInfo.name.charAt(0)}
           </span>
           <span>{personalInfo.name.split(' ')[0]}</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-orange-500 transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="h-6 w-px bg-slate-300 dark:bg-neutral-700"></div>
          <Button variant="primary" className="px-5 py-2.5 text-sm" onClick={onOpenModal}>
            Hire Me
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-900 dark:text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-neutral-950 border-b border-slate-200 dark:border-neutral-800 py-4 px-4 shadow-xl flex flex-col gap-4">
           {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-base font-medium text-slate-600 dark:text-neutral-400 p-2 hover:bg-slate-50 dark:hover:bg-neutral-900 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button variant="primary" className="w-full mt-2" onClick={() => { setIsMenuOpen(false); onOpenModal(); }}>
              Hire Me
            </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
