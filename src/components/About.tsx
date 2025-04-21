
import React, { useState, useEffect } from 'react';
import { Calendar, Code, Briefcase, GraduationCap, Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface TechItem {
  name: string;
  icon: string;
}

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  icon: 'briefcase' | 'code' | 'calendar' | 'graduation';
}

const About = () => {
  // State for bio, tech stack, and timeline items
  const [bio, setBio] = useState<string>(
    "I'm a passionate AI/ML Developer and Freelance Project Consultant with expertise in building innovative solutions for complex problems. With over 5 years of experience in machine learning, computer vision, and natural language processing, I specialize in turning data into actionable insights and intelligent applications.\n\nAs the founder of NeuroSpark, I work with clients ranging from startups to enterprises, helping them leverage artificial intelligence to gain competitive advantages. My approach combines technical expertise with a deep understanding of business needs to create scalable, effective solutions."
  );
  
  const [techStack, setTechStack] = useState<TechItem[]>([
    { name: 'Python', icon: '🐍' },
    { name: 'TensorFlow', icon: '🧠' },
    { name: 'PyTorch', icon: '🔥' },
    { name: 'OpenCV', icon: '👁️' },
    { name: 'Flask', icon: '🌐' },
    { name: 'React', icon: '⚛️' },
    { name: 'YOLOv8', icon: '📷' },
    { name: 'Docker', icon: '🐳' },
    { name: 'AWS', icon: '☁️' },
    { name: 'MongoDB', icon: '🍃' },
  ]);
  
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    {
      id: 1,
      year: '2023 - Present',
      title: 'Founder & AI Consultant',
      company: 'NeuroSpark',
      description: 'Leading AI consulting firm specializing in computer vision and natural language processing solutions.',
      icon: 'briefcase',
    },
    {
      id: 2,
      year: '2021 - 2023',
      title: 'Senior Machine Learning Engineer',
      company: 'Tech Innovators Inc.',
      description: 'Led multiple AI initiatives, developed predictive models, and implemented computer vision solutions.',
      icon: 'code',
    },
    {
      id: 3,
      year: '2019 - 2021',
      title: 'Data Scientist',
      company: 'DataWave Analytics',
      description: 'Built machine learning models for predictive analytics and natural language processing applications.',
      icon: 'calendar',
    },
    {
      id: 4,
      year: '2018',
      title: 'MSc in Artificial Intelligence',
      company: 'Tech University',
      description: 'Graduate studies focused on deep learning, computer vision, and reinforcement learning.',
      icon: 'graduation',
    },
  ]);
  
  // Resume state
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [resumeLastUpdated, setResumeLastUpdated] = useState<string | null>(null);
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    // Load bio
    const savedBio = localStorage.getItem('aboutBio');
    if (savedBio) {
      setBio(savedBio);
    }
    
    // Load tech stack
    const savedTechStack = localStorage.getItem('aboutTechStack');
    if (savedTechStack) {
      setTechStack(JSON.parse(savedTechStack));
    }
    
    // Load timeline items
    const savedTimelineItems = localStorage.getItem('experienceItems');
    if (savedTimelineItems) {
      setTimelineItems(JSON.parse(savedTimelineItems));
    }
    
    // Load resume info
    const savedResumeName = localStorage.getItem('resumeName');
    if (savedResumeName) {
      setResumeName(savedResumeName);
      const lastUpdated = localStorage.getItem('resumeLastUpdated');
      if (lastUpdated) {
        setResumeLastUpdated(lastUpdated);
      }
    }
  }, []);
  
  // Render icon based on type for timeline items
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'briefcase':
        return <Briefcase className="h-5 w-5" />;
      case 'code':
        return <Code className="h-5 w-5" />;
      case 'calendar':
        return <Calendar className="h-5 w-5" />;
      case 'graduation':
        return <GraduationCap className="h-5 w-5" />;
      default:
        return <Briefcase className="h-5 w-5" />;
    }
  };
  
  const handleDownloadResume = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if resume exists
    if (!resumeName) {
      e.preventDefault();
      toast({
        title: "No resume available",
        description: "No resume has been uploaded yet.",
        variant: "destructive",
      });
      return;
    }
    
    console.log('Downloading resume:', resumeName);
    
    // In a real application, we would have a server endpoint to download the file
    // For now, we'll simulate a download by creating a blob
    const dummyContent = "This is a simulated resume download. In a real application, this would download the actual resume file.";
    const blob = new Blob([dummyContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = resumeName;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    
    toast({
      title: "Resume download started",
      description: `Downloading ${resumeName}...`,
    });
  };

  return (
    <section id="about" className="section-container">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* Left side - About text */}
        <div className="flex-1">
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-white/80 mb-6">
              {bio.split('\n\n')[0]}
            </p>
            
            {bio.split('\n\n')[1] && (
              <p className="text-white/80 mb-8">
                {bio.split('\n\n')[1]}
              </p>
            )}
            
            <div className="flex items-center mb-8">
              <a 
                href="#" 
                className={`btn-primary flex items-center gap-2 group ${!resumeName ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleDownloadResume}
              >
                <Download className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
                {resumeName ? 'Download Resume' : 'Resume Not Available'}
              </a>
            </div>
          </div>
          
          {/* Tech stack */}
          <div>
            <h3 className="text-xl font-poppins font-medium mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <div 
                  key={index}
                  className="glass-card px-3 py-2 rounded-lg flex items-center gap-2 floating-card"
                >
                  <span className="text-lg">{tech.icon}</span>
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right side - Timeline */}
        <div className="flex-1">
          <h3 className="text-2xl font-poppins font-medium mb-6 gradient-text">Experience</h3>
          
          <div className="relative border-l border-neurospark-purple/30 pl-6 ml-3">
            {timelineItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`mb-10 relative ${index === 0 ? 'animate-fade-in' : ''}`}
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="absolute -left-[31px] bg-neurospark-dark p-1 border-2 border-neurospark-purple rounded-full">
                  {renderIcon(item.icon)}
                </div>
                
                <span className="text-sm text-neurospark-purple-light mb-1 block">
                  {item.year}
                </span>
                
                <h4 className="text-lg font-medium mb-1">
                  {item.title} • <span className="text-white/70">{item.company}</span>
                </h4>
                
                <p className="text-white/60 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
