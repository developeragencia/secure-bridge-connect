
import { useState, useCallback, useEffect } from 'react';
import { TaxCredit } from '@/types/tax-credits';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Type for database credit data
interface DbTaxCredit {
  id: string;
  client_name: string;
  client_id?: string;
  document_number?: string;
  credit_type: string;
  credit_amount: number;
  original_amount?: number;
  period_start?: string;
  period_end?: string;
  status: string;
  notes?: string;
  attachments?: any[];
  created_at: string;
  updated_at: string;
  approved_at?: string;
  created_by?: string;
  attachments_count?: number;
}

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
          // Transform snake_case DB fields to camelCase for frontend
          const transformedData = data.map(item => ({
            id: item.id,
            clientName: item.client_name,
            clientId: item.client_id,
            documentNumber: item.document_number,
            creditType: item.credit_type,
            creditAmount: item.credit_amount,
            originalAmount: item.original_amount,
            periodStart: item.period_start,
            periodEnd: item.period_end,
            status: item.status,
            notes: item.notes,
            attachments: item.attachments,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            approvedAt: item.approved_at,
            createdBy: item.created_by,
            attachmentsCount: item.attachments_count
          })) as TaxCredit[];
          
          setCredits(transformedData);
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
      // Transform camelCase to snake_case for DB
      const dbData = {
        client_name: creditData.clientName,
        client_id: creditData.clientId,
        document_number: creditData.documentNumber,
        credit_type: creditData.creditType,
        credit_amount: creditData.creditAmount,
        original_amount: creditData.originalAmount,
        period_start: creditData.periodStart,
        period_end: creditData.periodEnd,
        status: creditData.status || 'pending',
        notes: creditData.notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('tax_credits')
        .insert([dbData])
        .select()
        .single();
        
      if (error) {
        console.error('Error creating tax credit:', error);
        toast.error('Erro ao criar crédito', {
          description: 'Não foi possível salvar o crédito tributário',
        });
        
        // Return a temporary object for UI continuity
        return {
          ...creditData,
          id: `temp-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as TaxCredit;
      }
      
      if (!data) {
        throw new Error('No data returned from insert operation');
      }
      
      // Transform back to camelCase for frontend
      const savedCredit: TaxCredit = {
        id: data.id,
        clientName: data.client_name,
        clientId: data.client_id,
        documentNumber: data.document_number,
        creditType: data.credit_type,
        creditAmount: data.credit_amount,
        originalAmount: data.original_amount,
        periodStart: data.period_start,
        periodEnd: data.period_end,
        status: data.status,
        notes: data.notes,
        attachments: data.attachments,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        approvedAt: data.approved_at,
        createdBy: data.created_by,
        attachmentsCount: data.attachments_count
      };
      
      // Update local state with the saved data
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
      // Transform camelCase to snake_case for DB
      const dbData: any = {
        updated_at: new Date().toISOString()
      };
      
      // Only include fields that were provided
      if (creditData.clientName !== undefined) dbData.client_name = creditData.clientName;
      if (creditData.clientId !== undefined) dbData.client_id = creditData.clientId;
      if (creditData.documentNumber !== undefined) dbData.document_number = creditData.documentNumber;
      if (creditData.creditType !== undefined) dbData.credit_type = creditData.creditType;
      if (creditData.creditAmount !== undefined) dbData.credit_amount = creditData.creditAmount;
      if (creditData.originalAmount !== undefined) dbData.original_amount = creditData.originalAmount;
      if (creditData.periodStart !== undefined) dbData.period_start = creditData.periodStart;
      if (creditData.periodEnd !== undefined) dbData.period_end = creditData.periodEnd;
      if (creditData.status !== undefined) dbData.status = creditData.status;
      if (creditData.notes !== undefined) dbData.notes = creditData.notes;
      if (creditData.attachments !== undefined) dbData.attachments = creditData.attachments;
      if (creditData.approvedAt !== undefined) dbData.approved_at = creditData.approvedAt;
      
      // Update in Supabase
      const { error } = await supabase
        .from('tax_credits')
        .update(dbData)
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
      const updateData: any = {
        status: newStatus,
        updated_at: new Date().toISOString(),
      };
      
      if (notes) {
        // First get the current credit to append notes
        const currentCredit = credits.find(c => c.id === creditId);
        if (currentCredit) {
          const updatedNotes = currentCredit.notes 
            ? `${currentCredit.notes}\n\n${notes}` 
            : notes;
          updateData.notes = updatedNotes;
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
                status: newStatus as TaxCredit['status'],
                notes: updateData.notes,
                updatedAt: updateData.updated_at
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
