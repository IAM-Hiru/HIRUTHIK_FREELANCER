import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Smartphone } from 'lucide-react';
import Button from './Button';
import { personalInfo } from '../data/portfolioData';

const servicesOptions = [
  "Website Development", "Web Application", "MERN Application", "UI/UX Design", 
  "App Development", "Data Analytics", 
  "Poster Design", "Other"
];

const HireMeModal = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', whatsapp: '', service: '', description: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const [submitMethod, setSubmitMethod] = useState('whatsapp');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (submitMethod === 'whatsapp') {
      const message = `*New Freelance Inquiry!* 🚀\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*WhatsApp:* ${formData.whatsapp}\n\n*Service Required:* ${formData.service}\n*Description:* ${formData.description}`;

      const waNumber = personalInfo.socialLinks.whatsapp.split('/').pop();
      const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      const subject = `New Freelance Inquiry from ${formData.name}`;
      const body = `New Freelance Inquiry!\n\nName: ${formData.name}\nEmail: ${formData.email}\nWhatsApp: ${formData.whatsapp}\n\nService Required: ${formData.service}\nDescription: ${formData.description}`;
      
      const emailAddress = personalInfo.socialLinks.email.replace('mailto:', '');
      const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', whatsapp: '', service: '', description: '' });
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm transition-colors duration-300"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(249,115,22,0.15)] overflow-hidden max-h-[90vh] overflow-y-auto transition-colors duration-300"
          >
            <div className="sticky top-0 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-slate-100 dark:border-neutral-800 p-6 flex justify-between items-center z-10 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-indigo-600 dark:text-orange-500"><Smartphone size={24} /></span> Start a Project
              </h2>
              <button onClick={onClose} className="text-slate-400 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors bg-slate-100 dark:bg-neutral-800 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-neutral-700">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Almost there!</h3>
                  <p className="text-slate-600 dark:text-neutral-400">Your details have been copied. Please hit send on {submitMethod === 'whatsapp' ? 'WhatsApp' : 'your Email app'}.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-slate-600 dark:text-neutral-400">Name</label>
                      <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-orange-500 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-orange-500 transition-all placeholder-slate-400 dark:placeholder-neutral-600" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-slate-600 dark:text-neutral-400">Email</label>
                      <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-orange-500 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-orange-500 transition-all placeholder-slate-400 dark:placeholder-neutral-600" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-slate-600 dark:text-neutral-400">WhatsApp Number</label>
                      <input required name="whatsapp" value={formData.whatsapp} onChange={handleChange} type="tel" className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-orange-500 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-orange-500 transition-all placeholder-slate-400 dark:placeholder-neutral-600" placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-slate-600 dark:text-neutral-400">Service Required</label>
                      <select required name="service" value={formData.service} onChange={handleChange} className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-orange-500 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-orange-500 transition-all appearance-none">
                        <option value="">Select a service...</option>
                        {servicesOptions.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slate-600 dark:text-neutral-400">Project Description</label>
                    <textarea required name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-orange-500 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-orange-500 transition-all resize-none placeholder-slate-400 dark:placeholder-neutral-600" placeholder="Tell me about your project..."></textarea>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-neutral-800 transition-colors duration-300 grid grid-cols-2 gap-4">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      onClick={() => setSubmitMethod('whatsapp')}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Send size={18} /> Send via WhatsApp
                    </Button>
                    <Button 
                      type="submit" 
                      variant="outline" 
                      onClick={() => setSubmitMethod('email')}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      Send via Email
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

export default HireMeModal;
