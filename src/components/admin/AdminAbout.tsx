
import React, { useState } from 'react';
import { Save, Plus, Trash2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TechItem {
  name: string;
  icon: string;
}

const AdminAbout = () => {
  const { toast } = useToast();
  
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
  
  const [newTechName, setNewTechName] = useState('');
  const [newTechIcon, setNewTechIcon] = useState('');
  const [showAddTech, setShowAddTech] = useState(false);
  
  const handleSaveBio = () => {
    toast({
      title: "Bio Updated",
      description: "Your bio has been successfully updated",
    });
  };
  
  const handleAddTech = () => {
    if (!newTechName || !newTechIcon) {
      toast({
        title: "Error",
        description: "Both name and icon are required",
        variant: "destructive",
      });
      return;
    }
    
    setTechStack([...techStack, { name: newTechName, icon: newTechIcon }]);
    setNewTechName('');
    setNewTechIcon('');
    setShowAddTech(false);
    
    toast({
      title: "Tech Added",
      description: `${newTechName} has been added to your tech stack`,
    });
  };
  
  const handleRemoveTech = (index: number) => {
    const updatedTechStack = [...techStack];
    updatedTechStack.splice(index, 1);
    setTechStack(updatedTechStack);
    
    toast({
      title: "Tech Removed",
      description: "The technology has been removed from your stack",
    });
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">About Me</h1>
        <p className="text-white/70">Edit your personal information and skills</p>
      </div>
      
      <div className="glass-card p-6 rounded-xl mb-8">
        <h2 className="text-xl font-medium text-white mb-4">Bio</h2>
        
        <div className="mb-6">
          <textarea 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full h-48 rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholder="Write about yourself, your expertise, and your professional background..."
          />
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={handleSaveBio}
            className="btn-primary flex items-center gap-2"
          >
            <Save size={16} />
            Save Bio
          </button>
        </div>
      </div>
      
      <div className="glass-card p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-white">Tech Stack</h2>
          {!showAddTech && (
            <button 
              onClick={() => setShowAddTech(true)}
              className="btn-outline flex items-center gap-2 text-sm"
            >
              <Plus size={16} />
              Add Tech
            </button>
          )}
        </div>
        
        {showAddTech && (
          <div className="glass-card bg-black/20 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-medium">Add New Technology</h3>
              <button 
                onClick={() => setShowAddTech(false)}
                className="text-white/70 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white/70 mb-1 text-sm">Name</label>
                <input 
                  type="text"
                  value={newTechName}
                  onChange={(e) => setNewTechName(e.target.value)}
                  placeholder="e.g. Python, React, etc."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-1 text-sm">Icon (Emoji)</label>
                <input 
                  type="text"
                  value={newTechIcon}
                  onChange={(e) => setNewTechIcon(e.target.value)}
                  placeholder="e.g. 🐍, ⚛️, etc."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={handleAddTech}
                className="btn-primary flex items-center gap-2 text-sm"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {techStack.map((tech, index) => (
            <div 
              key={index}
              className="glass-card p-3 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{tech.icon}</span>
                <span className="text-sm font-medium">{tech.name}</span>
              </div>
              
              <button 
                onClick={() => handleRemoveTech(index)}
                className="text-white/50 hover:text-red-400"
                title="Remove Technology"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
