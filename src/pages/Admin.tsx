
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import AnimatedLogo from '@/components/AnimatedLogo';
import { motion } from 'framer-motion';
import { 
  Users, BarChart3, FileText, Settings, LogOut, 
  Menu, BellRing, UserCircle, Sun, Moon,
  PanelTop, Home, Globe
} from 'lucide-react';

// Admin components
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminReports from '@/components/admin/AdminReports';
import AdminSettings from '@/components/admin/AdminSettings';
import SiteEditor from '@/components/admin/SiteEditor';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const checkAuth = async () => {
      // Check for Supabase session
      const { data } = await supabase.auth.getSession();
      
      // Check for our demo auth (fallback)
      const adminAuth = localStorage.getItem('adminAuth');
      let adminAuthData = null;
      
      if (adminAuth) {
        try {
          adminAuthData = JSON.parse(adminAuth);
          // Check if auth is expired (24 hours)
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
          // Also clear our fallback auth
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
    // Clear our fallback auth
    localStorage.removeItem('adminAuth');
    
    // Also sign out from Supabase if logged in
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
              <div className="relative z-10 h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                <PanelTop className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-muted-foreground animate-pulse">Carregando painel...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <motion.header 
        className="bg-card border-b border-border/40 shadow-sm z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <AnimatedLogo size="sm" showText={true} />
            <h1 className="text-lg font-semibold hidden md:block">Painel Administrativo</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <div className="relative">
              <Button variant="ghost" size="icon">
                <BellRing className="h-5 w-5" />
                {hasNotifications && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </Button>
            </div>
            
            <div className="relative group">
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-6 w-6" />
              </Button>
              <div className="absolute right-0 mt-2 w-48 p-2 bg-card rounded-md shadow-lg border border-border hidden group-hover:block z-20">
                <div className="px-4 py-2">
                  <p className="text-sm font-medium">{user?.email || 'admin@sistemasclaudio.com'}</p>
                  <p className="text-xs text-muted-foreground">Administrador</p>
                </div>
                <div className="border-t border-border my-1"></div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <motion.aside 
          className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-card border-r border-border/40 hidden md:block transition-all duration-300 ease-in-out`}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <nav className="p-4 space-y-2">
            <Button 
              variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('dashboard')}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button 
              variant={activeTab === 'users' ? 'secondary' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('users')}
            >
              <Users className="mr-2 h-4 w-4" />
              Usuários
            </Button>
            <Button 
              variant={activeTab === 'reports' ? 'secondary' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('reports')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Relatórios
            </Button>
            <Button 
              variant={activeTab === 'site' ? 'secondary' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('site')}
            >
              <Globe className="mr-2 h-4 w-4" />
              Editor do Site
            </Button>
            <Button 
              variant={activeTab === 'settings' ? 'secondary' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Button>
            
            <div className="pt-4 mt-4 border-t border-border">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => window.open('/', '_blank')}
              >
                <Home className="mr-2 h-4 w-4" />
                Página Inicial
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start mt-2 text-destructive hover:text-destructive" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </nav>
        </motion.aside>
        
        {/* Mobile Tab Selector */}
        <div className="md:hidden w-full border-b border-border flex justify-center">
          <div className="grid grid-cols-5 gap-2 p-2 w-full">
            <Button 
              variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'} 
              size="sm"
              className="flex flex-col items-center py-2 h-auto"
              onClick={() => setActiveTab('dashboard')}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs mt-1">Dashboard</span>
            </Button>
            <Button 
              variant={activeTab === 'users' ? 'secondary' : 'ghost'}
              size="sm"
              className="flex flex-col items-center py-2 h-auto"
              onClick={() => setActiveTab('users')}
            >
              <Users className="h-4 w-4" />
              <span className="text-xs mt-1">Usuários</span>
            </Button>
            <Button 
              variant={activeTab === 'reports' ? 'secondary' : 'ghost'}
              size="sm"
              className="flex flex-col items-center py-2 h-auto"
              onClick={() => setActiveTab('reports')}
            >
              <FileText className="h-4 w-4" />
              <span className="text-xs mt-1">Relatórios</span>
            </Button>
            <Button 
              variant={activeTab === 'site' ? 'secondary' : 'ghost'}
              size="sm"
              className="flex flex-col items-center py-2 h-auto"
              onClick={() => setActiveTab('site')}
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs mt-1">Site</span>
            </Button>
            <Button 
              variant={activeTab === 'settings' ? 'secondary' : 'ghost'}
              size="sm"
              className="flex flex-col items-center py-2 h-auto"
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-4 w-4" />
              <span className="text-xs mt-1">Config</span>
            </Button>
          </div>
        </div>
        
        {/* Content */}
        <motion.main 
          className="flex-1 overflow-auto p-6"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          <motion.div variants={childVariants}>
            {activeTab === 'dashboard' && <AdminDashboard />}
            {activeTab === 'users' && <AdminUsers />}
            {activeTab === 'reports' && <AdminReports />}
            {activeTab === 'site' && <SiteEditor />}
            {activeTab === 'settings' && <AdminSettings user={user} />}
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
};

export default Admin;
