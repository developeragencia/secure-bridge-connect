
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarSection as SectionType } from '@/types/admin-sidebar';

interface SidebarSectionProps {
  section: SectionType;
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
  const sidebarItemVariants = {
    hover: { 
      x: 5, 
      transition: { duration: 0.2 } 
    }
  };

  const handleItemClick = (id: string) => {
    // Only update if the tab is actually changing to prevent re-renders
    if (id === activeTab) return;
    console.log("Desktop menu item clicked:", id);
    setActiveTab(id);
  };

  // Check if any item in this section is active
  const isSectionActive = section.items.some(item => item.id === activeTab);
  
  // Auto-expand section if it contains the active tab
  const isExpanded = sidebarOpen && (expandedSection === section.id || isSectionActive);

  return (
    <div className="mb-4 w-full">
      {sidebarOpen ? (
        <div 
          className={cn(
            "flex items-center justify-between py-2 px-3 text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-foreground rounded-md hover:bg-accent/30",
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
      ) : (
        <div className="h-px bg-border/50 my-4"></div>
      )}
      
      <div className={cn(
        "space-y-1 w-full",
        sidebarOpen && !isExpanded && "hidden"
      )}>
        {section.items.map((item) => (
          <motion.div 
            key={item.id}
            variants={sidebarItemVariants}
            whileHover="hover"
            className="w-full"
            layout="position"
          >
            <Button 
              variant={activeTab === item.id ? 'secondary' : 'ghost'} 
              className={cn(
                activeTab === item.id 
                  ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                  : "hover:bg-secondary/80",
                sidebarOpen ? "w-full justify-start" : "w-full p-2 flex justify-center",
                "rounded-md transition-all duration-200 min-h-[40px]"
              )}
              onClick={() => handleItemClick(item.id)}
            >
              <div className={cn(
                "flex items-center",
                !sidebarOpen ? "flex-col gap-1" : "w-full"
              )}>
                <span className={cn(
                  activeTab === item.id 
                    ? "text-primary" 
                    : "text-muted-foreground group-hover:text-foreground",
                  "transition-colors"
                )}>
                  {item.icon}
                </span>
                {sidebarOpen && <span className="ml-2 flex-1">{item.label}</span>}
                {!sidebarOpen && (
                  <span className="text-[10px]">{item.label.split(' ')[0]}</span>
                )}
                {activeTab === item.id && sidebarOpen && (
                  <Sparkles className="h-3.5 w-3.5 text-primary ml-auto" />
                )}
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Use React.memo to prevent unnecessary rerenders
export default memo(SidebarSection);
