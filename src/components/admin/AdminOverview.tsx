
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, User, Briefcase, Mail } from 'lucide-react';

const AdminOverview = () => {
  const navigate = useNavigate();
  
  const adminSections = [
    {
      title: "Projects",
      description: "Add, edit, or delete your portfolio projects",
      icon: <FileText className="h-8 w-8" />,
      path: "/admin/dashboard/projects",
      count: 4,
    },
    {
      title: "About",
      description: "Update your bio, tech skills, and personal information",
      icon: <User className="h-8 w-8" />,
      path: "/admin/dashboard/about",
      count: 1,
    },
    {
      title: "Experience",
      description: "Manage your work experience and education timeline",
      icon: <Briefcase className="h-8 w-8" />,
      path: "/admin/dashboard/experience",
      count: 4,
    },
    {
      title: "Contact",
      description: "Edit your contact information and social links",
      icon: <Mail className="h-8 w-8" />,
      path: "/admin/dashboard/contact",
      count: 1,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-white/70">Welcome to the NeuroSpark portfolio admin panel</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminSections.map((section, index) => (
          <div 
            key={index}
            onClick={() => navigate(section.path)}
            className="glass-card p-6 rounded-xl cursor-pointer hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-neurospark-purple/20 rounded-lg text-neurospark-purple-light">
                {section.icon}
              </div>
              <div className="bg-white/10 px-3 py-1 rounded-full text-sm text-white/70">
                {section.count} {section.count === 1 ? 'item' : 'items'}
              </div>
            </div>
            
            <h3 className="text-xl font-medium text-white mb-1">{section.title}</h3>
            <p className="text-sm text-white/70">{section.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-10 p-6 glass-card rounded-xl">
        <h3 className="text-xl font-medium text-white mb-4">Quick Access</h3>
        <div className="flex flex-wrap gap-3">
          <a 
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm"
          >
            View Live Site
          </a>
          <button className="btn-outline text-sm">
            Clear Cache
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
