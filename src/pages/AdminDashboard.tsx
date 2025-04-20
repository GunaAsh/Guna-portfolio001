
import React, { useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, User, Briefcase, LogOut, Mail } from 'lucide-react';

import AdminProjects from '../components/admin/AdminProjects';
import AdminAbout from '../components/admin/AdminAbout';
import AdminExperience from '../components/admin/AdminExperience';
import AdminContact from '../components/admin/AdminContact';
import AdminOverview from '../components/admin/AdminOverview';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      toast({
        title: "Unauthorized Access",
        description: "Please login to access the admin dashboard",
        variant: "destructive",
      });
      navigate('/admin/login');
    }
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-neurospark-dark flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-black/20 backdrop-blur-lg border-r border-white/10 p-4 hidden md:block">
        <div className="mb-8">
          <a href="/" className="text-xl font-poppins font-bold flex items-center mb-8">
            <span className="gradient-text">Neuro</span>
            <span className="text-white">Spark</span>
            <span className="ml-2 text-xs px-2 py-0.5 bg-neurospark-purple/20 text-neurospark-purple-light rounded-full">
              Admin
            </span>
          </a>
        </div>
        
        <nav className="space-y-1">
          <NavLink 
            to="/admin/dashboard" 
            end
            className={({isActive}) => 
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-neurospark-purple/20 text-neurospark-purple-light' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </NavLink>
          
          <NavLink 
            to="/admin/dashboard/projects" 
            className={({isActive}) => 
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-neurospark-purple/20 text-neurospark-purple-light' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <FileText size={18} />
            <span>Projects</span>
          </NavLink>
          
          <NavLink 
            to="/admin/dashboard/about" 
            className={({isActive}) => 
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-neurospark-purple/20 text-neurospark-purple-light' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <User size={18} />
            <span>About</span>
          </NavLink>
          
          <NavLink 
            to="/admin/dashboard/experience" 
            className={({isActive}) => 
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-neurospark-purple/20 text-neurospark-purple-light' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Briefcase size={18} />
            <span>Experience</span>
          </NavLink>
          
          <NavLink 
            to="/admin/dashboard/contact" 
            className={({isActive}) => 
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-neurospark-purple/20 text-neurospark-purple-light' 
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Mail size={18} />
            <span>Contact</span>
          </NavLink>
        </nav>
        
        <div className="absolute bottom-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-white/70 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Admin Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/projects" element={<AdminProjects />} />
          <Route path="/about" element={<AdminAbout />} />
          <Route path="/experience" element={<AdminExperience />} />
          <Route path="/contact" element={<AdminContact />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
