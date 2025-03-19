
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useTaxCreditManagement } from '@/hooks/tax-credits/useTaxCreditManagement';
import { TaxCredit } from '@/types/tax-credits';

// Components
import CreditHeader from './components/CreditHeader';
import CreditFilters from './components/CreditFilters';
import CreditTable from './components/CreditTable';
import SummaryCards from './components/SummaryCards';
import TaxCreditForm from './forms/TaxCreditForm';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';
import StatusChangeDialog from './components/StatusChangeDialog';
import CreditDetailDialog from './components/CreditDetailDialog';

const TaxCreditManagement: React.FC = () => {
  const {
    // State and filters
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
    
    // UI action handlers
    handleRefresh,
    handleCreateCredit: initCreateCredit,
    handleViewDetails,
    handleExportData,
    
    // CRUD operations
    createCredit,
    updateCredit,
    deleteCredit,
    changeStatus,
  } = useTaxCreditManagement();

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState<TaxCredit | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Handle creating a new credit
  const handleCreateCredit = () => {
    setSelectedCredit(null);
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  // Handle editing a credit
  const handleEditCredit = (credit: TaxCredit) => {
    setSelectedCredit(credit);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  // Handle deleting a credit
  const handleDeleteCredit = (credit: TaxCredit) => {
    setSelectedCredit(credit);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirming credit deletion
  const handleConfirmDelete = (creditId: string) => {
    deleteCredit(creditId);
    setIsDeleteDialogOpen(false);
    toast.success('Crédito excluído com sucesso');
  };

  // Handle changing credit status
  const handleStatusChange = (credit: TaxCredit) => {
    setSelectedCredit(credit);
    setIsStatusDialogOpen(true);
  };

  // Handle confirming status change
  const handleConfirmStatusChange = (newStatus: string, notes: string) => {
    if (selectedCredit) {
      changeStatus(selectedCredit.id, newStatus, notes);
      setIsStatusDialogOpen(false);
      toast.success(`Status atualizado para ${newStatus}`);
    }
  };

  // Handle view credit details
  const handleViewCreditDetails = (creditId: string) => {
    const credit = filteredCredits.find(c => c.id === creditId);
    if (credit) {
      setSelectedCredit(credit);
      setIsDetailDialogOpen(true);
    }
  };

  // Handle saving credit form
  const handleSaveCredit = (data: any) => {
    // Convert string creditAmount to number if needed
    const processedData = {
      ...data,
      creditAmount: typeof data.creditAmount === 'string' 
        ? parseFloat(data.creditAmount) 
        : data.creditAmount
    };
    
    if (isEditMode && selectedCredit) {
      updateCredit(selectedCredit.id, processedData);
      toast.success('Crédito atualizado com sucesso');
    } else {
      createCredit(processedData);
      toast.success('Crédito criado com sucesso');
    }
    
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <SummaryCards summary={summary} />
      
      {/* Header */}
      <CreditHeader
        onRefresh={handleRefresh}
        onCreateCredit={handleCreateCredit}
        onExport={handleExportData}
        isListening={isListening}
      />
      
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
      
      {/* Credits Table */}
      <Card>
        <CreditTable
          credits={filteredCredits}
          isLoading={isLoading}
          onViewDetails={handleViewCreditDetails}
          onEdit={handleEditCredit}
          onDelete={handleDeleteCredit}
          onStatusChange={handleStatusChange}
        />
      </Card>
      
      {/* Dialogs and Forms */}
      <TaxCreditForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveCredit}
        initialData={selectedCredit}
        isEdit={isEditMode}
      />
      
      {selectedCredit && (
        <>
          <DeleteConfirmDialog
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            credit={selectedCredit}
            onConfirm={handleConfirmDelete}
          />
          
          <StatusChangeDialog
            open={isStatusDialogOpen}
            onClose={() => setIsStatusDialogOpen(false)}
            credit={selectedCredit}
            onConfirm={handleConfirmStatusChange}
          />
          
          {isDetailDialogOpen && (
            <CreditDetailDialog
              credit={selectedCredit}
              open={isDetailDialogOpen}
              onClose={() => setIsDetailDialogOpen(false)}
              onEdit={() => {
                setIsDetailDialogOpen(false);
                handleEditCredit(selectedCredit);
              }}
              onDelete={() => {
                setIsDetailDialogOpen(false);
                handleDeleteCredit(selectedCredit);
              }}
              onStatusChange={() => {
                setIsDetailDialogOpen(false);
                handleStatusChange(selectedCredit);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TaxCreditManagement;
