
import React from 'react';
import { useAuditTrail } from '../tax-credits/calculations/audit-trail/useAuditTrail';
import AuditFilters from '../tax-credits/calculations/audit-trail/components/AuditFilters';
import AuditTable from '../tax-credits/calculations/audit-trail/components/AuditTable';
import AuditDetailDialog from '../tax-credits/calculations/audit-trail/components/AuditDetailDialog';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadCloud, Shield } from 'lucide-react';

const AuditTrailsPanel: React.FC = () => {
  const {
    searchQuery,
    handleSearch,
    actionFilter,
    setActionFilter,
    userFilter,
    setUserFilter,
    selectedAudit,
    isDetailsOpen,
    setIsDetailsOpen,
    filteredAudits,
    viewDetails,
    uniqueUsers,
  } = useAuditTrail();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">Trilhas de Auditoria</h1>
          <p className="text-muted-foreground">Acompanhe todas as ações realizadas no sistema</p>
        </div>
        <Button variant="outline">
          <DownloadCloud className="mr-2 h-4 w-4" />
          Exportar Logs
        </Button>
      </div>
      
      <Card className="border-primary/5">
        <CardContent className="pt-6 space-y-4">
          <AuditFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            actionFilter={actionFilter}
            onActionFilterChange={(value) => setActionFilter(value === '' ? null : value)}
            userFilter={userFilter}
            onUserFilterChange={(value) => setUserFilter(value === '' ? null : value)}
            uniqueUsers={uniqueUsers}
          />
          
          <AuditTable 
            audits={filteredAudits} 
            onViewDetails={viewDetails} 
          />
        </CardContent>
      </Card>
      
      <AuditDetailDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        auditData={selectedAudit}
      />
    </div>
  );
};

export default AuditTrailsPanel;
