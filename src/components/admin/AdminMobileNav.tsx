import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  BarChart3, Users, FileBarChart2, Globe, Settings,
  Receipt, Building, FileSearch, Landmark, UserCircle, PercentCircle
} from 'lucide-react';
import ActiveClientSelector from './ActiveClientSelector';
import { useActiveClient } from '@/hooks/useActiveClient';
import { motion } from 'framer-motion';

interface AdminMobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminMobileNav = ({ activeTab, setActiveTab }: AdminMobileNavProps) => {
  const { activeClient } = useActiveClient();
  
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return; // Prevent re-clicking the same tab
    setActiveTab(tab);
  };

  return (
    <div className="md:hidden w-full border-b border-border/50 sticky top-[57px] z-10 bg-background/95 backdrop-blur-sm shadow-sm">
      {activeClient && (
        <div className="px-3 py-2 border-b border-border/30 flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent">
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
      <motion.div 
        className="grid grid-cols-5 gap-1 p-1 w-full max-w-[480px] mx-auto min-h-[64px]"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <NavButton 
          icon={<BarChart3 className="h-3.5 w-3.5" />}
          label="Dashboard"
          isActive={activeTab === 'dashboard'}
          onClick={() => handleTabChange('dashboard')}
        />
        
        <NavButton 
          icon={<Receipt className="h-3.5 w-3.5" />}
          label="Créditos"
          isActive={activeTab === 'tax_credits'}
          onClick={() => handleTabChange('tax_credits')}
        />
        
        <NavButton 
          icon={<PercentCircle className="h-3.5 w-3.5" />}
          label="IRRF"
          isActive={activeTab === 'calculations'}
          onClick={() => handleTabChange('calculations')}
        />
        
        <NavButton 
          icon={<Building className="h-3.5 w-3.5" />}
          label="Clientes"
          isActive={activeTab === 'clients'}
          onClick={() => handleTabChange('clients')}
        />
        
        <NavButton 
          icon={<UserCircle className="h-3.5 w-3.5" />}
          label="Perfil"
          isActive={activeTab === 'profile'}
          onClick={() => handleTabChange('profile')}
        />
      </motion.div>
    </div>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
      <Button 
        variant={isActive ? 'secondary' : 'ghost'}
        size="sm"
        className={cn(
          "flex flex-col items-center py-1.5 h-auto rounded-md w-full",
          isActive && "bg-primary/10 text-primary shadow-sm"
        )}
        onClick={onClick}
      >
        {icon}
        <span className="text-[10px] mt-0.5">{label}</span>
      </Button>
    </motion.div>
  );
};

export default AdminMobileNav;
