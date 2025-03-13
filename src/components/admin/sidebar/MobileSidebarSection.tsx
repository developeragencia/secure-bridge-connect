
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { SidebarSection } from '@/types/admin-sidebar';

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
    
    // Set the active tab and close the mobile menu
    setActiveTab(id);
    toggleMobileMenu();
  };

  return (
    <div className="mb-4 w-full">
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
        "space-y-1.5 w-full",
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
              "w-full justify-start rounded-md min-h-[40px]"
            )}
            onClick={() => handleItemClick(item.id)}
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
  );
};

export default MobileSidebarSection;
