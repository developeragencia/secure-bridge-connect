
import { useState } from 'react';
import { Declaration, StatusType } from '@/types/declarations';

// No need for DeclarationType since we've defined it in declarations.ts
export const useDeclarationData = () => {
  const [declarations, setDeclarations] = useState<Declaration[]>([
    {
      id: '1',
      title: 'Declaração de Imposto de Renda 2023',
      description: 'Declaração anual de IR da empresa XYZ',
      status: 'PENDING',
      createdAt: '2023-01-15T10:30:00Z',
      updatedAt: '2023-01-16T14:20:00Z',
      clientId: 'client-1',
      clientName: 'Empresa XYZ Ltda',
      documentNumber: '12.345.678/0001-99',
      fiscalYear: '2022',
      fiscalPeriod: 'Anual',
      deadline: '2023-04-30T23:59:59Z',
      assignedTo: 'João Silva',
      taxType: 'IRPJ',
      amount: 25000.00,
      attachmentsCount: 5
    },
    {
      id: '2',
      title: 'Declaração de ICMS Janeiro/2023',
      status: 'COMPLETED',
      createdAt: '2023-02-05T09:15:00Z',
      clientId: 'client-2',
      clientName: 'Comércio ABC S/A',
      documentNumber: '98.765.432/0001-10',
      fiscalYear: '2023',
      fiscalPeriod: 'Janeiro',
      assignedTo: 'Maria Oliveira',
      taxType: 'ICMS',
      amount: 12350.75,
      attachmentsCount: 3
    },
    {
      id: '3',
      title: 'Declaração de PIS/COFINS 1º Trimestre',
      description: 'Declaração trimestral de PIS/COFINS',
      status: 'PROCESSING',
      createdAt: '2023-03-10T11:45:00Z',
      clientId: 'client-1',
      clientName: 'Empresa XYZ Ltda',
      documentNumber: '12.345.678/0001-99',
      fiscalYear: '2023',
      fiscalPeriod: '1º Trimestre',
      deadline: '2023-04-15T23:59:59Z',
      taxType: 'PIS/COFINS',
      amount: 18750.25,
      attachmentsCount: 2
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDeclarations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Data is already set in useState
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar declarações');
      setLoading(false);
    }
  };

  const updateDeclarationStatus = (id: string, status: StatusType) => {
    setDeclarations(prev => 
      prev.map(decl => 
        decl.id === id ? { ...decl, status, updatedAt: new Date().toISOString() } : decl
      )
    );
  };

  return { 
    declarations, 
    loading, 
    error, 
    fetchDeclarations,
    updateDeclarationStatus
  };
};
