
import React from 'react';
import { cn } from '@/lib/utils';
import { PanelTop, User } from 'lucide-react';

interface SidebarHeaderProps {
  sidebarOpen: boolean;
  user: any;
}

const SidebarHeader = ({ sidebarOpen, user }: SidebarHeaderProps) => {
  return (
    <div className="p-4">
      {!sidebarOpen && (
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <PanelTop className="h-5 w-5 text-primary" />
          </div>
        </div>
      )}
      
      <div className={cn(
        "mb-6 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-3 border border-primary/10",
        !sidebarOpen && "p-2"
      )}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.email?.split('@')[0] || 'admin'}
              </p>
              <div className="flex items-center mt-0.5">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-xs text-muted-foreground ml-1.5">Online</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
