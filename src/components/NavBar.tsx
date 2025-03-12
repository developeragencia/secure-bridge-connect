
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import AnimatedLogo from './AnimatedLogo';

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
