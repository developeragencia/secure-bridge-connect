
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
    // Funções CRUD
    createCredit,
    updateCredit,
    deleteCredit,
    changeStatus
  } = useTaxCreditManagement();
  
  // Função para abrir o formulário de criação de crédito
  const openCreditForm = () => {
    setSelectedCredit(null);
    setIsEditMode(false);
    setIsCreditFormOpen(true);
  };
  
  // Função para abrir o formulário de edição de crédito
  const handleEditCredit = (credit: TaxCredit) => {
    setSelectedCredit(credit);
    setIsEditMode(true);
    setIsCreditFormOpen(true);
  };
  
  // Função para abrir o diálogo de alteração de status
  const handleStatusChange = (credit: TaxCredit) => {
    setSelectedCredit(credit);
    setIsStatusDialogOpen(true);
  };
  
  // Função para confirmar a exclusão de um crédito
  const handleDeleteConfirm = (credit: TaxCredit) => {
    setSelectedCredit(credit);
    setIsDeleteDialogOpen(true);
  };
  
  // Função para salvar um crédito (novo ou editado)
  const handleSaveCredit = (creditData: any) => {
    // Ensure creditAmount is a number
    const formattedCreditData = {
      ...creditData,
      creditAmount: typeof creditData.creditAmount === 'string' 
        ? parseFloat(creditData.creditAmount) 
        : creditData.creditAmount
    };
    
    if (isEditMode && selectedCredit) {
      updateCredit(selectedCredit.id, formattedCreditData);
      toast({
        title: "Crédito atualizado",
        description: "O crédito foi atualizado com sucesso",
      });
    } else {
      createCredit(formattedCreditData);
      toast({
        title: "Crédito criado",
        description: "O novo crédito foi criado com sucesso",
      });
    }
    
    setIsCreditFormOpen(false);
  };
  
  // Função para confirmar a alteração de status
  const handleStatusConfirm = (newStatus: string, notes: string) => {
    if (selectedCredit) {
      changeStatus(selectedCredit.id, newStatus, notes);
      toast({
        title: "Status atualizado",
        description: `O status do crédito foi alterado para ${newStatus}`,
      });
    }
    
    setIsStatusDialogOpen(false);
  };
  
  // Função para confirmar a exclusão
  const handleDeleteCredit = () => {
    if (selectedCredit) {
      deleteCredit(selectedCredit.id);
      toast({
        title: "Crédito excluído",
        description: "O crédito foi excluído com sucesso",
        variant: "destructive",
      });
    }
    
    setIsDeleteDialogOpen(false);
  };

  // Efeito de animação para os cards de resumo
  const { classes: cardClasses } = useAnimationOnScroll<HTMLDivElement>({
    threshold: 0.1,
    transitionType: 'fade-in',
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <CreditHeader 
        onRefresh={handleRefresh} 
        onCreateCredit={openCreditForm}
        isListening={isListening}
      />

      {/* Status Cards */}
      <div className={cardClasses}>
        <CreditSummaryCards summary={summary} />
      </div>

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
          onViewDetails={handleViewDetails}
          onEditCredit={handleEditCredit}
          onStatusChange={handleStatusChange}
          onDeleteCredit={handleDeleteConfirm}
        />
      </Card>

      {/* Credit Form Dialog */}
      <TaxCreditForm
        open={isCreditFormOpen}
        onClose={() => setIsCreditFormOpen(false)}
        onSave={handleSaveCredit}
        initialData={selectedCredit}
        isEdit={isEditMode}
      />

      {/* Status Change Dialog */}
      <StatusChangeDialog
        open={isStatusDialogOpen}
        onClose={() => setIsStatusDialogOpen(false)}
        credit={selectedCredit}
        onConfirm={handleStatusConfirm}
      />

      {/* Delete Confirmation Dialog */}
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
