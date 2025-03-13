
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { TaxCredit } from '@/types/tax-credits';

interface Document {
  id: string;
  name: string;
  size: string;
  date: string;
}

interface HistoryItem {
  id: string;
  date: string;
  action: string;
  user: string;
  status: string;
}

// Mock credit data
const MOCK_CREDIT: TaxCredit = {
  id: '1',
  clientId: '1',
  clientName: 'Empresa ABC Ltda',
  documentNumber: '12.345.678/0001-99',
  creditType: 'PIS/COFINS',
  creditAmount: 145678.90,
  originalAmount: 145678.90,
  periodStart: '2023-01-01',
  periodEnd: '2023-03-31',
  status: 'APPROVED',
  createdAt: '2023-04-15',
  updatedAt: '2023-04-20',
  notes: 'Este crédito foi identificado após análise detalhada dos documentos fiscais. A documentação foi validada pela equipe de auditoria e confirmada com base nas notas fiscais do período.'
};

// Mock history data
const MOCK_HISTORY = [
  { id: '1', date: '2023-04-10T10:30:00', action: 'Crédito identificado', user: 'João Silva', status: 'PENDING' },
  { id: '2', date: '2023-04-12T14:15:00', action: 'Documentação analisada', user: 'Maria Oliveira', status: 'ANALYZING' },
  { id: '3', date: '2023-04-15T09:45:00', action: 'Cálculos validados', user: 'Carlos Santos', status: 'ANALYZING' },
  { id: '4', date: '2023-04-20T16:20:00', action: 'Crédito aprovado', user: 'Sistema', status: 'APPROVED' },
];

// Mock documents
const MOCK_DOCUMENTS = [
  { id: '1', name: 'laudo_tecnico.pdf', size: '1.2 MB', date: '2023-04-10T10:30:00' },
  { id: '2', name: 'notas_fiscais_Q1_2023.xlsx', size: '890 KB', date: '2023-04-10T10:30:00' },
  { id: '3', name: 'relatorio_auditoria.pdf', size: '500 KB', date: '2023-04-15T09:45:00' },
];

export function useCreditDetail(creditId?: string) {
  const [credit, setCredit] = useState<TaxCredit | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchCreditDetails = async () => {
      setIsLoading(true);
      try {
        // Simulação de requisição à API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Usar dados mock para o exemplo
        setCredit(MOCK_CREDIT);
        setDocuments(MOCK_DOCUMENTS);
        setHistory(MOCK_HISTORY);
      } catch (error) {
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os detalhes do crédito.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCreditDetails();
  }, [creditId, toast]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };
  
  const handleStatusChange = (creditId: string, newStatus: string, notes: string) => {
    toast({
      title: "Status atualizado",
      description: `O status do crédito foi alterado para ${newStatus}.`,
    });
    // Atualizar o estado local para simular a mudança
    if (credit) {
      setCredit({
        ...credit,
        status: newStatus as any,
        updatedAt: new Date().toISOString()
      });
      
      // Adicionar ao histórico
      const newEvent = {
        id: `history-${Date.now()}`,
        date: new Date().toISOString(),
        action: `Status alterado para ${newStatus}`,
        user: 'Usuário atual',
        status: newStatus,
      };
      
      setHistory([newEvent, ...history]);
    }
  };
  
  const handleEditCredit = (formData: any) => {
    toast({
      title: "Crédito atualizado",
      description: "As informações do crédito foram atualizadas com sucesso.",
    });
    
    // Atualizar o estado local para simular a edição
    if (credit) {
      setCredit({
        ...credit,
        clientName: formData.clientName,
        documentNumber: formData.documentNumber,
        creditType: formData.creditType,
        creditAmount: parseFloat(formData.creditAmount),
        periodStart: formData.periodStart.toISOString(),
        periodEnd: formData.periodEnd.toISOString(),
        status: formData.status,
        notes: formData.notes,
        updatedAt: new Date().toISOString()
      });
    }
  };
  
  return {
    credit,
    documents,
    history,
    isLoading,
    formatCurrency,
    formatDate,
    formatDateTime,
    handleStatusChange,
    handleEditCredit,
  };
}
