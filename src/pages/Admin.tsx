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
  PanelTop, Home, Globe, Grid3X3, LayoutGrid,
  ChevronRight, User, FileBarChart2, Search,
  ChevronDown, PanelLeftClose, PanelLeftOpen,
  Database, HelpCircle, Inbox, CreditCard,
  ShieldAlert, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
              <div className="relative z-10 h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                <PanelTop className="h-8 w-8 text-white" />
              </div>
            </div>
            <p className="text-lg text-muted-foreground animate-pulse">Carregando painel administrativo...</p>
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
  
  const sidebarItemVariants = {
    hover: { 
      x: 5, 
      transition: { duration: 0.2 } 
    }
  };
  
  const menuSections = [
    {
      id: 'main',
      title: 'Principal',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-4 w-4" /> },
        { id: 'users', label: 'Usuários', icon: <Users className="h-4 w-4" /> }
      ]
    },
    {
      id: 'content',
      title: 'Conteúdo',
      items: [
        { id: 'site', label: 'Editor do Site', icon: <Globe className="h-4 w-4" /> },
        { id: 'reports', label: 'Relatórios', icon: <FileText className="h-4 w-4" /> }
      ]
    },
    {
      id: 'system',
      title: 'Sistema',
      items: [
        { id: 'settings', label: 'Configurações', icon: <Settings className="h-4 w-4" /> },
        { id: 'security', label: 'Segurança', icon: <ShieldAlert className="h-4 w-4" /> },
        { id: 'billing', label: 'Faturamento', icon: <CreditCard className="h-4 w-4" /> },
        { id: 'support', label: 'Suporte', icon: <HelpCircle className="h-4 w-4" /> }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <motion.header 
        className="bg-card border-b border-border/40 shadow-sm z-20 sticky top-0"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between p-2 sm:p-3 mx-auto w-full max-w-[1400px]">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="rounded-full h-8 w-8 sm:h-9 sm:w-9 hover:bg-primary/10 md:flex hidden"
            >
              {sidebarOpen ? 
                <PanelLeftClose className="h-4 w-4 sm:h-5 sm:w-5 text-primary" /> : 
                <PanelLeftOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              }
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="rounded-full h-8 w-8 sm:h-9 sm:w-9 hover:bg-primary/10 md:hidden flex"
            >
              <Menu className="h-5 w-5 text-primary" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="bg-primary/10 p-1.5 sm:p-2 rounded-md">
                <AnimatedLogo size="sm" showText={false} />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-semibold leading-none">Painel Admin</h1>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Sistemas Claudio</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="relative max-w-xs hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar..."
                className="rounded-full bg-secondary/70 pl-9 pr-4 py-2 text-sm w-40 focus:w-60 transition-all focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode} 
              className="rounded-full h-8 w-8 sm:h-9 sm:w-9 hover:bg-primary/10"
            >
              {darkMode ? 
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" /> : 
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              }
            </Button>
            
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 hover:bg-primary/10"
              >
                <BellRing className="h-4 w-4 sm:h-5 sm:w-5" />
                {hasNotifications && (
                  <span className="absolute top-1 right-1 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red-500 ring-2 ring-background animate-pulse"></span>
                )}
              </Button>
            </div>
            
            <div className="relative group">
              <Button 
                variant="ghost" 
                className="h-8 sm:h-9 flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs rounded-full px-2 sm:px-3 hover:bg-primary/10"
              >
                <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary/20 flex items-center justify-center text-primary ring-2 ring-background">
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
                <span className="hidden sm:inline-block max-w-[120px] truncate font-medium">
                  {user?.email?.split('@')[0] || 'admin'}
                </span>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 opacity-70" />
              </Button>
              <div className="absolute right-0 mt-2 w-56 p-2 bg-card rounded-lg shadow-lg border border-border hidden group-hover:block z-20 animate-fade-in">
                <div className="px-4 py-2 rounded-md hover:bg-secondary transition-colors">
                  <p className="text-sm font-medium">{user?.email || 'admin@sistemasclaudio.com'}</p>
                  <p className="text-xs text-muted-foreground">Administrador</p>
                </div>
                <div className="border-t border-border my-1"></div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout} 
                  className="w-full justify-start text-destructive hover:bg-destructive/10 rounded-md"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
      
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-10 md:hidden"
             onClick={toggleMobileMenu}>
          <motion.div 
            className="fixed left-0 top-0 h-full w-3/4 max-w-xs bg-card border-r border-border/40 shadow-lg overflow-auto p-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-1.5 rounded-md">
                    <AnimatedLogo size="sm" showText={false} />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold">Painel Admin</h2>
                    <p className="text-[10px] text-muted-foreground">Sistemas Claudio</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user?.email?.split('@')[0] || 'admin'}
                    </p>
                    <div className="flex items-center mt-0.5">
                      <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                      <p className="text-xs text-muted-foreground ml-1.5">Online</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="rounded-md bg-secondary/70 pl-9 pr-4 py-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <nav className="flex-1 overflow-y-auto">
                {menuSections.map((section) => (
                  <div key={section.id} className="mb-4">
                    <div 
                      className="flex items-center justify-between py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                      onClick={() => toggleSection(section.id)}
                    >
                      <span>{section.title}</span>
                      <ChevronDown 
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200", 
                          expandedSection === section.id ? "transform rotate-0" : "transform rotate(-90deg)"
                        )} 
                      />
                    </div>
                    
                    <div className={cn(
                      "space-y-1.5",
                      expandedSection !== section.id && "hidden"
                    )}>
                      {section.items.map((item) => (
                        <Button 
                          key={item.id}
                          variant={activeTab === item.id ? 'secondary' : 'ghost'} 
                          className={cn(
                            activeTab === item.id 
                              ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                              : "hover:bg-secondary/80",
                            "w-full justify-start rounded-md"
                          )}
                          onClick={() => {
                            setActiveTab(item.id);
                            toggleMobileMenu();
                          }}
                        >
                          <span className={cn(
                            activeTab === item.id 
                              ? "text-primary" 
                              : "text-muted-foreground group-hover:text-foreground",
                            "transition-colors"
                          )}>
                            {item.icon}
                          </span>
                          <span className="ml-2">{item.label}</span>
                          {activeTab === item.id && (
                            <div className="ml-auto">
                              <Sparkles className="h-3.5 w-3.5 text-primary" />
                            </div>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
              
              <div className="mt-auto pt-4 border-t border-border/40">
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-auto py-2 text-xs justify-start"
                    onClick={() => window.open('/', '_blank')}
                  >
                    <Home className="mr-1.5 h-3.5 w-3.5" />
                    Site
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-auto py-2 text-xs justify-start text-destructive hover:text-destructive" 
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-1.5 h-3.5 w-3.5" />
                    Sair
                  </Button>
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleDarkMode} 
                    className="rounded-full"
                  >
                    {darkMode ? 
                      <Sun className="h-5 w-5 text-amber-400" /> : 
                      <Moon className="h-5 w-5" />
                    }
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground text-center mt-3">
                  v1.0.0 &copy; 2023 Sistemas Claudio
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        <motion.aside 
          className={cn(
            "bg-sidebar transition-all duration-300 ease-in-out border-r border-border/40 overflow-hidden hidden md:block",
            sidebarOpen ? "w-64" : "w-[70px]"
          )}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex flex-col h-full pb-4">
            <div className="p-4">
              {!sidebarOpen && (
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <PanelTop className="h-5 w-5 text-primary" />
                  </div>
                </div>
              )}
              
              <div className={cn(
                "mb-6 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-3 border border-primary/10",
                !sidebarOpen && "p-2"
              )}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  {sidebarOpen && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {user?.email?.split('@')[0] || 'admin'}
                      </p>
                      <div className="flex items-center mt-0.5">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        <p className="text-xs text-muted-foreground ml-1.5">Online</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <nav className="px-3 flex-1 overflow-y-auto scrollbar-none">
              {menuSections.map((section) => (
                <div key={section.id} className="mb-4">
                  {sidebarOpen ? (
                    <div 
                      className="flex items-center justify-between py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                      onClick={() => toggleSection(section.id)}
                    >
                      <span>{section.title}</span>
                      <ChevronDown 
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200", 
                          expandedSection === section.id ? "transform rotate-0" : "transform rotate(-90deg)"
                        )} 
                      />
                    </div>
                  ) : (
                    <div className="h-px bg-border/50 my-4"></div>
                  )}
                  
                  <div className={cn(
                    "space-y-1",
                    sidebarOpen && expandedSection !== section.id && "hidden"
                  )}>
                    {section.items.map((item) => (
                      <motion.div 
                        key={item.id}
                        variants={sidebarItemVariants}
                        whileHover="hover"
                      >
                        <Button 
                          variant={activeTab === item.id ? 'secondary' : 'ghost'} 
                          className={cn(
                            activeTab === item.id 
                              ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                              : "hover:bg-secondary/80",
                            sidebarOpen ? "w-full justify-start" : "w-full p-2 flex justify-center",
                            "rounded-md transition-all duration-200"
                          )}
                          onClick={() => setActiveTab(item.id)}
                        >
                          <div className={cn(
                            "flex items-center",
                            !sidebarOpen && "flex-col gap-1"
                          )}>
                            <span className={cn(
                              activeTab === item.id 
                                ? "text-primary" 
                                : "text-muted-foreground group-hover:text-foreground",
                              "transition-colors"
                            )}>
                              {item.icon}
                            </span>
                            {sidebarOpen && <span className="ml-2">{item.label}</span>}
                            {!sidebarOpen && (
                              <span className="text-[10px]">{item.label.split(' ')[0]}</span>
                            )}
                          </div>
                          {activeTab === item.id && sidebarOpen && (
                            <div className="ml-auto">
                              <Sparkles className="h-3.5 w-3.5 text-primary" />
                            </div>
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            
            <div className="px-3 mt-auto">
              <div className={cn(
                "rounded-lg overflow-hidden bg-primary/5 border border-primary/10",
                !sidebarOpen && "p-2 flex justify-center"
              )}>
                {sidebarOpen ? (
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <LayoutGrid className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Acesso Rápido</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-auto py-1.5 text-xs justify-start bg-card hover:bg-card/80"
                        onClick={() => window.open('/', '_blank')}
                      >
                        <Home className="mr-1 h-3.5 w-3.5" />
                        Site
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-auto py-1.5 text-xs justify-start bg-card hover:bg-card/80 text-destructive hover:text-destructive" 
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-1 h-3.5 w-3.5" />
                        Sair
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 p-2"
                    onClick={() => window.open('/', '_blank')}
                  >
                    <Home className="h-5 w-5" />
                  </Button>
                )}
              </div>
              
              {sidebarOpen && (
                <div className="text-xs text-muted-foreground text-center mt-3">
                  v1.0.0 &copy; 2023 Sistemas Claudio
                </div>
              )}
            </div>
          </div>
        </motion.aside>
        
        <div className="md:hidden w-full border-b border-border sticky top-[57px] z-10 bg-card/95 backdrop-blur-sm">
          <div className="grid grid-cols-5 gap-1 p-1 w-full max-w-[480px] mx-auto">
            <Button 
              variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'} 
              size="sm"
              className={cn(
                "flex flex-col items-center py-1.5 h-auto rounded-md",
                activeTab === 'dashboard' && "bg-primary/10 text-primary"
              )}
              onClick={() => setActiveTab('dashboard')}
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span className="text-[10px] mt-0.5">Dashboard</span>
            </Button>
            <Button 
              variant={activeTab === 'users' ? 'secondary' : 'ghost'}
              size="sm"
              className={cn(
                "flex flex-col items-center py-1.5 h-auto rounded-md",
                activeTab === 'users' && "bg-primary/10 text-primary"
              )}
              onClick={() => setActiveTab('users')}
            >
              <Users className="h-3.5 w-3.5" />
              <span className="text-[10px] mt-0.5">Usuários</span>
            </Button>
            <Button 
              variant={activeTab === 'reports' ? 'secondary' : 'ghost'}
              size="sm"
              className={cn(
                "flex flex-col items-center py-1.5 h-auto rounded-md",
                activeTab === 'reports' && "bg-primary/10 text-primary"
              )}
              onClick={() => setActiveTab('reports')}
            >
              <FileBarChart2 className="h-3.5 w-3.5" />
              <span className="text-[10px] mt-0.5">Relatórios</span>
            </Button>
            <Button 
              variant={activeTab === 'site' ? 'secondary' : 'ghost'}
              size="sm"
              className={cn(
                "flex flex-col items-center py-1.5 h-auto rounded-md",
                activeTab === 'site' && "bg-primary/10 text-primary"
              )}
              onClick={() => setActiveTab('site')}
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="text-[10px] mt-0.5">Site</span>
            </Button>
            <Button 
              variant={activeTab === 'settings' ? 'secondary' : 'ghost'}
              size="sm"
              className={cn(
                "flex flex-col items-center py-1.5 h-auto rounded-md",
                activeTab === 'settings' && "bg-primary/10 text-primary"
              )}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-3.5 w-3.5" />
              <span className="text-[10px] mt-0.5">Config</span>
            </Button>
          </div>
        </div>
        
        <motion.main 
          className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 bg-background"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div 
              variants={childVariants}
              className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border/40"
            >
              {activeTab === 'dashboard' && (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                  </div>
                  <p className="text-muted-foreground">Visualize dados e estatísticas do sistema</p>
                </>
              )}
              {activeTab === 'users' && (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Users className="h-5 w-5" />
                    </div>
                    <h1 className="text-2xl font-bold">Usuários</h1>
                  </div>
                  <p className="text-muted-foreground">Gerencie usuários e permissões</p>
                </>
              )}
              {activeTab === 'reports' && (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h1 className="text-2xl font-bold">Relatórios</h1>
                  </div>
                  <p className="text-muted-foreground">Acesse e gere relatórios do sistema</p>
                </>
              )}
              {activeTab === 'site' && (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Globe className="h-5 w-5" />
                    </div>
                    <h1 className="text-2xl font-bold">Editor do Site</h1>
                  </div>
                  <p className="text-muted-foreground">Personalize a aparência e conteúdo do seu site</p>
                </>
              )}
              {activeTab === 'settings' && (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Settings className="h-5 w-5" />
                    </div>
                    <h1 className="text-2xl font-bold">Configurações</h1>
                  </div>
                  <p className="text-muted-foreground">Configure preferências do sistema</p>
                </>
              )}
              {activeTab === 'security' && (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <ShieldAlert className="h-5 w-5" />
                    </div>
                    <h1 className="text-2xl font-bold">Segurança</h1>
                  </div>
                  <p className="text-muted-foreground">Gerencie configurações de segurança e permissões</p>
                </>
              )}
              {activeTab === 'billing' && (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <h1 className="text-2xl font-bold">Faturamento</h1>
                  </div>
                  <p className="text-muted-foreground">Gerencie planos, assinaturas e pagamentos</p>
                </>
              )}
              {activeTab === 'support' && (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <h1 className="text-2xl font-bold">Suporte</h1>
                  </div>
                  <p className="text-muted-foreground">Central de suporte e documentação</p>
                </>
              )}
            </motion.div>
            
            <motion.div variants={childVariants}>
              {activeTab === 'dashboard' && <AdminDashboard />}
              {activeTab === 'users' && <AdminUsers />}
              {activeTab === 'reports' && <AdminReports />}
              {activeTab === 'site' && <SiteEditor />}
              {activeTab === 'settings' && <AdminSettings user={user} />}
              {activeTab === 'security' && (
                <div className="flex items-center justify-center h-64 bg-secondary/50 rounded-lg border border-border/40">
                  <div className="text-center p-4 sm:p-8">
                    <ShieldAlert className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Módulo de Segurança</h2>
                    <p className="text-muted-foreground">Este módulo está em desenvolvimento e estará disponível em breve.</p>
                  </div>
                </div>
              )}
              {activeTab === 'billing' && (
                <div className="flex items-center justify-center h-64 bg-secondary/50 rounded-lg border border-border/40">
                  <div className="text-center p-4 sm:p-8">
                    <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Módulo de Faturamento</h2>
                    <p className="text-muted-foreground">Este módulo está em desenvolvimento e estará disponível em breve.</p>
                  </div>
                </div>
              )}
              {activeTab === 'support' && (
                <div className="flex items-center justify-center h-64 bg-secondary/50 rounded-lg border border-border/40">
                  <div className="text-center p-4 sm:p-8">
                    <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Módulo de Suporte</h2>
                    <p className="text-muted-foreground">Este módulo está em desenvolvimento e estará disponível em breve.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Admin;

