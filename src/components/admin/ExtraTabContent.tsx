
import React from 'react';
import { ShieldAlert, CreditCard, HelpCircle } from 'lucide-react';

interface ExtraTabContentProps {
  activeTab: string;
}

const ExtraTabContent = ({ activeTab }: ExtraTabContentProps) => {
  if (activeTab === 'security') {
    return (
      <div className="flex items-center justify-center h-64 bg-secondary/50 rounded-lg border border-border/40">
        <div className="text-center p-4 sm:p-8">
          <ShieldAlert className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Módulo de Segurança</h2>
          <p className="text-muted-foreground">Este módulo está em desenvolvimento e estará disponível em breve.</p>
        </div>
      </div>
    );
  }
  
  if (activeTab === 'billing') {
    return (
      <div className="flex items-center justify-center h-64 bg-secondary/50 rounded-lg border border-border/40">
        <div className="text-center p-4 sm:p-8">
          <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Módulo de Faturamento</h2>
          <p className="text-muted-foreground">Este módulo está em desenvolvimento e estará disponível em breve.</p>
        </div>
      </div>
    );
  }
  
  if (activeTab === 'support') {
    return (
      <div className="flex items-center justify-center h-64 bg-secondary/50 rounded-lg border border-border/40">
        <div className="text-center p-4 sm:p-8">
          <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Módulo de Suporte</h2>
          <p className="text-muted-foreground">Este módulo está em desenvolvimento e estará disponível em breve.</p>
        </div>
      </div>
    );
  }
  
  return null;
};

export default ExtraTabContent;
