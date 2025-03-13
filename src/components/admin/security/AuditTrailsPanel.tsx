
import React from 'react';
import AuditTrailPanel from '../tax-credits/calculations/audit-trail/AuditTrailPanel';

const AuditTrailsPanel: React.FC = () => {
  try {
    return <AuditTrailPanel />;
  } catch (error) {
    console.error("Error rendering AuditTrailPanel:", error);
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        Erro ao carregar painel de auditoria. Por favor, contate o suporte.
      </div>
    );
  }
};

export default AuditTrailsPanel;
