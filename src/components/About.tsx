import React from 'react';
import { Calendar, Code, Briefcase, GraduationCap, Download } from 'lucide-react';

const About = () => {
  // Tech stack items
  const techStack = [
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
  ];

  // Timeline items
  const timelineItems = [
    {
      year: '2023 - Present',
      title: 'Founder & AI Consultant',
      company: 'NeuroSpark',
      description: 'Leading AI consulting firm specializing in computer vision and natural language processing solutions.',
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      year: '2021 - 2023',
      title: 'Senior Machine Learning Engineer',
      company: 'Tech Innovators Inc.',
      description: 'Led multiple AI initiatives, developed predictive models, and implemented computer vision solutions.',
      icon: <Code className="h-5 w-5" />,
    },
    {
      year: '2019 - 2021',
      title: 'Data Scientist',
      company: 'DataWave Analytics',
      description: 'Built machine learning models for predictive analytics and natural language processing applications.',
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      year: '2018',
      title: 'MSc in Artificial Intelligence',
      company: 'Tech University',
      description: 'Graduate studies focused on deep learning, computer vision, and reinforcement learning.',
      icon: <GraduationCap className="h-5 w-5" />,
    },
  ];

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
              I'm a passionate AI/ML Developer and Freelance Project Consultant with expertise in building innovative solutions 
              for complex problems. With over 5 years of experience in machine learning, computer vision, and natural language processing,
              I specialize in turning data into actionable insights and intelligent applications.
            </p>
            
            <p className="text-white/80 mb-8">
              As the founder of NeuroSpark, I work with clients ranging from startups to enterprises, 
              helping them leverage artificial intelligence to gain competitive advantages. My approach combines 
              technical expertise with a deep understanding of business needs to create scalable, effective solutions.
            </p>
            
            <div className="flex items-center mb-8">
              <a 
                href="#" 
                className="btn-primary flex items-center gap-2 group"
                onClick={(e) => {
                  e.preventDefault();
                  // Here you would typically fetch and download the resume
                  console.log('Downloading resume...');
                }}
              >
                <Download className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
                Download Resume
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
                key={index} 
                className={`mb-10 relative ${index === 0 ? 'animate-fade-in' : ''}`}
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="absolute -left-[31px] bg-neurospark-dark p-1 border-2 border-neurospark-purple rounded-full">
                  {item.icon}
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
