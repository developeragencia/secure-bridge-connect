
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from '@/components/AnimatedLogo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Users, BarChart3, FileText, Settings, LogOut,
  PanelTop, Home, Globe, ShieldAlert, CreditCard,
  HelpCircle, LayoutGrid, ChevronDown, Sparkles,
  PanelLeftClose, PanelLeftOpen, User
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  sidebarOpen: boolean;
  expandedSection: string | null;
  user: any;
  toggleSidebar: () => void;
  toggleSection: (section: string) => void;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

const AdminSidebar = ({
  activeTab,
  sidebarOpen,
  expandedSection,
  user,
  toggleSidebar,
  toggleSection,
  setActiveTab,
  handleLogout
}: AdminSidebarProps) => {
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
  );
};

export default AdminSidebar;
