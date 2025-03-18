
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import { useTaxCreditManagement } from '@/hooks/useTaxCreditManagement';
import { TaxCredit } from '@/types/tax-credits';
import { useToast } from '@/components/ui/use-toast';

// Import the components
import CreditHeader from './components/CreditHeader';
import CreditSummaryCards from './components/CreditSummaryCards';
import CreditChart from './components/CreditChart';
import CreditFilters from './components/CreditFilters';
import CreditTable from './components/CreditTable';
import TaxCreditForm from './forms/TaxCreditForm';
import StatusChangeDialog from './components/StatusChangeDialog';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';

const TaxCreditManagement: React.FC = () => {
  const [isCreditFormOpen, setIsCreditFormOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState<TaxCredit | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const { toast } = useToast();
  
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredCredits,
    summary,
    isLoading,
    isListening,
    handleRefresh,
    handleCreateCredit,
    handleViewDetails,
    handleExportData,
    createCredit,
    updateCredit,
    deleteCredit,
    changeStatus
  } = useTaxCreditManagement();

  const { classes: cardClasses } = useAnimationOnScroll<HTMLDivElement>({
    threshold: 0.1,
    transitionType: 'fade-in',
  });
  
  const openCreateCreditForm = () => {
    setSelectedCredit(null);
    setIsEditMode(false);
    setIsCreditFormOpen(true);
  };
  
  const openEditCreditForm = (credit: TaxCredit) => {
    setSelectedCredit(credit);
    setIsEditMode(true);
    setIsCreditFormOpen(true);
  };
  
  const openStatusChangeDialog = (credit: TaxCredit) => {
    setSelectedCredit(credit);
    setIsStatusDialogOpen(true);
  };
  
  const openDeleteDialog = (credit: TaxCredit) => {
    setSelectedCredit(credit);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSaveCredit = (formData: any) => {
    if (isEditMode && selectedCredit) {
      updateCredit(selectedCredit.id, formData);
      toast({
        title: "Crédito atualizado",
        description: `O crédito de ${formData.clientName} foi atualizado com sucesso.`,
      });
    } else {
      createCredit(formData);
      toast({
        title: "Crédito criado",
        description: `O novo crédito de ${formData.clientName} foi criado com sucesso.`,
      });
    }
    setIsCreditFormOpen(false);
  };
  
  const handleStatusChange = (creditId: string, newStatus: string, notes: string) => {
    changeStatus(creditId, newStatus, notes);
    setIsStatusDialogOpen(false);
    toast({
      title: "Status atualizado",
      description: `O status do crédito foi alterado para ${newStatus}.`,
    });
  };
  
  const handleDeleteCredit = (creditId: string) => {
    // Call the delete function from the hook
    deleteCredit(creditId);
    
    // Close the dialog
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Create and Refresh buttons */}
      <CreditHeader 
        onRefresh={handleRefresh} 
        onCreateCredit={openCreateCreditForm}
        isListening={isListening}
      />

      {/* Summary Cards */}
      {summary && (
        <CreditSummaryCards summary={summary} className={cardClasses} />
      )}

      {/* Overview Chart */}
      {summary && <CreditChart summary={summary} />}

      {/* Filters */}
      <CreditFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        onExportData={handleExportData}
      />

      {/* Tax Credits Table */}
      <Card>
        <CreditTable 
          credits={filteredCredits} 
          isLoading={isLoading} 
          onViewDetails={handleViewDetails}
          onEdit={openEditCreditForm}
          onDelete={openDeleteDialog}
          onStatusChange={openStatusChangeDialog}
        />
      </Card>
      
      {/* Forms and Dialogs */}
      <TaxCreditForm
        open={isCreditFormOpen}
        onClose={() => setIsCreditFormOpen(false)}
        onSave={handleSaveCredit}
        initialData={selectedCredit || undefined}
        isEdit={isEditMode}
      />
      
      <StatusChangeDialog
        open={isStatusDialogOpen}
        onClose={() => setIsStatusDialogOpen(false)}
        credit={selectedCredit}
        onStatusChange={handleStatusChange}
      />
      
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        credit={selectedCredit}
        onConfirm={handleDeleteCredit}
      />
    </div>
  );
};

export default TaxCreditManagement;
