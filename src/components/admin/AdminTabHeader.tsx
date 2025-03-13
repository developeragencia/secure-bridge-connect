
import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Users, FileText, Globe, Settings,
  ShieldAlert, CreditCard, HelpCircle
} from 'lucide-react';

interface AdminTabHeaderProps {
  activeTab: string;
}

const AdminTabHeader = ({ activeTab }: AdminTabHeaderProps) => {
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      variants={childVariants}
      className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border/40"
    >
      {activeTab === 'dashboard' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Visualize dados e estatísticas do sistema</p>
        </>
      )}
      {activeTab === 'users' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Users className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Usuários</h1>
          </div>
          <p className="text-muted-foreground">Gerencie usuários e permissões</p>
        </>
      )}
      {activeTab === 'reports' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Relatórios</h1>
          </div>
          <p className="text-muted-foreground">Acesse e gere relatórios do sistema</p>
        </>
      )}
      {activeTab === 'site' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Globe className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Editor do Site</h1>
          </div>
          <p className="text-muted-foreground">Personalize a aparência e conteúdo do seu site</p>
        </>
      )}
      {activeTab === 'settings' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Settings className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Configurações</h1>
          </div>
          <p className="text-muted-foreground">Configure preferências do sistema</p>
        </>
      )}
      {activeTab === 'security' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Segurança</h1>
          </div>
          <p className="text-muted-foreground">Gerencie configurações de segurança e permissões</p>
        </>
      )}
      {activeTab === 'billing' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <CreditCard className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Faturamento</h1>
          </div>
          <p className="text-muted-foreground">Gerencie planos, assinaturas e pagamentos</p>
        </>
      )}
      {activeTab === 'support' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Suporte</h1>
          </div>
          <p className="text-muted-foreground">Central de suporte e documentação</p>
        </>
      )}
    </motion.div>
  );
};

export default AdminTabHeader;
