
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

// Admin components
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminMobileSidebar from '@/components/admin/AdminMobileSidebar';
import AdminMobileNav from '@/components/admin/AdminMobileNav';
import AdminHeader from '@/components/admin/AdminHeader';
import MainContent from '@/components/admin/MainContent';
import AdminLoading from '@/components/admin/AdminLoading';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>('main');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      const adminAuth = localStorage.getItem('adminAuth');
      let adminAuthData = null;
      
      if (adminAuth) {
        try {
          adminAuthData = JSON.parse(adminAuth);
          const now = Date.now();
          const authTime = adminAuthData.timestamp || 0;
          if (now - authTime > 24 * 60 * 60 * 1000) {
            localStorage.removeItem('adminAuth');
            adminAuthData = null;
          }
        } catch (e) {
          localStorage.removeItem('adminAuth');
        }
      }
      
      if (!data.session && !adminAuthData) {
        navigate('/login');
        return;
      }
      
      setUser(data.session?.user || { email: adminAuthData?.email || 'admin@sistemasclaudio.com' });
      setLoading(false);
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          localStorage.removeItem('adminAuth');
          navigate('/login');
        } else if (session) {
          setUser(session.user);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    localStorage.removeItem('adminAuth');
    await supabase.auth.signOut();
    toast({
      title: "Sessão encerrada",
      description: "Você foi desconectado com sucesso.",
    });
    navigate('/login');
  };

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
      />
      
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-10 md:hidden"
             onClick={toggleMobileMenu}>
          <AdminMobileSidebar 
            activeTab={activeTab}
            expandedSection={expandedSection}
            user={user}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            toggleSection={toggleSection}
            setActiveTab={setActiveTab}
            toggleMobileMenu={toggleMobileMenu}
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
            handleLogout={handleLogout}
          />
        </div>
      )}
      
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
