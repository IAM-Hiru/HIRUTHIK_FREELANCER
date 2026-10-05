import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Lock } from 'lucide-react';
import Button from './Button';

const AdminProjectModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    link: ''
  });
  
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert comma-separated tech stack into an array
    const techArray = formData.techStack.split(',').map(item => item.trim()).filter(Boolean);
    
    const newProject = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      techStack: techArray,
      link: formData.link
    };

    // Load existing local projects
    const existingProjects = JSON.parse(localStorage.getItem('freelance_projects') || '[]');
    
    // Add new project to the front
    const updatedProjects = [newProject, ...existingProjects];
    
    // Save back to local storage
    localStorage.setItem('freelance_projects', JSON.stringify(updatedProjects));
    
    // Dispatch custom event to notify Projects.jsx to re-render
    window.dispatchEvent(new Event('projectAdded'));

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setFormData({ title: '', description: '', techStack: '', link: '' });
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm transition-colors duration-300"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-white dark:bg-neutral-900 border-2 border-indigo-500/50 dark:border-orange-500/50 rounded-2xl shadow-[0_20px_60px_rgba(79,70,229,0.3)] dark:shadow-[0_20px_60px_rgba(249,115,22,0.3)] overflow-hidden max-h-[90vh] overflow-y-auto transition-colors duration-300"
          >
            <div className="sticky top-0 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-slate-100 dark:border-neutral-800 p-6 flex justify-between items-center z-10 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-indigo-600 dark:text-orange-500"><Lock size={24} /></span> Admin: Add Project
              </h2>
              <button onClick={onClose} className="text-slate-400 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-slate-100 dark:bg-neutral-800 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-neutral-700">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {isSaved ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                    <Save className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Project Added!</h3>
                  <p className="text-slate-600 dark:text-neutral-400">It is now live on your portfolio (Local Storage).</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="bg-indigo-50 dark:bg-orange-500/10 p-4 rounded-xl border border-indigo-100 dark:border-orange-500/20 mb-6">
                    <p className="text-sm text-indigo-700 dark:text-orange-400">
                      <strong>Note:</strong> Projects added here are saved to your browser's local storage. They are perfect for testing and quick updates.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slate-600 dark:text-neutral-400">Project Title</label>
                    <input required name="title" value={formData.title} onChange={handleChange} type="text" className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-orange-500 transition-all placeholder-slate-400 dark:placeholder-neutral-600" placeholder="e.g., E-Commerce Dashboard" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slate-600 dark:text-neutral-400">Description</label>
                    <textarea required name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-orange-500 transition-all resize-none placeholder-slate-400 dark:placeholder-neutral-600" placeholder="Briefly describe what you built..."></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slate-600 dark:text-neutral-400">Tech Stack (comma separated)</label>
                    <input required name="techStack" value={formData.techStack} onChange={handleChange} type="text" className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-orange-500 transition-all placeholder-slate-400 dark:placeholder-neutral-600" placeholder="e.g., React, Tailwind, MongoDB" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slate-600 dark:text-neutral-400">Live Link (Optional)</label>
                    <input name="link" value={formData.link} onChange={handleChange} type="url" className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-orange-500 transition-all placeholder-slate-400 dark:placeholder-neutral-600" placeholder="https://" />
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-neutral-800 transition-colors duration-300">
                    <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-2">
                      <Save size={18} /> Save Project to Portfolio
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdminProjectModal;
