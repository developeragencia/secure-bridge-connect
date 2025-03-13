
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from '@/components/AnimatedLogo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Users, BarChart3, FileText, Settings, LogOut,
  Home, Globe, ShieldAlert, CreditCard,
  HelpCircle, ChevronDown, User, X,
  Receipt, Building, FileSearch, Landmark
} from 'lucide-react';

interface AdminMobileSidebarProps {
  activeTab: string;
  expandedSection: string | null;
  user: any;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleSection: (section: string) => void;
  setActiveTab: (tab: string) => void;
  toggleMobileMenu: () => void;
  toggleDarkMode: () => void;
  darkMode: boolean;
  handleLogout: () => void;
}

const AdminMobileSidebar = ({
  activeTab,
  expandedSection,
  user,
  searchQuery,
  setSearchQuery,
  toggleSection,
  setActiveTab,
  toggleMobileMenu,
  toggleDarkMode,
  darkMode,
  handleLogout
}: AdminMobileSidebarProps) => {
  
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
      id: 'tax_credits',
      title: 'Créditos Tributários',
      items: [
        { id: 'tax_credits', label: 'Gestão de Créditos', icon: <Receipt className="h-4 w-4" /> },
        { id: 'clients', label: 'Clientes', icon: <Building className="h-4 w-4" /> },
        { id: 'audits', label: 'Auditorias', icon: <FileSearch className="h-4 w-4" /> },
        { id: 'recovery', label: 'Recuperação', icon: <Landmark className="h-4 w-4" /> }
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
          
          <div className="text-xs text-muted-foreground text-center mt-3">
            v1.0.0 &copy; 2023 Sistemas Claudio
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminMobileSidebar;
