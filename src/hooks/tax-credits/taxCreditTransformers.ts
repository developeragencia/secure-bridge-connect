
import { TaxCredit } from '@/types/tax-credits';
import { DbTaxCredit } from './types';

/**
 * Transforms a database tax credit record to the frontend TaxCredit format
 */
export const dbToTaxCredit = (item: any): TaxCredit => ({
  id: item.id,
  clientName: item.client_name || '',
  clientId: item.client_id || '',
  documentNumber: item.document_number || '',
  creditType: item.credit_type || '',
  creditAmount: item.credit_amount || 0,
  originalAmount: item.original_amount || 0,
  periodStart: item.period_start || '',
  periodEnd: item.period_end || '',
  status: (item.status || 'pending') as TaxCredit['status'],
  notes: item.notes || '',
  createdAt: item.created_at || new Date().toISOString(),
  updatedAt: item.updated_at || undefined,
  approvedAt: item.approved_at || undefined,
  attachmentsCount: item.attachments_count || 0
});

/**
 * Transforms a frontend TaxCredit to database format for creation
 */
export const taxCreditToDbForCreate = (creditData: Partial<TaxCredit>) => ({
  client_name: creditData.clientName || '',
  client_id: creditData.clientId || '',
  document_number: creditData.documentNumber || '',
  credit_type: creditData.creditType || '',
  credit_amount: creditData.creditAmount || 0,
  original_amount: creditData.originalAmount || 0,
  period_start: typeof creditData.periodStart === 'string' ? creditData.periodStart : 
               creditData.periodStart ? creditData.periodStart.toString() : null,
  period_end: typeof creditData.periodEnd === 'string' ? creditData.periodEnd : 
             creditData.periodEnd ? creditData.periodEnd.toString() : null,
  status: (creditData.status || 'pending').toLowerCase(),
  notes: creditData.notes || '',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
});

/**
 * Transforms fields for updating a tax credit
 */
export const prepareUpdateFields = (creditData: Partial<TaxCredit>) => {
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
  
  if (creditData.periodStart !== undefined) {
    dbData.period_start = typeof creditData.periodStart === 'string' 
      ? creditData.periodStart 
      : creditData.periodStart ? creditData.periodStart.toString() : null;
  }
  
  if (creditData.periodEnd !== undefined) {
    dbData.period_end = typeof creditData.periodEnd === 'string' 
      ? creditData.periodEnd 
      : creditData.periodEnd ? creditData.periodEnd.toString() : null;
  }
  
  if (creditData.status !== undefined) dbData.status = creditData.status.toLowerCase();
  if (creditData.notes !== undefined) dbData.notes = creditData.notes;
  if (creditData.approvedAt !== undefined) dbData.approved_at = creditData.approvedAt;
  
  return dbData;
};
