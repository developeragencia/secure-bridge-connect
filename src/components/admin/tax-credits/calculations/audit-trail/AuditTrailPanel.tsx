
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadCloud } from 'lucide-react';
import { useAuditTrail } from './useAuditTrail';
import AuditFilters from './components/AuditFilters';
import AuditTable from './components/AuditTable';
import AuditDetailDialog from './components/AuditDetailDialog';

const AuditTrailPanel: React.FC = () => {
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-lg font-medium">Histórico Detalhado de Auditoria</h3>
        <Button variant="outline">
          <DownloadCloud className="mr-2 h-4 w-4" />
          Exportar Logs
        </Button>
      </div>
      
      <Card>
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

export default AuditTrailPanel;
