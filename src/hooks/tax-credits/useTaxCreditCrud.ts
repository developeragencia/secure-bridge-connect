
import { useState, useCallback, useEffect } from 'react';
import { TaxCredit } from '@/types/tax-credits';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const useTaxCreditCrud = (initialCredits: TaxCredit[]) => {
  const [credits, setCredits] = useState<TaxCredit[]>(initialCredits);
  
  // Load credits from Supabase on initial render
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const { data, error } = await supabase
          .from('tax_credits')
          .select('*');
          
        if (error) {
          console.error('Error fetching tax credits:', error);
          return;
        }
        
        if (data) {
          setCredits(data as TaxCredit[]);
        }
      } catch (error) {
        console.error('Error in fetchCredits:', error);
      }
    };
    
    fetchCredits();
  }, []);

  // Create a new credit
  const createCredit = useCallback(async (creditData: Partial<TaxCredit>) => {
    console.log('Creating credit:', creditData);
    
    try {
      const newCredit: TaxCredit = {
        ...creditData as TaxCredit,
        id: `temp-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('tax_credits')
        .insert([newCredit])
        .select()
        .single();
        
      if (error) {
        console.error('Error creating tax credit:', error);
        toast.error('Erro ao criar crédito', {
          description: 'Não foi possível salvar o crédito tributário',
        });
        return newCredit;
      }
      
      // Update local state with the saved data
      const savedCredit = data as TaxCredit;
      setCredits(prevCredits => [...prevCredits, savedCredit]);
      
      toast.success('Crédito criado', {
        description: 'O crédito tributário foi criado com sucesso',
      });
      
      return savedCredit;
    } catch (error) {
      console.error('Error in createCredit:', error);
      toast.error('Erro ao criar crédito', {
        description: 'Não foi possível salvar o crédito tributário',
      });
      return creditData as TaxCredit;
    }
  }, []);

  // Update an existing credit
  const updateCredit = useCallback(async (creditId: string, creditData: Partial<TaxCredit>) => {
    console.log('Updating credit:', creditId, creditData);
    
    try {
      // Update in Supabase
      const { error } = await supabase
        .from('tax_credits')
        .update({
          ...creditData,
          updatedAt: new Date().toISOString()
        })
        .eq('id', creditId);
        
      if (error) {
        console.error('Error updating tax credit:', error);
        toast.error('Erro ao atualizar crédito', {
          description: 'Não foi possível atualizar o crédito tributário',
        });
        return;
      }
      
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
      
      toast.success('Crédito atualizado', {
        description: 'O crédito tributário foi atualizado com sucesso',
      });
    } catch (error) {
      console.error('Error in updateCredit:', error);
      toast.error('Erro ao atualizar crédito', {
        description: 'Não foi possível atualizar o crédito tributário',
      });
    }
  }, []);

  // Delete a credit
  const deleteCredit = useCallback(async (creditId: string) => {
    console.log('Deleting credit:', creditId);
    
    try {
      // Delete from Supabase
      const { error } = await supabase
        .from('tax_credits')
        .delete()
        .eq('id', creditId);
        
      if (error) {
        console.error('Error deleting tax credit:', error);
        toast.error('Erro ao excluir crédito', {
          description: 'Não foi possível excluir o crédito tributário',
        });
        return;
      }
      
      // Update local state
      setCredits(prevCredits => {
        const filteredCredits = prevCredits.filter(credit => credit.id !== creditId);
        console.log('Remaining credits after deletion:', filteredCredits);
        return filteredCredits;
      });
      
      toast.success('Crédito excluído', {
        description: 'O crédito tributário foi excluído com sucesso',
      });
    } catch (error) {
      console.error('Error in deleteCredit:', error);
      toast.error('Erro ao excluir crédito', {
        description: 'Não foi possível excluir o crédito tributário',
      });
    }
  }, []);

  // Change the status of a credit
  const changeStatus = useCallback(async (creditId: string, newStatus: string, notes: string) => {
    console.log('Changing status:', creditId, newStatus, notes);
    
    try {
      const updateData: Partial<TaxCredit> = {
        status: newStatus as TaxCredit['status'],
        updatedAt: new Date().toISOString(),
      };
      
      if (notes) {
        // First get the current credit to append notes
        const currentCredit = credits.find(c => c.id === creditId);
        if (currentCredit) {
          updateData.notes = currentCredit.notes 
            ? `${currentCredit.notes}\n\n${notes}` 
            : notes;
        } else {
          updateData.notes = notes;
        }
      }
      
      // Update in Supabase
      const { error } = await supabase
        .from('tax_credits')
        .update(updateData)
        .eq('id', creditId);
        
      if (error) {
        console.error('Error updating tax credit status:', error);
        toast.error('Erro ao atualizar status', {
          description: 'Não foi possível atualizar o status do crédito',
        });
        return;
      }
      
      // Update local state
      setCredits(prevCredits => {
        const updatedCredits = prevCredits.map(credit => 
          credit.id === creditId 
            ? { 
                ...credit, 
                ...updateData,
              }
            : credit
        );
        console.log('Credits after status change:', updatedCredits);
        return updatedCredits;
      });
      
      toast.success('Status atualizado', {
        description: `O status do crédito foi atualizado para ${newStatus}`,
      });
    } catch (error) {
      console.error('Error in changeStatus:', error);
      toast.error('Erro ao atualizar status', {
        description: 'Não foi possível atualizar o status do crédito',
      });
    }
  }, [credits]);

  return {
    credits,
    setCredits,
    createCredit,
    updateCredit,
    deleteCredit,
    changeStatus
  };
};
