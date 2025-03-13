
import React from 'react';
import { Card } from '@/components/ui/card';
import AuditStatusCards from './AuditStatusCards';
import AuditHeader from './AuditHeader';
import AuditFilters from './AuditFilters';
import AuditTable from './AuditTable';
import AuditForm from './AuditForm';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import { useAuditManagement } from '@/hooks/useAuditManagement';

const AuditManagementContent: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredAudits,
    summary,
    isLoading,
    isListening,
    isFormOpen,
    setIsFormOpen,
    currentAudit,
    isEditMode,
    handleRefresh,
    handleCreateAudit,
    handleSaveAudit,
    handleViewDetails,
    handleDownloadDocuments,
    handleEditAudit,
    handleDeleteAudit,
    handleApproveAudit
  } = useAuditManagement();

  const { classes: cardClasses } = useAnimationOnScroll<HTMLDivElement>({
    threshold: 0.1,
    transitionType: 'fade-in',
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <AuditHeader 
        onRefresh={handleRefresh} 
        onCreateAudit={handleCreateAudit}
        isListening={isListening}
      />

      {/* Status Cards */}
      {summary && (
        <AuditStatusCards 
          summary={summary} 
          className={cardClasses}
        />
      )}

      {/* Filters */}
      <AuditFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      {/* Audits Table */}
      <Card>
        <AuditTable 
          audits={filteredAudits} 
          isLoading={isLoading} 
          onViewDetails={handleViewDetails}
          onDownloadDocuments={handleDownloadDocuments}
          onEdit={handleEditAudit}
          onDelete={handleDeleteAudit}
          onApprove={handleApproveAudit}
        />
      </Card>

      {/* Audit Form Dialog */}
      <AuditForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveAudit}
        initialData={currentAudit}
        isEdit={isEditMode}
      />
    </div>
  );
};

export default AuditManagementContent;
