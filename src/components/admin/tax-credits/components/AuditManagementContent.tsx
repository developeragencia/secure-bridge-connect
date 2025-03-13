
import React from 'react';
import { Card } from '@/components/ui/card';
import AuditStatusCards from './AuditStatusCards';
import AuditHeader from './AuditHeader';
import AuditFilters from './AuditFilters';
import AuditTable from './AuditTable';
import AuditForm from './AuditForm';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import { useAuditManagement } from '@/hooks/useAuditManagement';
import { Audit } from '@/types/audit';

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
          onViewDetails={onViewDetails}
          onDownloadDocuments={onDownloadDocuments}
          onEdit={onEdit}
          onDelete={onDelete}
          onApprove={onApprove}
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

// Create wrapper functions to convert from auditId to audit
const onViewDetails = (auditId: string) => {
  const audit = filteredAudits.find(a => a.id === auditId);
  if (audit) handleViewDetails(audit);
};

const onDownloadDocuments = (auditId: string) => {
  const audit = filteredAudits.find(a => a.id === auditId);
  if (audit) handleDownloadDocuments(audit);
};

const onEdit = (auditId: string) => {
  const audit = filteredAudits.find(a => a.id === auditId);
  if (audit) handleEditAudit(audit);
};

const onDelete = (auditId: string) => {
  const audit = filteredAudits.find(a => a.id === auditId);
  if (audit) handleDeleteAudit(audit);
};

const onApprove = (auditId: string) => {
  const audit = filteredAudits.find(a => a.id === auditId);
  if (audit) handleApproveAudit(audit);
};

export default AuditManagementContent;
