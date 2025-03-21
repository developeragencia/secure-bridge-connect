
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getMenuSections } from './sidebar/SidebarMenuData';
import SidebarSection from './sidebar/SidebarSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MobileMenuOverlayProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  activeTab: string;
  expandedSection: string | null;
  user: any;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleSection: (section: string) => void;
  setActiveTab: (tab: string) => void;
  toggleDarkMode: () => void;
  darkMode: boolean;
  handleLogout: () => void;
}

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = ({
  mobileMenuOpen,
  toggleMobileMenu,
  activeTab,
  expandedSection,
  user,
  searchQuery,
  setSearchQuery,
  toggleSection,
  setActiveTab,
  toggleDarkMode,
  darkMode,
  handleLogout
}) => {
  if (!mobileMenuOpen) return null;
  
  const menuSections = getMenuSections();
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden">
      <motion.div 
        className="absolute inset-y-0 right-0 w-full max-w-sm bg-sidebar border-l border-sidebar-border shadow-xl"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="text-sm font-medium">{user?.name || 'Admin User'}</div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              className="text-muted-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="px-4 py-3 border-b border-sidebar-border">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar..."
              className="bg-sidebar-input"
            />
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-3">
              {menuSections.map((section) => (
                <SidebarSection
                  key={section.id}
                  section={section}
                  activeTab={activeTab}
                  expandedSection={expandedSection}
                  sidebarOpen={true}
                  toggleSection={toggleSection}
                  setActiveTab={(tab) => {
                    setActiveTab(tab);
                    toggleMobileMenu();
                  }}
                />
              ))}
            </nav>
          </div>
          
          <div className="px-4 py-3 border-t border-sidebar-border">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleDarkMode}
                className="w-full"
              >
                {darkMode ? 'Modo Claro' : 'Modo Escuro'}
              </Button>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleLogout}
              className="w-full mt-2"
            >
              Sair
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileMenuOverlay;
