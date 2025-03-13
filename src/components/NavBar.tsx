
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import AnimatedLogo from './AnimatedLogo';
import { Menu, X } from 'lucide-react';

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isSistemasPage = location.pathname === '/sistemas';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoHover = () => {
    if (isSistemasPage) {
      setIsHovering(true);
      setTimeout(() => setIsHovering(false), 3000);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex items-center justify-between relative">
          <Link 
            to="/" 
            className="flex items-center"
            onMouseEnter={handleLogoHover}
          >
            <AnimatedLogo 
              size={scrolled ? "sm" : "md"} 
              className="transition-all duration-300"
              hovering={isHovering}
            />
          </Link>
          
          <button
            className="md:hidden p-2 rounded-md hover:bg-primary/10 transition-colors touch-target"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-2">
            <Link 
              to="/" 
              className="block py-2 px-3 rounded-md hover:bg-primary/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/admin" 
              className="block py-2 px-3 rounded-md hover:bg-primary/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
