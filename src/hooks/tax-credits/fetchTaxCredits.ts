
import { supabase } from '@/integrations/supabase/client';
import { TaxCredit } from '@/types/tax-credits';
import { dbToTaxCredit } from './taxCreditTransformers';

/**
 * Fetches all tax credits from the database
 */
export const fetchTaxCredits = async (): Promise<TaxCredit[]> => {
  try {
    const { data, error } = await supabase
      .from('tax_credits')
      .select('*');
      
    if (error) {
      console.error('Error fetching tax credits:', error);
      return [];
    }
    
    if (!data) {
      return [];
    }
    
    // Transform snake_case DB fields to camelCase for frontend
    return data.map(dbToTaxCredit);
  } catch (error) {
    console.error('Error in fetchCredits:', error);
    return [];
  }
};
