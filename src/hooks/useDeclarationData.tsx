
import { useState, useEffect } from 'react';
import { DeclarationType } from '@/types/declarations';

// Mock declaration data
const MOCK_DECLARATION: DeclarationType = {
  id: '1',
  type: 'IRPJ',
  title: 'Declaração de Imposto de Renda Pessoa Jurídica',
  period: '2023-Q1',
  periodName: '1º Trimestre de 2023',
  dueDate: '2023-04-30',
  submissionDate: '2023-04-25',
  status: 'APPROVED',
  amount: 'R$ 12.450,00',
  protocol: 'RF2023040012345678',
  fiscalYear: '2023',
  taxOffice: 'RFB - São Paulo',
  company: 'Empresa XYZ Ltda.',
  cnpj: '12.345.678/0001-90',
  submittedBy: 'João Silva',
  attachments: [
    { id: '1', name: 'declaracao_IRPJ_2023_Q1.pdf', size: '1.2 MB', date: '2023-04-25' },
    { id: '2', name: 'anexo_A_IRPJ_2023.xlsx', size: '890 KB', date: '2023-04-25' },
    { id: '3', name: 'comprovante_pagamento.pdf', size: '500 KB', date: '2023-04-25' }
  ],
  history: [
    { id: '1', date: '2023-04-25 14:30', action: 'Declaração enviada', user: 'João Silva', status: 'SUBMITTED' },
    { id: '2', date: '2023-04-26 09:15', action: 'Recibo gerado', user: 'Sistema RFB', status: 'PROCESSING' },
    { id: '3', date: '2023-04-28 11:45', action: 'Análise concluída', user: 'Sistema RFB', status: 'ANALYZING' },
    { id: '4', date: '2023-04-30 10:20', action: 'Declaração aprovada', user: 'Sistema RFB', status: 'APPROVED' }
  ]
};

export const useDeclarationData = (id: string | undefined) => {
  const [declaration, setDeclaration] = useState<DeclarationType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch the declaration data based on the ID
    // Simulating a fetch operation
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        // Return mock data if ID matches
        if (id === '1') {
          setDeclaration(MOCK_DECLARATION);
        } else {
          setDeclaration(null);
        }
      } catch (error) {
        console.error('Error fetching declaration:', error);
        setDeclaration(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return { declaration, loading, formatDate };
};
