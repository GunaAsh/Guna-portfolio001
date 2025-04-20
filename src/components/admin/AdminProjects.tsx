import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, ExternalLink, Github, Save, X 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

const AdminProjects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [formValues, setFormValues] = useState<Project>({
    id: 0,
    title: "",
    description: "",
    longDescription: "",
    image: "",
    tags: [],
    techStack: [],
    githubUrl: "",
    liveUrl: "",
    problem: "",
    solution: ""
  });

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Set default projects if none in localStorage
      const defaultProjects = [
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
      ];
      setProjects(defaultProjects);
    }
  }, []);

  // Edit project
  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setFormValues({...project});
    setIsEditing(true);
    setIsAdding(false);
  };

  // Delete project
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projects.filter(project => project.id !== id);
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      
      toast({
        title: "Project Deleted",
        description: "The project has been successfully deleted",
      });
    }
  };

  // Add new project
  const handleAdd = () => {
    setIsAdding(true);
    setIsEditing(false);
    setCurrentProject(null);
    setFormValues({
      id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
      title: "",
      description: "",
      longDescription: "",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80",
      tags: [],
      techStack: [],
      githubUrl: "",
      liveUrl: "",
      problem: "",
      solution: ""
    });
  };

  // Save project
  const handleSave = () => {
    if (!formValues.title || !formValues.description) {
      toast({
        title: "Error",
        description: "Title and description are required",
        variant: "destructive",
      });
      return;
    }

    let updatedProjects: Project[];
    
    if (isEditing && currentProject) {
      // Update existing project
      updatedProjects = projects.map(p => p.id === currentProject.id ? formValues : p);
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      
      toast({
        title: "Project Updated",
        description: "The project has been successfully updated",
      });
    } else if (isAdding) {
      // Add new project
      updatedProjects = [...projects, formValues];
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      
      toast({
        title: "Project Added",
        description: "The new project has been successfully added",
      });
    }

    setIsEditing(false);
    setIsAdding(false);
    setCurrentProject(null);
  };

  // Handle input changes
  const handleInputChange = (field: keyof Project, value: any) => {
    setFormValues({...formValues, [field]: value});
  };

  // Handle array inputs (tags, techStack)
  const handleArrayInput = (field: 'tags' | 'techStack', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormValues({...formValues, [field]: items});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
    setCurrentProject(null);
  };

  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-white/70">Manage your portfolio projects</p>
        </div>
        <button 
          onClick={handleAdd}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>
      
      {(isEditing || isAdding) ? (
        <div className="glass-card p-6 rounded-xl mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium text-white">
              {isAdding ? 'Add New Project' : 'Edit Project'}
            </h2>
            <button 
              onClick={handleCancel}
              className="text-white/70 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 mb-1 text-sm">Title</label>
                <Input 
                  value={formValues.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Project Title"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-1 text-sm">Short Description</label>
                <Input 
                  value={formValues.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Short description for project card"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-1 text-sm">Image URL</label>
                <Input 
                  value={formValues.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-1 text-sm">Tags (comma separated)</label>
                <Input 
                  value={formValues.tags.join(', ')}
                  onChange={(e) => handleArrayInput('tags', e.target.value)}
                  placeholder="AI, Machine Learning, Computer Vision"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-1 text-sm">Tech Stack (comma separated)</label>
                <Input 
                  value={formValues.techStack.join(', ')}
                  onChange={(e) => handleArrayInput('techStack', e.target.value)}
                  placeholder="Python, TensorFlow, React"
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 mb-1 text-sm">GitHub URL</label>
                <Input 
                  value={formValues.githubUrl}
                  onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                  placeholder="https://github.com/yourusername/repo"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-1 text-sm">Live Demo URL (optional)</label>
                <Input 
                  value={formValues.liveUrl || ''}
                  onChange={(e) => handleInputChange('liveUrl', e.target.value)}
                  placeholder="https://demo.com"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-1 text-sm">Problem Statement</label>
                <textarea 
                  value={formValues.problem}
                  onChange={(e) => handleInputChange('problem', e.target.value)}
                  placeholder="Describe the problem this project solves"
                  className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-1 text-sm">Solution</label>
                <textarea 
                  value={formValues.solution}
                  onChange={(e) => handleInputChange('solution', e.target.value)}
                  placeholder="Describe how your project solves the problem"
                  className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end gap-3">
            <button 
              onClick={handleCancel}
              className="btn-outline"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="btn-primary flex items-center gap-2"
            >
              <Save size={16} />
              Save Project
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map(project => (
            <div 
              key={project.id} 
              className="glass-card p-4 rounded-xl flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="w-full md:w-40 h-24 rounded-lg overflow-hidden shrink-0">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white mb-1">{project.title}</h3>
                <p className="text-white/70 text-sm mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-2 py-1 rounded-full bg-neurospark-purple/20 text-neurospark-purple-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleEdit(project)}
                  className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
                  title="Edit Project"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="p-2 hover:bg-red-500/10 rounded-lg text-white/70 hover:text-red-400 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 size={18} />
                </button>
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
                    title="View on GitHub"
                  >
                    <Github size={18} />
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
                    title="View Live Demo"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Custom Input component to match the theme
const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
      {...props}
    />
  );
};

export default AdminProjects;
