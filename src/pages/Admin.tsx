
import React, { useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAdminUI } from '@/hooks/useAdminUI';
import { useLocation, useParams } from 'react-router-dom';

// Admin components
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminMobileNav from '@/components/admin/AdminMobileNav';
import AdminHeader from '@/components/admin/AdminHeader';
import MainContent from '@/components/admin/MainContent';
import AdminLoading from '@/components/admin/AdminLoading';
import MobileMenuOverlay from '@/components/admin/MobileMenuOverlay';

const Admin = () => {
  const { user, loading, handleLogout } = useAdminAuth();
  const {
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
  } = useAdminUI();
  
  const location = useLocation();
  const params = useParams();
  
  // Parse the route path to set the active tab
  useEffect(() => {
    // First check URL params for a tab
    if (params.tab) {
      setActiveTab(params.tab);
      return;
    }
    
    // Fallback to path parsing
    const path = location.pathname.split('/');
    if (path.length > 2) {
      const tabFromPath = path[2];
      if (tabFromPath && tabFromPath !== activeTab) {
        setActiveTab(tabFromPath);
      }
    } else {
      // If we're at /admin with no subtab specified, use the stored tab or default to dashboard
      const storedTab = sessionStorage.getItem('adminActiveTab');
      if (storedTab && storedTab !== activeTab) {
        setActiveTab(storedTab);
      } else if (!activeTab) {
        setActiveTab('dashboard');
      }
    }
  }, [location.pathname, params.tab, setActiveTab, activeTab]);

  if (loading) {
    return <AdminLoading />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <AdminHeader 
        toggleSidebar={toggleSidebar}
        toggleMobileMenu={toggleMobileMenu}
        toggleDarkMode={toggleDarkMode}
        handleLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        darkMode={darkMode}
        hasNotifications={hasNotifications}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        setActiveTab={setActiveTab}
      />
      
      <MobileMenuOverlay 
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        activeTab={activeTab}
        expandedSection={expandedSection}
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleSection={toggleSection}
        setActiveTab={setActiveTab}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        handleLogout={handleLogout}
      />
      
      <AdminMobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          expandedSection={expandedSection}
          user={user}
          toggleSidebar={toggleSidebar}
          toggleSection={toggleSection}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
        />
        
        <MainContent activeTab={activeTab} user={user} />
      </div>
    </div>
  );
};

export default Admin;
