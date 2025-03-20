
import { useState, useCallback, useEffect } from 'react';
import { TaxCredit } from '@/types/tax-credits';
import { fetchTaxCredits } from './fetchTaxCredits';
import { createTaxCredit } from './createTaxCredit';
import { updateTaxCredit } from './updateTaxCredit';
import { deleteTaxCredit } from './deleteTaxCredit';
import { changeTaxCreditStatus } from './changeTaxCreditStatus';

export const useTaxCreditCrud = (initialCredits: TaxCredit[]) => {
  const [credits, setCredits] = useState<TaxCredit[]>(initialCredits);
  
  // Load credits from Supabase on initial render
  useEffect(() => {
    const loadCredits = async () => {
      const fetchedCredits = await fetchTaxCredits();
      if (fetchedCredits.length > 0) {
        setCredits(fetchedCredits);
      }
    };
    
    loadCredits();
  }, []);

  // Create a new credit
  const handleCreateCredit = useCallback(async (creditData: Partial<TaxCredit>) => {
    const savedCredit = await createTaxCredit(creditData);
    
    // Update local state with the saved data
    setCredits(prevCredits => [...prevCredits, savedCredit]);
    
    return savedCredit;
  }, []);

  // Update an existing credit
  const handleUpdateCredit = useCallback(async (creditId: string, creditData: Partial<TaxCredit>) => {
    const success = await updateTaxCredit(creditId, creditData);
    
    if (success) {
      // Update local state
      setCredits(prevCredits => {
        const updatedCredits = prevCredits.map(credit => 
          credit.id === creditId 
            ? { ...credit, ...creditData, updatedAt: new Date().toISOString() }
            : credit
        );
        console.log('Updated credits:', updatedCredits);
        return updatedCredits;
      });
    }
    
    return success;
  }, []);

  // Delete a credit
  const handleDeleteCredit = useCallback(async (creditId: string) => {
    const success = await deleteTaxCredit(creditId);
    
    if (success) {
      // Update local state
      setCredits(prevCredits => {
        const filteredCredits = prevCredits.filter(credit => credit.id !== creditId);
        console.log('Remaining credits after deletion:', filteredCredits);
        return filteredCredits;
      });
    }
    
    return success;
  }, []);

  // Change the status of a credit
  const handleChangeStatus = useCallback(async (creditId: string, newStatus: string, notes: string) => {
    // First get the current credit to append notes
    const currentCredit = credits.find(c => c.id === creditId);
    const success = await changeTaxCreditStatus(creditId, newStatus, notes, currentCredit?.notes);
    
    if (success) {
      // Update local state
      setCredits(prevCredits => {
        const updatedCredits = prevCredits.map(credit => 
          credit.id === creditId 
            ? { 
                ...credit, 
                status: newStatus as TaxCredit['status'],
                notes: notes ? (credit.notes ? `${credit.notes}\n\n${notes}` : notes) : credit.notes,
                updatedAt: new Date().toISOString()
              }
            : credit
        );
        console.log('Credits after status change:', updatedCredits);
        return updatedCredits;
      });
    }
    
    return success;
  }, [credits]);

  return {
    credits,
    setCredits,
    createCredit: handleCreateCredit,
    updateCredit: handleUpdateCredit,
    deleteCredit: handleDeleteCredit,
    changeStatus: handleChangeStatus
  };
};
