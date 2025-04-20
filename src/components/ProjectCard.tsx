
import React from 'react';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  tags: string[];
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  description,
  tags,
  onClick,
}) => {
  return (
    <div 
      className="glass-card rounded-xl overflow-hidden floating-card cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden h-48 w-full">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-poppins font-medium mb-2">{title}</h3>
        
        <p className="text-white/70 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded-full bg-neurospark-purple/20 text-neurospark-purple-light"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <button 
          className="text-sm text-neurospark-purple hover:text-neurospark-purple-light flex items-center gap-1"
        >
          Read More
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
