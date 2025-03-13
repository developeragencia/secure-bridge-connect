
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from '@/components/AnimatedLogo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Menu, UserCircle, Sun, Moon,
  PanelLeftClose, PanelLeftOpen, User,
  ChevronDown, Search, LogOut, X, Building2
} from 'lucide-react';
import ActiveClientSelector from './ActiveClientSelector';
import ActiveClientIndicator from './ActiveClientIndicator';
import { useClientStore } from '@/hooks/useClientStore';
import NotificationBell from '@/components/NotificationBell';

interface AdminHeaderProps {
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  toggleDarkMode: () => void;
  handleLogout: () => void;
  sidebarOpen: boolean;
  darkMode: boolean;
  hasNotifications: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  user: any;
  setActiveTab: (tab: string) => void;
}

const AdminHeader = ({
  toggleSidebar,
  toggleMobileMenu,
  toggleDarkMode,
  handleLogout,
  sidebarOpen,
  darkMode,
  hasNotifications,
  searchQuery,
  setSearchQuery,
  user,
  setActiveTab
}: AdminHeaderProps) => {
  const { activeClient } = useClientStore();
  
  return (
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
              <h1 className="text-base sm:text-lg font-semibold leading-none">PAINEL ADMINISTRATIVO</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Sistemas Claudio</p>
            </div>
          </div>
          
          {/* Add ActiveClientSelector */}
          <div className="hidden md:block ml-2">
            {!activeClient ? <ActiveClientSelector /> : <ActiveClientIndicator />}
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
            <NotificationBell />
          </div>
          
          <div className="relative group">
            <Button 
              variant="ghost" 
              className="h-8 sm:h-9 flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs rounded-full px-2 sm:px-3 hover:bg-primary/10"
              onClick={() => setActiveTab('profile')}
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
      
      {/* Add active client bar for mobile view */}
      {activeClient && (
        <div className="md:hidden bg-primary/5 border-t border-primary/10 px-3 py-1 flex items-center justify-between">
          <div className="flex items-center">
            <Building2 className="h-3.5 w-3.5 text-primary mr-1.5" />
            <span className="text-xs font-medium text-primary truncate max-w-[200px]">
              {activeClient.name}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => useClientStore.getState().clearActiveClient()}
            className="h-6 w-6 text-muted-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </motion.header>
  );
};

export default AdminHeader;
