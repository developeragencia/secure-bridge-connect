
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  BarChart3, Users, FileBarChart2, Globe, Settings
} from 'lucide-react';

interface AdminMobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminMobileNav = ({ activeTab, setActiveTab }: AdminMobileNavProps) => {
  return (
    <div className="md:hidden w-full border-b border-border sticky top-[57px] z-10 bg-card/95 backdrop-blur-sm">
      <div className="grid grid-cols-5 gap-1 p-1 w-full max-w-[480px] mx-auto">
        <Button 
          variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'} 
          size="sm"
          className={cn(
            "flex flex-col items-center py-1.5 h-auto rounded-md",
            activeTab === 'dashboard' && "bg-primary/10 text-primary"
          )}
          onClick={() => setActiveTab('dashboard')}
        >
          <BarChart3 className="h-3.5 w-3.5" />
          <span className="text-[10px] mt-0.5">Dashboard</span>
        </Button>
        <Button 
          variant={activeTab === 'users' ? 'secondary' : 'ghost'}
          size="sm"
          className={cn(
            "flex flex-col items-center py-1.5 h-auto rounded-md",
            activeTab === 'users' && "bg-primary/10 text-primary"
          )}
          onClick={() => setActiveTab('users')}
        >
          <Users className="h-3.5 w-3.5" />
          <span className="text-[10px] mt-0.5">Usuários</span>
        </Button>
        <Button 
          variant={activeTab === 'reports' ? 'secondary' : 'ghost'}
          size="sm"
          className={cn(
            "flex flex-col items-center py-1.5 h-auto rounded-md",
            activeTab === 'reports' && "bg-primary/10 text-primary"
          )}
          onClick={() => setActiveTab('reports')}
        >
          <FileBarChart2 className="h-3.5 w-3.5" />
          <span className="text-[10px] mt-0.5">Relatórios</span>
        </Button>
        <Button 
          variant={activeTab === 'site' ? 'secondary' : 'ghost'}
          size="sm"
          className={cn(
            "flex flex-col items-center py-1.5 h-auto rounded-md",
            activeTab === 'site' && "bg-primary/10 text-primary"
          )}
          onClick={() => setActiveTab('site')}
        >
          <Globe className="h-3.5 w-3.5" />
          <span className="text-[10px] mt-0.5">Site</span>
        </Button>
        <Button 
          variant={activeTab === 'settings' ? 'secondary' : 'ghost'}
          size="sm"
          className={cn(
            "flex flex-col items-center py-1.5 h-auto rounded-md",
            activeTab === 'settings' && "bg-primary/10 text-primary"
          )}
          onClick={() => setActiveTab('settings')}
        >
          <Settings className="h-3.5 w-3.5" />
          <span className="text-[10px] mt-0.5">Config</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminMobileNav;
