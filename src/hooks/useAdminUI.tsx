
import { useState, useEffect } from 'react';

export const useAdminUI = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>('main');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return {
    activeTab,
    setActiveTab,
    sidebarOpen,
    darkMode,
    hasNotifications,
    searchQuery,
    setSearchQuery,
    expandedSection,
    mobileMenuOpen,
    toggleSidebar,
    toggleDarkMode,
    toggleSection,
    toggleMobileMenu
  };
};
