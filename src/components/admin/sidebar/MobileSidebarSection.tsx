
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown, Sparkles } from 'lucide-react';
import { SidebarSection } from '@/types/admin-sidebar';
import { motion } from 'framer-motion';

interface MobileSidebarSectionProps {
  section: SidebarSection;
  expandedSection: string | null;
  activeTab: string;
  toggleSection: (section: string) => void;
  setActiveTab: (tab: string) => void;
  toggleMobileMenu: () => void;
}

const MobileSidebarSection = ({
  section,
  expandedSection,
  activeTab,
  toggleSection,
  setActiveTab,
  toggleMobileMenu
}: MobileSidebarSectionProps) => {
  const handleItemClick = (id: string) => {
    // Skip if already on this tab to prevent unnecessary rendering
    if (id === activeTab) return;
    
    console.log("Mobile menu item clicked:", id);
    
    // Set the active tab and close the mobile menu
    setActiveTab(id);
    toggleMobileMenu();
  };

  // Check if any item in this section is active
  const isSectionActive = section.items.some(item => item.id === activeTab);
  
  // Auto-expand section that contains active tab
  const isExpanded = expandedSection === section.id || isSectionActive;

  return (
    <div className="mb-4 w-full">
      <motion.div 
        className={cn(
          "flex items-center justify-between py-2 px-3 text-xs font-medium uppercase tracking-wider cursor-pointer rounded-md transition-all duration-200",
          isSectionActive 
            ? "text-primary bg-sidebar-primary/15"
            : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50"
        )}
        onClick={() => toggleSection(section.id)}
        whileHover={{ scale: 1.01, backgroundColor: 'hsla(var(--sidebar-primary)/0.2)' }}
        whileTap={{ scale: 0.99 }}
      >
        <span>{section.title}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.div>
      </motion.div>
      
      {isExpanded && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-1.5 w-full pl-2"
        >
          {section.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.2,
                delay: index * 0.05 // Stagger the animations
              }}
            >
              <Button 
                variant={activeTab === item.id ? 'default' : 'ghost'} 
                className={cn(
                  activeTab === item.id 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm"
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground",
                  "w-full justify-start rounded-md min-h-[40px] transition-all"
                )}
                onClick={() => handleItemClick(item.id)}
              >
                <div className="flex items-center w-full">
                  <motion.span
                    className={cn(
                      activeTab === item.id 
                        ? "text-sidebar-primary-foreground" 
                        : "text-sidebar-primary",
                      "transition-colors"
                    )}
                    whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="ml-2 flex-1">{item.label}</span>
                  {activeTab === item.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 10, -10, 5, 0] }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20,
                        duration: 0.5 
                      }}
                    >
                      <Sparkles className="h-3.5 w-3.5 text-sidebar-primary-foreground ml-auto" />
                    </motion.div>
                  )}
                </div>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MobileSidebarSection;
