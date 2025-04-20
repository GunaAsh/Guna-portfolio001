
import React, { useState } from 'react';
import { Calendar, Code, Briefcase, GraduationCap, Edit, Trash2, Save, X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  icon: 'briefcase' | 'code' | 'calendar' | 'graduation';
}

const AdminExperience = () => {
  const { toast } = useToast();
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

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentItem, setCurrentItem] = useState<TimelineItem | null>(null);
  const [formValues, setFormValues] = useState<TimelineItem>({
    id: 0,
    year: '',
    title: '',
    company: '',
    description: '',
    icon: 'briefcase'
  });

  // Edit timeline item
  const handleEdit = (item: TimelineItem) => {
    setCurrentItem(item);
    setFormValues({...item});
    setIsEditing(true);
    setIsAdding(false);
  };

  // Delete timeline item
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this experience item?")) {
      setTimelineItems(timelineItems.filter(item => item.id !== id));
      toast({
        title: "Item Deleted",
        description: "The experience item has been successfully deleted",
      });
    }
  };

  // Add new timeline item
  const handleAdd = () => {
    setIsAdding(true);
    setIsEditing(false);
    setCurrentItem(null);
    setFormValues({
      id: timelineItems.length > 0 ? Math.max(...timelineItems.map(item => item.id)) + 1 : 1,
      year: '',
      title: '',
      company: '',
      description: '',
      icon: 'briefcase'
    });
  };

  // Save timeline item
  const handleSave = () => {
    if (!formValues.year || !formValues.title || !formValues.company) {
      toast({
        title: "Error",
        description: "Year, title, and company are required",
        variant: "destructive",
      });
      return;
    }

    if (isEditing && currentItem) {
      // Update existing item
      setTimelineItems(timelineItems.map(item => item.id === currentItem.id ? formValues : item));
      toast({
        title: "Experience Updated",
        description: "The experience item has been successfully updated",
      });
    } else if (isAdding) {
      // Add new item
      setTimelineItems([...timelineItems, formValues]);
      toast({
        title: "Experience Added",
        description: "The new experience item has been successfully added",
      });
    }

    setIsEditing(false);
    setIsAdding(false);
    setCurrentItem(null);
  };

  // Handle input changes
  const handleInputChange = (field: keyof TimelineItem, value: any) => {
    setFormValues({...formValues, [field]: value});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
    setCurrentItem(null);
  };

  // Render icon based on type
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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Experience</h1>
          <p className="text-white/70">Manage your work experience and education</p>
        </div>
        <button 
          onClick={handleAdd}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>
      
      {(isEditing || isAdding) ? (
        <div className="glass-card p-6 rounded-xl mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium text-white">
              {isAdding ? 'Add New Experience' : 'Edit Experience'}
            </h2>
            <button 
              onClick={handleCancel}
              className="text-white/70 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/70 mb-1 text-sm">Year Range</label>
              <input 
                type="text"
                value={formValues.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                placeholder="e.g. 2021 - Present"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm mb-4"
              />
              
              <label className="block text-white/70 mb-1 text-sm">Title</label>
              <input 
                type="text"
                value={formValues.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g. Senior Developer"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm mb-4"
              />
              
              <label className="block text-white/70 mb-1 text-sm">Company/Institution</label>
              <input 
                type="text"
                value={formValues.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="e.g. Google"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-white/70 mb-1 text-sm">Description</label>
              <textarea 
                value={formValues.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your role, achievements, etc."
                className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm mb-4"
              />
              
              <label className="block text-white/70 mb-1 text-sm">Icon</label>
              <select
                value={formValues.icon}
                onChange={(e) => handleInputChange('icon', e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
              >
                <option value="briefcase">Briefcase (Job)</option>
                <option value="code">Code (Technical Role)</option>
                <option value="calendar">Calendar (Project/Period)</option>
                <option value="graduation">Graduation Cap (Education)</option>
              </select>
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
              Save Experience
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {timelineItems.map(item => (
            <div 
              key={item.id} 
              className="glass-card p-4 rounded-xl flex items-center gap-4"
            >
              <div className="bg-neurospark-dark p-2 border-2 border-neurospark-purple rounded-full">
                {renderIcon(item.icon)}
              </div>
              
              <div className="flex-1">
                <span className="text-sm text-neurospark-purple-light block">
                  {item.year}
                </span>
                <h3 className="text-lg font-medium text-white">
                  {item.title} • <span className="text-white/70">{item.company}</span>
                </h3>
                <p className="text-white/60 text-sm">
                  {item.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEdit(item)}
                  className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
                  title="Edit Experience"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 hover:bg-red-500/10 rounded-lg text-white/70 hover:text-red-400 transition-colors"
                  title="Delete Experience"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminExperience;
