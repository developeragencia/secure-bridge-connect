
import { useState } from 'react';
import { TaxCredit } from '@/types/tax-credits';
import { toast } from 'sonner';

export const useCreditDetail = (creditId: string) => {
  const [loading, setLoading] = useState(false);
  
  // Example tax credit with properly typed fields
  const creditDetail: TaxCredit = {
    id: creditId,
    clientId: 'client-1',
    clientName: 'Empresa XYZ',
    documentNumber: '12.345.678/0001-99',
    creditType: 'PIS/COFINS',
    creditAmount: 120000.50,
    originalAmount: 150000.00, // Added properly as optional field in TaxCredit
    periodStart: '2022-01-01',
    periodEnd: '2022-12-31',
    status: 'APPROVED',
    submittedAt: '2023-01-15T10:45:00Z',
    approvedAt: '2023-03-02T14:30:00Z',
    createdAt: '2023-01-10T08:30:00Z',
    updatedAt: '2023-03-02T14:30:00Z',
    notes: 'Crédito aprovado após verificação de documentação completa.',
    attachmentsCount: 5
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  
  const handleEditCredit = () => {
    toast.info('Editar crédito', {
      description: `Abrindo formulário para editar crédito #${creditId}`,
    });
  };
  
  const handleStatusChange = () => {
    toast.info('Alterar status', {
      description: `Abrindo formulário para alterar status do crédito #${creditId}`,
    });
  };
  
  const handleExportReport = () => {
    toast.success('Exportação iniciada', {
      description: `O relatório do crédito #${creditId} está sendo gerado`,
    });
  };
  
  const handleDeleteCredit = () => {
    toast.warning('Confirmar exclusão', {
      description: `Você está prestes a excluir o crédito #${creditId}`,
    });
  };
  
  return {
    credit: creditDetail,
    loading,
    formatCurrency,
    formatDate,
    handleEditCredit,
    handleStatusChange,
    handleExportReport,
    handleDeleteCredit
  };
};

export default useCreditDetail;
