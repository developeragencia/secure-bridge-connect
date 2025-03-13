
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
      {/* Section header */}
      {sidebarOpen && (
        <button
          className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-primary/5 rounded-md"
          onClick={() => toggleSection(section.id)}
        >
          <span>{section.title}</span>
          {isExpanded ? (
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/70" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/70" />
          )}
        </button>
      )}
      
      {/* Section items */}
      <div 
        className={cn(
          "space-y-1 mt-1",
          sidebarOpen && !isExpanded ? "hidden" : "block",
          !sidebarOpen ? "px-2" : ""
        )}
      >
        {section.items.map((item) => (
          <motion.button
            key={item.id}
            className={cn(
              "flex items-center w-full rounded-md px-3 py-2 text-sm",
              activeTab === item.id 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-primary/5 hover:text-foreground",
              !sidebarOpen && "justify-center p-2"
            )}
            onClick={() => handleTabClick(item.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={cn("mr-2", !sidebarOpen && "mr-0")}>
              {item.icon}
            </span>
            {sidebarOpen && <span className="truncate">{item.label}</span>}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SidebarSection;
