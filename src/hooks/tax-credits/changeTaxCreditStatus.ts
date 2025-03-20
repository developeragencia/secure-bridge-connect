
import { supabase } from '@/integrations/supabase/client';
import { TaxCredit } from '@/types/tax-credits';
import { toast } from 'sonner';

/**
 * Changes the status of a tax credit in the database
 */
export const changeTaxCreditStatus = async (creditId: string, newStatus: string, notes: string, currentNotes?: string) => {
  console.log('Changing status:', creditId, newStatus, notes);
  
  try {
    const updateData: any = {
      status: newStatus.toLowerCase(),
      updated_at: new Date().toISOString(),
    };
    
    if (notes) {
      // Append new notes to existing notes if available
      const updatedNotes = currentNotes 
        ? `${currentNotes}\n\n${notes}` 
        : notes;
      updateData.notes = updatedNotes;
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
      return false;
    }
    
    toast.success('Status atualizado', {
      description: `O status do crédito foi atualizado para ${newStatus}`,
    });
    
    return true;
  } catch (error) {
    console.error('Error in changeStatus:', error);
    toast.error('Erro ao atualizar status', {
      description: 'Não foi possível atualizar o status do crédito',
    });
    return false;
  }
};
