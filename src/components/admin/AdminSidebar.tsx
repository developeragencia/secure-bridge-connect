
import React from 'react';
import { motion } from 'framer-motion';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getMenuSections } from './sidebar/SidebarMenuData';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarSection from './sidebar/SidebarSection';
import SidebarFooter from './sidebar/SidebarFooter';

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
  const menuSections = getMenuSections();

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
        <SidebarHeader sidebarOpen={sidebarOpen} user={user} />
        
        <nav className="px-3 flex-1 overflow-y-auto scrollbar-none">
          {menuSections.map((section) => (
            <SidebarSection
              key={section.id}
              section={section}
              activeTab={activeTab}
              expandedSection={expandedSection}
              sidebarOpen={sidebarOpen}
              toggleSection={toggleSection}
              setActiveTab={setActiveTab}
            />
          ))}
        </nav>
        
        <SidebarFooter sidebarOpen={sidebarOpen} handleLogout={handleLogout} />
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
