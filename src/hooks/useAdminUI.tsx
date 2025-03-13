import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAdminUI = () => {
  // Default tab from session storage or 'dashboard'
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem('adminActiveTab') || 'dashboard';
  });
  
  const navigate = useNavigate();
  
  // Persist active tab to session storage when it changes
  useEffect(() => {
    if (activeTab) {
      sessionStorage.setItem('adminActiveTab', activeTab);
      
      // Update URL to match the active tab for better bookmarking and refresh handling
      if (activeTab !== 'dashboard') {
        navigate(`/admin/${activeTab}`, { replace: true });
      } else {
        // For dashboard, keep the URL clean
        navigate('/admin', { replace: true });
      }
    }
  }, [activeTab, navigate]);
  
  // Other state management
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const stored = localStorage.getItem('sidebarOpen');
    return stored ? stored === 'true' : true;
  });
  
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? stored === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [hasNotifications, setHasNotifications] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom setActiveTab function that also navigates
  const handleSetActiveTab = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);
  
  // Toggle functions
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => {
      const newValue = !prev;
      localStorage.setItem('sidebarOpen', String(newValue));
      return newValue;
    });
  }, []);
  
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem('darkMode', String(newValue));
      
      // Update document class for dark mode
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newValue;
    });
  }, []);
  
  // Initialize dark mode on component mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  const toggleSection = useCallback((section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  }, []);
  
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);
  
  return {
    activeTab,
    setActiveTab: handleSetActiveTab,
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
