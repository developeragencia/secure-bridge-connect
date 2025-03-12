
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import AnimatedLogo from './AnimatedLogo';
import MascotCharacter from './MascotCharacter';

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showMenuMascot, setShowMenuMascot] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Randomly show the mascot on the menu
  useEffect(() => {
    const interval = setInterval(() => {
      setShowMenuMascot(Math.random() > 0.7);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between relative">
          <Link to="/" className="flex items-center">
            <AnimatedLogo 
              size={scrolled ? "sm" : "md"} 
              className="transition-all duration-300"
            />
          </Link>
          
          {/* The mascot character can appear on top of the navbar */}
          {showMenuMascot && (
            <div className="absolute right-0 -top-8 z-10">
              <MascotCharacter position="menu" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
