
import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const phrases = ['AI Innovator', 'Deep Learning Specialist', 'Freelance Tech Creator'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      setDisplayText('');
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (displayText.length < phrases[currentIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayText(phrases[currentIndex].substring(0, displayText.length + 1));
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [displayText, currentIndex]);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16">
      <div className="container mx-auto px-4 z-10 mt-12">
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-3xl mx-auto md:mx-0">
          <p className="text-neurospark-purple-light mb-2 font-medium animate-fade-in">Hi, I'm</p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-poppins mb-4 animate-fade-in">
            <span className="gradient-text">[Your Name]</span>
          </h1>
          
          <div className="h-8 mb-6 overflow-hidden">
            <h2 className="text-xl md:text-2xl font-medium flex items-center">
              <span className="mr-2 text-white/80">I'm a</span>
              <span className="text-white relative">
                {displayText}
                <span className="absolute right-[-4px] top-0 h-full w-[2px] bg-white animate-blink"></span>
              </span>
            </h2>
          </div>
          
          <p className="text-white/70 text-lg mb-8 max-w-xl animate-fade-in">
            Building cutting-edge AI solutions and innovative machine learning applications 
            to solve real-world problems at NeuroSpark.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-outline">
              Contact Me
            </a>
          </div>
          
          <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-pulse">
            <a 
              href="#about" 
              className="text-white/50 flex flex-col items-center gap-2 hover:text-white transition-colors"
              aria-label="Scroll down"
            >
              <span className="text-sm">Scroll Down</span>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="animate-float"
              >
                <polyline points="7 13 12 18 17 13"></polyline>
                <polyline points="7 6 12 11 17 6"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
