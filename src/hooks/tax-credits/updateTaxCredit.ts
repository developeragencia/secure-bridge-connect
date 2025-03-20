
import { supabase } from '@/integrations/supabase/client';
import { TaxCredit } from '@/types/tax-credits';
import { toast } from 'sonner';
import { prepareUpdateFields } from './taxCreditTransformers';

/**
 * Updates an existing tax credit in the database
 */
export const updateTaxCredit = async (creditId: string, creditData: Partial<TaxCredit>) => {
  console.log('Updating credit:', creditId, creditData);
  
  try {
    // Transform camelCase to snake_case for DB
    const dbData = prepareUpdateFields(creditData);
    
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
      return false;
    }
    
    toast.success('Crédito atualizado', {
      description: 'O crédito tributário foi atualizado com sucesso',
    });
    
    return true;
  } catch (error) {
    console.error('Error in updateCredit:', error);
    toast.error('Erro ao atualizar crédito', {
      description: 'Não foi possível atualizar o crédito tributário',
    });
    return false;
  }
};
