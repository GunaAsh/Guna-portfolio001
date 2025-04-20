import React, { useState } from 'react';
import { Mail, MapPin, Phone, Linkedin, Github, Twitter } from 'lucide-react';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };
  return <section id="contact" className="section-container">
      <h2 className="section-title text-center">
        Get In <span className="gradient-text">Touch</span>
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div className="flex-1">
          <p className="text-white/70 mb-8 text-lg">
            Interested in working together or have a project in mind? 
            Feel free to reach out. I'm always open to discussing new 
            opportunities and challenges in the AI/ML space.
          </p>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="p-3 glass-card rounded-full">
                <Mail className="h-5 w-5 text-neurospark-purple-light" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <a href="mailto:[yourname]@gmail.com" className="text-white/70 hover:text-white transition-colors">gunayow@gmail.com</a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 glass-card rounded-full">
                <MapPin className="h-5 w-5 text-neurospark-purple-light" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Location</h3>
                <p className="text-white/70">Pondicherry, IN</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 glass-card rounded-full">
                <Phone className="h-5 w-5 text-neurospark-purple-light" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Phone</h3>
                <a href="tel:+1234567890" className="text-white/70 hover:text-white transition-colors">+91 9597569821</a>
              </div>
            </div>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 glass-card rounded-full hover:bg-neurospark-purple/20 transition-colors" aria-label="LinkedIn Profile">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 glass-card rounded-full hover:bg-neurospark-purple/20 transition-colors" aria-label="GitHub Profile">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 glass-card rounded-full hover:bg-neurospark-purple/20 transition-colors" aria-label="Twitter Profile">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="glass-card p-6 rounded-xl">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required disabled={formStatus === 'submitting'} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                focus:border-neurospark-purple focus:outline-none focus:ring-1 focus:ring-neurospark-purple
                text-white placeholder-white/30" placeholder="Your name" />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required disabled={formStatus === 'submitting'} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                focus:border-neurospark-purple focus:outline-none focus:ring-1 focus:ring-neurospark-purple
                text-white placeholder-white/30" placeholder="your.email@example.com" />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required disabled={formStatus === 'submitting'} rows={5} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                focus:border-neurospark-purple focus:outline-none focus:ring-1 focus:ring-neurospark-purple
                text-white placeholder-white/30 resize-none" placeholder="Tell me about your project or inquiry..."></textarea>
            </div>
            
            <button type="submit" disabled={formStatus === 'submitting' || formStatus === 'success'} className={`w-full btn-primary flex items-center justify-center gap-2
              ${formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}
              ${formStatus === 'success' ? 'bg-green-600 hover:bg-green-700' : ''}`}>
              {formStatus === 'submitting' ? <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </> : formStatus === 'success' ? <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Message Sent!
                </> : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>;
};
export default Contact;