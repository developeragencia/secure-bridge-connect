
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
      <div 
        className={cn(
          "flex items-center justify-between py-2 px-3 text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-foreground rounded-md",
          isSectionActive ? "text-primary" : "text-muted-foreground"
        )}
        onClick={() => toggleSection(section.id)}
      >
        <span>{section.title}</span>
        <ChevronDown 
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200", 
            isExpanded ? "transform rotate-0" : "transform rotate(-90deg)"
          )} 
        />
      </div>
      
      {isExpanded && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-1.5 w-full pl-2"
        >
          {section.items.map((item) => (
            <Button 
              key={item.id}
              variant={activeTab === item.id ? 'secondary' : 'ghost'} 
              className={cn(
                activeTab === item.id 
                  ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                  : "hover:bg-secondary/80",
                "w-full justify-start rounded-md min-h-[40px] transition-all"
              )}
              onClick={() => handleItemClick(item.id)}
            >
              <div className="flex items-center w-full">
                <span className={cn(
                  activeTab === item.id 
                    ? "text-primary" 
                    : "text-muted-foreground group-hover:text-foreground",
                  "transition-colors"
                )}>
                  {item.icon}
                </span>
                <span className="ml-2 flex-1">{item.label}</span>
                {activeTab === item.id && (
                  <Sparkles className="h-3.5 w-3.5 text-primary ml-auto" />
                )}
              </div>
            </Button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MobileSidebarSection;
