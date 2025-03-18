
import { useState, useCallback } from 'react';
import { TaxCredit } from '@/types/tax-credits';
import { toast } from 'sonner';

export const useTaxCreditCrud = (initialCredits: TaxCredit[]) => {
  const [credits, setCredits] = useState<TaxCredit[]>(initialCredits);

  // Create a new credit
  const createCredit = useCallback((creditData: Partial<TaxCredit>) => {
    console.log('Creating credit:', creditData);
    
    // In a real app, we would call an API to create the credit
    // For now, we'll just add it to the state with a mock ID
    const newCredit: TaxCredit = {
      ...creditData as TaxCredit,
      id: `temp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setCredits(prevCredits => [...prevCredits, newCredit]);
    
    toast.success('Crédito criado', {
      description: 'O crédito tributário foi criado com sucesso',
    });
    
    return newCredit;
  }, []);

  // Update an existing credit
  const updateCredit = useCallback((creditId: string, creditData: Partial<TaxCredit>) => {
    console.log('Updating credit:', creditId, creditData);
    
    // In a real app, we would call an API to update the credit
    setCredits(prevCredits => {
      const updatedCredits = prevCredits.map(credit => 
        credit.id === creditId 
          ? { ...credit, ...creditData, updatedAt: new Date().toISOString() }
          : credit
      );
      console.log('Updated credits:', updatedCredits);
      return updatedCredits;
    });
    
    toast.success('Crédito atualizado', {
      description: 'O crédito tributário foi atualizado com sucesso',
    });
  }, []);

  // Delete a credit
  const deleteCredit = useCallback((creditId: string) => {
    console.log('Deleting credit:', creditId);
    
    // In a real app, we would call an API to delete the credit
    setCredits(prevCredits => {
      const filteredCredits = prevCredits.filter(credit => credit.id !== creditId);
      console.log('Remaining credits after deletion:', filteredCredits);
      return filteredCredits;
    });
    
    toast.success('Crédito excluído', {
      description: 'O crédito tributário foi excluído com sucesso',
    });
  }, []);

  // Change the status of a credit
  const changeStatus = useCallback((creditId: string, newStatus: string, notes: string) => {
    console.log('Changing status:', creditId, newStatus, notes);
    
    // In a real app, we would call an API to update the status
    setCredits(prevCredits => {
      const updatedCredits = prevCredits.map(credit => 
        credit.id === creditId 
          ? { 
              ...credit, 
              status: newStatus as TaxCredit['status'], 
              updatedAt: new Date().toISOString(),
              notes: notes ? `${credit.notes ? credit.notes + '\n\n' : ''}${notes}` : credit.notes
            }
          : credit
      );
      console.log('Credits after status change:', updatedCredits);
      return updatedCredits;
    });
    
    toast.success('Status atualizado', {
      description: `O status do crédito foi atualizado para ${newStatus}`,
    });
  }, []);

  return {
    credits,
    setCredits,
    createCredit,
    updateCredit,
    deleteCredit,
    changeStatus
  };
};
