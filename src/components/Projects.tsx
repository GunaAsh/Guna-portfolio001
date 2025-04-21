import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  problem: string;
  solution: string;
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "AI Visual Recognition System",
      description: "Computer vision application that identifies objects and people in real-time video feeds.",
      longDescription: "A comprehensive visual recognition system that leverages YOLOv8 and custom neural networks to identify objects, people, and activities in real-time video streams.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80",
      tags: ["Computer Vision", "YOLOv8", "PyTorch"],
      techStack: ["Python", "PyTorch", "YOLOv8", "OpenCV", "TensorFlow", "Flask"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com",
      problem: "Traditional surveillance systems require constant human monitoring, making them inefficient for large-scale deployments and prone to human error.",
      solution: "Implemented a custom YOLOv8 model fine-tuned on industry-specific data, achieving 97% accuracy. The system processes video feeds in real-time and sends alerts based on detected anomalies."
    },
    {
      id: 2,
      title: "Natural Language Financial Advisor",
      description: "AI-powered chatbot that provides personalized financial advice based on user data.",
      longDescription: "An intelligent virtual assistant that analyzes user financial data and market trends to provide actionable investment advice and financial planning recommendations.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80",
      tags: ["NLP", "Financial AI", "Machine Learning"],
      techStack: ["Python", "TensorFlow", "BERT", "Flask", "React", "PostgreSQL"],
      githubUrl: "https://github.com",
      problem: "Financial advice is often expensive and inaccessible to average consumers, while generic advice isn't tailored to individual circumstances.",
      solution: "Built a BERT-based NLP system that understands financial queries and generates personalized advice based on the user's financial profile, historical data, and market conditions."
    },
    {
      id: 3,
      title: "Predictive Healthcare Analytics",
      description: "Machine learning system that predicts patient outcomes based on medical history and symptoms.",
      longDescription: "A comprehensive healthcare analytics platform that uses patient data and medical research to predict health outcomes and suggest preventive measures.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
      tags: ["Healthcare", "Predictive Analytics", "ML"],
      techStack: ["Python", "TensorFlow", "scikit-learn", "Django", "React", "MongoDB"],
      githubUrl: "https://github.com",
      liveUrl: "https://demo.com",
      problem: "Healthcare providers struggle to identify high-risk patients early enough for preventive intervention, leading to poorer outcomes and higher costs.",
      solution: "Developed a predictive model that analyzes patient medical history, demographic data, and clinical parameters to identify high-risk individuals with 89% accuracy, enabling early intervention."
    },
    {
      id: 4,
      title: "Smart Energy Management System",
      description: "IoT platform that optimizes energy consumption in commercial buildings using AI.",
      longDescription: "An intelligent energy management system that integrates with IoT sensors to monitor and optimize energy usage in real-time across commercial and residential buildings.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80",
      tags: ["IoT", "Energy", "Reinforcement Learning"],
      techStack: ["Python", "TensorFlow", "Raspberry Pi", "MQTT", "React", "Time-series DB"],
      githubUrl: "https://github.com",
      problem: "Commercial buildings waste significant energy through inefficient HVAC and lighting operations that don't adapt to changing conditions or occupancy patterns.",
      solution: "Created a reinforcement learning system that continuously optimizes HVAC and lighting settings based on occupancy, external weather, and historical patterns, resulting in 23% energy savings."
    },
  ]);

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section id="projects" className="section-container">
      <h2 className="section-title text-center mb-16">
        Featured <span className="gradient-text">Projects</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="animate-scale-in" 
            style={{animationDelay: `${project.id * 100}ms`}}
          >
            <ProjectCard
              image={project.image}
              title={project.title}
              description={project.description}
              tags={project.tags}
              onClick={() => openProjectModal(project)}
            />
          </div>
        ))}
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${modalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}
        >
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeProjectModal}
          ></div>
          
          <div 
            className={`glass-card rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform ${modalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} transition-all duration-300`}
          >
            <div className="relative">
              <button 
                onClick={closeProjectModal}
                className="absolute right-4 top-4 z-10 bg-neurospark-dark/70 rounded-full p-2"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="h-60 overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-poppins font-semibold mb-2">
                  {selectedProject.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs px-2 py-1 rounded-full bg-neurospark-purple/20 text-neurospark-purple-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2 gradient-text">Problem</h4>
                  <p className="text-white/70">{selectedProject.problem}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2 gradient-text">Solution</h4>
                  <p className="text-white/70">{selectedProject.solution}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-3 py-1 rounded-full bg-neurospark-blue/30 text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={selectedProject.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-outline flex items-center gap-2 text-sm"
                  >
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    GitHub Repository
                  </a>
                  
                  {selectedProject.liveUrl && (
                    <a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary flex items-center gap-2 text-sm"
                    >
                      <svg 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
