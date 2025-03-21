
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Changes the status of a tax credit in the database
 */
export const changeTaxCreditStatus = async (
  creditId: string, 
  newStatus: string, 
  notes: string,
  existingNotes?: string
) => {
  console.log('Changing status:', creditId, 'to', newStatus);
  
  try {
    // Prepare update data
    const updateData: Record<string, any> = {
      status: newStatus.toLowerCase(),
      updated_at: new Date().toISOString(),
    };
    
    // Append notes if provided
    if (notes) {
      const datePrefix = new Date().toLocaleString('pt-BR');
      const statusNote = `[${datePrefix} - Status alterado para ${newStatus}] ${notes}`;
      updateData.notes = existingNotes 
        ? `${existingNotes}\n\n${statusNote}`
        : statusNote;
    }
    
    // Update approved_at timestamp if status is 'approved'
    if (newStatus.toLowerCase() === 'approved') {
      updateData.approved_at = new Date().toISOString();
    }
    
    console.log('Update data:', updateData);
    
    // Update in Supabase
    const { error } = await supabase
      .from('tax_credits')
      .update(updateData)
      .eq('id', creditId);
      
    if (error) {
      console.error('Error changing tax credit status:', error);
      toast.error('Erro ao alterar status', {
        description: 'Não foi possível alterar o status do crédito tributário',
      });
      return false;
    }
    
    toast.success('Status alterado', {
      description: `O status foi alterado para ${newStatus} com sucesso`,
    });
    
    return true;
  } catch (error) {
    console.error('Error in changeStatus:', error);
    toast.error('Erro ao alterar status', {
      description: 'Não foi possível alterar o status do crédito tributário',
    });
    return false;
  }
};
