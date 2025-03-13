
import React from 'react';

interface ExtraTabContentProps {
  activeTab: string;
}

const ExtraTabContent = ({ activeTab }: ExtraTabContentProps) => {
  // This component handles the tabs that are not explicitly included in MainContent
  // Our new tabs are already handled in MainContent, so we don't need to add them here
  
  if (activeTab === 'security' || activeTab === 'billing' || activeTab === 'support') {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center">
        <h3 className="text-lg font-medium mb-2">
          {activeTab === 'security' && 'Configurações de Segurança'}
          {activeTab === 'billing' && 'Faturamento'}
          {activeTab === 'support' && 'Central de Suporte'}
        </h3>
        <p className="text-muted-foreground">
          Esta seção está em desenvolvimento. Em breve novos recursos estarão disponíveis.
        </p>
      </div>
    );
  }
  
  return null;
};

export default ExtraTabContent;
