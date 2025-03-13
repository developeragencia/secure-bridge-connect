
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SidebarSection as SidebarSectionType } from '@/types/admin-sidebar';
import { useNavigate } from 'react-router-dom';

interface SidebarSectionProps {
  section: SidebarSectionType;
  activeTab: string;
  expandedSection: string | null;
  sidebarOpen: boolean;
  toggleSection: (section: string) => void;
  setActiveTab: (tab: string) => void;
}

const SidebarSection = ({
  section,
  activeTab,
  expandedSection,
  sidebarOpen,
  toggleSection,
  setActiveTab
}: SidebarSectionProps) => {
  const navigate = useNavigate();
  const isExpanded = expandedSection === section.id;
  
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    
    // Navigate to the appropriate route
    if (tabId === 'profile') {
      navigate('/admin/profile');
    } else if (tabId === 'notifications') {
      navigate('/admin/notifications');
    } else if (tabId === 'clients') {
      navigate('/admin/clients');
    } else {
      navigate(`/admin/${tabId}`);
    }
  };
  
  return (
    <div className="my-2">
      {/* Section header with improved styling and animation */}
      {sidebarOpen && (
        <button
          className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-sidebar-foreground hover:bg-primary/10 rounded-md transition-all duration-200"
          onClick={() => toggleSection(section.id)}
        >
          <span className="tracking-wide uppercase">{section.title}</span>
          <motion.div
            initial={{ rotate: isExpanded ? 0 : -90 }}
            animate={{ rotate: isExpanded ? 0 : -90 }}
            transition={{ duration: 0.2 }}
          >
            {isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5 text-sidebar-foreground/80" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-sidebar-foreground/80" />
            )}
          </motion.div>
        </button>
      )}
      
      {/* Section items with enhanced animations and transitions */}
      <motion.div 
        className={cn(
          "space-y-1 mt-1",
          sidebarOpen && !isExpanded ? "hidden" : "block",
          !sidebarOpen ? "px-2" : ""
        )}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: sidebarOpen && isExpanded || !sidebarOpen ? 1 : 0,
          height: sidebarOpen && isExpanded || !sidebarOpen ? "auto" : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {section.items.map((item) => (
          <motion.button
            key={item.id}
            className={cn(
              "flex items-center w-full rounded-md px-3 py-2 text-sm",
              activeTab === item.id 
                ? "bg-primary/20 text-primary font-medium shadow-sm backdrop-blur-sm" 
                : "text-sidebar-foreground hover:bg-primary/10 hover:text-foreground",
              !sidebarOpen && "justify-center p-2"
            )}
            onClick={() => handleTabClick(item.id)}
            whileHover={{ scale: 1.02, x: sidebarOpen ? 4 : 0 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span 
              className={cn(
                "mr-2 text-current", 
                !sidebarOpen && "mr-0",
                activeTab === item.id ? "text-primary" : "text-sidebar-foreground"
              )}
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              {item.icon}
            </motion.span>
            {sidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="truncate"
              >
                {item.label}
              </motion.span>
            )}
            
            {/* Active indicator animation */}
            {activeTab === item.id && sidebarOpen && (
              <motion.div 
                className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default SidebarSection;
