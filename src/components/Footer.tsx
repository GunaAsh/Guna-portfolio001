
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <a href="#home" className="text-xl font-poppins font-bold">
              <span className="gradient-text">Neuro</span>
              <span className="text-white">Spark</span>
            </a>
          </div>
          
          <p className="text-white/50 text-sm">
            © {currentYear} NeuroSpark. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <a href="#about" className="text-sm text-white/70 hover:text-white">About</a>
            <a href="#projects" className="text-sm text-white/70 hover:text-white">Projects</a>
            <a href="#contact" className="text-sm text-white/70 hover:text-white">Contact</a>
            <a href="/admin/login" className="text-sm text-white/30 hover:text-white">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
