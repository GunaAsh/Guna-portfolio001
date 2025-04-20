
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  twitter: string;
}

const AdminContact = () => {
  const { toast } = useToast();
  
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: 'contact@neurospark.ai',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/neurospark',
    github: 'https://github.com/neurospark',
    twitter: 'https://twitter.com/neurospark',
  });
  
  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo({...contactInfo, [field]: value});
  };
  
  const handleSave = () => {
    // In a real app, you'd save this to a database or API
    toast({
      title: "Contact Information Updated",
      description: "Your contact details have been successfully saved",
    });
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Contact Information</h1>
        <p className="text-white/70">Edit your contact details and social media links</p>
      </div>
      
      <div className="glass-card p-6 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-medium text-white mb-4">Basic Contact</h3>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-white/70 mb-1 text-sm">
                  <Mail size={14} />
                  Email Address
                </label>
                <input 
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                />
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-white/70 mb-1 text-sm">
                  <Phone size={14} />
                  Phone Number
                </label>
                <input 
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                />
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-white/70 mb-1 text-sm">
                  <MapPin size={14} />
                  Location
                </label>
                <input 
                  type="text"
                  value={contactInfo.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Country"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium text-white mb-4">Social Media</h3>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-white/70 mb-1 text-sm">
                  <Linkedin size={14} />
                  LinkedIn URL
                </label>
                <input 
                  type="url"
                  value={contactInfo.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                />
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-white/70 mb-1 text-sm">
                  <Github size={14} />
                  GitHub URL
                </label>
                <input 
                  type="url"
                  value={contactInfo.github}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                />
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-white/70 mb-1 text-sm">
                  <Twitter size={14} />
                  Twitter URL
                </label>
                <input 
                  type="url"
                  value={contactInfo.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/username"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSave}
            className="btn-primary flex items-center gap-2"
          >
            <Save size={16} />
            Save Contact Info
          </button>
        </div>
      </div>
      
      <div className="mt-8 p-6 glass-card rounded-xl">
        <h3 className="text-xl font-medium text-white mb-4">Contact Form Settings</h3>
        
        <div className="mb-4">
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              className="rounded text-neurospark-purple"
              defaultChecked 
            />
            <span className="text-white/70">Email me when someone submits the contact form</span>
          </label>
        </div>
        
        <div className="mb-4">
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              className="rounded text-neurospark-purple"
              defaultChecked 
            />
            <span className="text-white/70">Show form on contact page</span>
          </label>
        </div>
        
        <div>
          <label className="block text-white/70 mb-1 text-sm">Auto-Response Message</label>
          <textarea 
            className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
            defaultValue="Thank you for contacting me. I'll get back to you as soon as possible!"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminContact;
