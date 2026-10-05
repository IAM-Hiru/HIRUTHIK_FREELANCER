import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ExternalLink, Code } from 'lucide-react';
import { projects as initialProjects } from '../data/portfolioData';
import SectionHeading from '../components/SectionHeading';
import Badge from '../components/Badge';

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);

  // Load projects from localStorage (Added via secret admin)
  const loadProjects = () => {
    try {
      const savedProjects = localStorage.getItem('freelance_projects');
      if (savedProjects) {
        const parsedProjects = JSON.parse(savedProjects);
        if (Array.isArray(parsedProjects) && parsedProjects.length > 0) {
          const savedIds = new Set(parsedProjects.map(p => p.id));
          const filteredInitial = initialProjects.filter(p => !savedIds.has(p.id));
          setProjects([...parsedProjects, ...filteredInitial]);
          return;
        }
      }
      setProjects(initialProjects);
    } catch (e) {
      console.error("Error loading projects:", e);
      setProjects(initialProjects);
    }
  };

  useEffect(() => {
    loadProjects();
    
    // Listen for custom event when a new project is added
    const handleProjectAdded = () => loadProjects();
    window.addEventListener('projectAdded', handleProjectAdded);
    
    return () => window.removeEventListener('projectAdded', handleProjectAdded);
  }, []);

  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeading 
        title="Recent Client Work" 
        subtitle="A selection of my recently delivered freelance projects."
        className="text-center"
      />
      
      {projects.length === 0 ? (
        <div className="mt-12 text-center py-16 px-4 glass-card max-w-lg mx-auto rounded-2xl border border-dashed border-slate-300 dark:border-neutral-800">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 dark:bg-orange-500/10 flex items-center justify-center text-2xl">
            🚀
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-neutral-200 mb-2">Projects Coming Soon</h3>
          <p className="text-sm text-slate-500 dark:text-neutral-400">Client showcase projects will be updated shortly. Stay tuned!</p>
        </div>
      ) : (
        <div className="flex overflow-x-auto gap-8 mt-12 pb-8 snap-x snap-mandatory hide-scrollbar md:justify-center">
          {projects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-none w-[85vw] sm:w-[45vw] lg:w-[30vw] max-w-[400px] snap-center"
            >
              <Tilt className="h-full" tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} transitionSpeed={2000} glareEnable={true} glareMaxOpacity={0.05} glareColor="#f97316" glarePosition="all">
                <div className="glass-card flex flex-col h-full overflow-hidden hover:shadow-[0_15px_30px_rgba(79,70,229,0.15)] dark:hover:shadow-[0_15px_40px_rgba(249,115,22,0.2)] transition-shadow duration-300">
                  
                  {/* Project Image Placeholder / Visual */}
                  <div className="h-48 bg-gradient-to-br from-indigo-100 to-rose-50 dark:from-neutral-900 dark:to-neutral-950 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-center relative group overflow-hidden">
                    <div className="absolute inset-0 bg-indigo-600/10 dark:bg-orange-500/10 group-hover:bg-indigo-600/20 dark:group-hover:bg-orange-500/20 transition-colors duration-300 z-10"></div>
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <Code size={48} className="text-indigo-300 dark:text-neutral-700 transform group-hover:scale-110 transition-transform duration-500 z-0" />
                    )}
                    
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="absolute bottom-4 right-4 z-20 bg-white dark:bg-neutral-800 p-2 rounded-full shadow-lg text-indigo-600 dark:text-orange-500 hover:scale-110 transition-transform">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow relative">
                    <div className="transform translate-z-20">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                      <p className="text-slate-600 dark:text-neutral-400 text-sm mb-6 flex-grow">{project.description}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-auto transform translate-z-10">
                      {project.techStack?.map(tech => (
                        <Badge key={tech} className="text-xs py-1 px-2">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
