
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  BarChart3, Users, FileBarChart2, Globe, Settings,
  Receipt, Building, FileSearch, Landmark, UserCircle
} from 'lucide-react';
import ActiveClientSelector from './ActiveClientSelector';
import { useActiveClient } from '@/hooks/useActiveClient';

interface AdminMobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminMobileNav = ({ activeTab, setActiveTab }: AdminMobileNavProps) => {
  const { activeClient } = useActiveClient();

  return (
    <div className="md:hidden w-full border-b border-border sticky top-[57px] z-10 bg-card/95 backdrop-blur-sm">
      {activeClient && (
        <div className="px-3 py-2 border-b border-border/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Building className="h-3 w-3 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{activeClient.name}</p>
              <p className="text-[10px] text-muted-foreground">{activeClient.cnpj}</p>
            </div>
          </div>
          <ActiveClientSelector />
        </div>
      )}
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
          variant={activeTab === 'tax_credits' ? 'secondary' : 'ghost'}
          size="sm"
          className={cn(
            "flex flex-col items-center py-1.5 h-auto rounded-md",
            activeTab === 'tax_credits' && "bg-primary/10 text-primary"
          )}
          onClick={() => setActiveTab('tax_credits')}
        >
          <Receipt className="h-3.5 w-3.5" />
          <span className="text-[10px] mt-0.5">Créditos</span>
        </Button>
        <Button 
          variant={activeTab === 'clients' ? 'secondary' : 'ghost'}
          size="sm"
          className={cn(
            "flex flex-col items-center py-1.5 h-auto rounded-md",
            activeTab === 'clients' && "bg-primary/10 text-primary"
          )}
          onClick={() => setActiveTab('clients')}
        >
          <Building className="h-3.5 w-3.5" />
          <span className="text-[10px] mt-0.5">Clientes</span>
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
          variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
          size="sm"
          className={cn(
            "flex flex-col items-center py-1.5 h-auto rounded-md",
            activeTab === 'profile' && "bg-primary/10 text-primary"
          )}
          onClick={() => setActiveTab('profile')}
        >
          <UserCircle className="h-3.5 w-3.5" />
          <span className="text-[10px] mt-0.5">Perfil</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminMobileNav;
