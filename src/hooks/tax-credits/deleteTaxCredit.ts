
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Deletes a tax credit from the database
 */
export const deleteTaxCredit = async (creditId: string) => {
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
      return false;
    }
    
    toast.success('Crédito excluído', {
      description: 'O crédito tributário foi excluído com sucesso',
    });
    
    return true;
  } catch (error) {
    console.error('Error in deleteCredit:', error);
    toast.error('Erro ao excluir crédito', {
      description: 'Não foi possível excluir o crédito tributário',
    });
    return false;
  }
};
