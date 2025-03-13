
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutGrid, Home, LogOut } from 'lucide-react';

interface SidebarFooterProps {
  sidebarOpen: boolean;
  handleLogout: () => void;
}

const SidebarFooter = ({ sidebarOpen, handleLogout }: SidebarFooterProps) => {
  return (
    <div className="px-3 mt-auto">
      <div className={cn(
        "rounded-lg overflow-hidden bg-primary/5 border border-primary/10",
        !sidebarOpen && "p-2 flex justify-center"
      )}>
        {sidebarOpen ? (
          <div className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <LayoutGrid className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Acesso Rápido</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="h-auto py-1.5 text-xs justify-start bg-card hover:bg-card/80"
                onClick={() => window.open('/', '_blank')}
              >
                <Home className="mr-1 h-3.5 w-3.5" />
                Site
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="h-auto py-1.5 text-xs justify-start bg-card hover:bg-card/80 text-destructive hover:text-destructive" 
                onClick={handleLogout}
              >
                <LogOut className="mr-1 h-3.5 w-3.5" />
                Sair
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 p-2"
            onClick={() => window.open('/', '_blank')}
          >
            <Home className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {sidebarOpen && (
        <div className="text-xs text-muted-foreground text-center mt-3">
          v1.0.0 &copy; 2023 Sistemas Claudio
        </div>
      )}
    </div>
  );
};

export default SidebarFooter;
