import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Save, ArrowLeft, CheckCircle, Trash2, Eye, EyeOff, Shield, Edit2, Upload, X as XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Badge from '../components/Badge';

// Simple admin password - you can change this
const ADMIN_PASSWORD = 'AD@hiru28';

const AddProjectPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [savedProjects, setSavedProjects] = useState(() => {
    return JSON.parse(localStorage.getItem('freelance_projects') || '[]');
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    link: '',
    imageUrl: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack ? project.techStack.join(', ') : '',
      link: project.link || '',
      imageUrl: project.imageUrl || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const techArray = formData.techStack.split(',').map(item => item.trim()).filter(Boolean);
    const existingProjects = JSON.parse(localStorage.getItem('freelance_projects') || '[]');
    let updatedProjects;

    if (editingId) {
      updatedProjects = existingProjects.map(p => 
        p.id === editingId ? { ...p, title: formData.title, description: formData.description, techStack: techArray, link: formData.link, imageUrl: formData.imageUrl } : p
      );
    } else {
      const newProject = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        techStack: techArray,
        link: formData.link,
        imageUrl: formData.imageUrl
      };
      updatedProjects = [newProject, ...existingProjects];
    }
    
    localStorage.setItem('freelance_projects', JSON.stringify(updatedProjects));
    window.dispatchEvent(new Event('projectAdded'));
    setSavedProjects(updatedProjects);

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setFormData({ title: '', description: '', techStack: '', link: '', imageUrl: '' });
      setEditingId(null);
    }, 2000);
  };

  const handleDelete = (id) => {
    const updated = savedProjects.filter(p => p.id !== id);
    localStorage.setItem('freelance_projects', JSON.stringify(updated));
    window.dispatchEvent(new Event('projectAdded'));
    setSavedProjects(updated);
  };

  // --- Login Screen ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-950/40 via-neutral-950 to-neutral-950" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
          className="relative w-full max-w-md"
        >
          <div className="bg-neutral-900 border-2 border-orange-500/30 rounded-2xl p-8 shadow-[0_0_60px_rgba(249,115,22,0.2)]">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-orange-500/10 border-2 border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={36} className="text-orange-500" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
              <p className="text-neutral-400 text-sm">Enter the admin password to manage your portfolio projects.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-neutral-400">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder-neutral-600"
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <AnimatePresence>
                  {passwordError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-xs mt-1"
                    >
                      {passwordError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold py-3 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2 mt-6"
              >
                <Lock size={18} /> Unlock Admin Panel
              </button>
            </form>

            <button
              onClick={() => navigate('/')}
              className="w-full mt-4 flex items-center justify-center gap-2 text-neutral-500 hover:text-neutral-300 transition-colors text-sm py-2"
            >
              <ArrowLeft size={16} /> Back to Portfolio
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- Admin Panel ---
  return (
    <div className="min-h-screen bg-neutral-950 text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-950/30 via-neutral-950 to-neutral-950" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
              <Lock size={20} className="text-orange-500" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Admin Panel</h1>
              <p className="text-xs text-neutral-400">Manage Portfolio Projects</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-lg text-sm"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Add Project Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-neutral-900 border border-orange-500/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(249,115,22,0.1)]">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-orange-500">✦</span> {editingId ? 'Edit Project' : 'Add New Project'}
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', description: '', techStack: '', link: '', imageUrl: '' }); }} className="ml-auto text-sm text-neutral-400 hover:text-white bg-neutral-800 px-3 py-1 rounded-lg">Cancel Edit</button>
                )}
              </h2>

              <AnimatePresence mode="wait">
                {isSaved ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{editingId ? 'Project Updated!' : 'Project Added!'}</h3>
                    <p className="text-neutral-400">It's now live in your portfolio. 🎉</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <label className="text-sm text-neutral-400">Project Title *</label>
                      <input
                        required
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        type="text"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder-neutral-600"
                        placeholder="e.g., E-Commerce Dashboard"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-neutral-400">Description *</label>
                      <textarea
                        required
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none placeholder-neutral-600"
                        placeholder="Briefly describe what you built..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-neutral-400">Tech Stack <span className="text-neutral-600">(comma separated)</span></label>
                      <input
                        required
                        name="techStack"
                        value={formData.techStack}
                        onChange={handleChange}
                        type="text"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder-neutral-600"
                        placeholder="e.g., React, Tailwind, MongoDB"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-neutral-400">Live Link <span className="text-neutral-600">(optional)</span></label>
                      <input
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        type="url"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder-neutral-600"
                        placeholder="https://"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-neutral-400">Project Image <span className="text-neutral-600">(optional)</span></label>
                      <div className="flex items-center gap-4">
                        {formData.imageUrl ? (
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-neutral-700 group flex-shrink-0">
                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <button type="button" onClick={() => setFormData({...formData, imageUrl: ''})} className="text-red-400 hover:text-red-300 bg-neutral-900/80 p-2 rounded-full">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-neutral-700 border-dashed rounded-lg cursor-pointer bg-neutral-950 hover:bg-neutral-900 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-2">
                              <Upload size={24} className="text-neutral-500 mb-2" />
                              <p className="text-xs text-neutral-500">Click to upload image</p>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                          </label>
                        )}
                        {formData.imageUrl && (
                          <label className="flex-1 flex flex-col items-center justify-center h-24 border-2 border-neutral-700 border-dashed rounded-lg cursor-pointer bg-neutral-950 hover:bg-neutral-900 transition-colors">
                             <div className="flex flex-col items-center justify-center">
                              <Upload size={20} className="text-neutral-500 mb-1" />
                              <p className="text-xs text-neutral-500">Change Image</p>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                          </label>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold py-3 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(249,115,22,0.3)] flex items-center justify-center gap-2 mt-2"
                    >
                      <Save size={18} /> {editingId ? 'Update Project' : 'Save Project to Portfolio'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Saved Projects List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-orange-500">◈</span> Saved Projects
                <span className="ml-auto text-sm font-normal text-neutral-400 bg-neutral-800 px-3 py-1 rounded-full">
                  {savedProjects.length} project{savedProjects.length !== 1 ? 's' : ''}
                </span>
              </h2>

              {savedProjects.length === 0 ? (
                <div className="text-center py-12 text-neutral-600">
                  <div className="text-5xl mb-3">📂</div>
                  <p>No projects saved yet.</p>
                  <p className="text-sm mt-1">Add your first project using the form.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  <AnimatePresence>
                    {savedProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 group hover:border-orange-500/30 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-white truncate">{project.title}</h3>
                            <p className="text-neutral-500 text-xs mt-1 line-clamp-2">{project.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {project.techStack?.map(tech => (
                                <span key={tech} className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full">
                                  {tech}
                                </span>
                              ))}
                            </div>
                            {project.link && (
                              <a href={project.link} target="_blank" rel="noreferrer" className="text-xs text-orange-400 hover:text-orange-300 mt-2 inline-block truncate max-w-full">
                                🔗 {project.link}
                              </a>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(project)}
                              className="text-neutral-500 hover:text-blue-400 transition-colors p-1 flex-shrink-0"
                              title="Edit project"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="text-neutral-500 hover:text-red-400 transition-colors p-1 flex-shrink-0"
                              title="Delete project"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AddProjectPage;
