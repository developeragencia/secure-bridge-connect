
import { StatusType } from './declarations';

export interface TaxCredit {
  id: string;
  clientName: string;
  clientId: string;
  documentNumber: string;
  creditType: string;
  creditAmount: number;
  periodStart: string | Date;
  periodEnd: string | Date;
  status: StatusType;
  createdAt: string | Date;
  updatedAt?: string | Date;
  approvedAt?: string | Date;
  submittedAt?: string | Date;
  notes?: string;
  attachmentsCount?: number;
}

export interface TaxCreditSummary {
  total: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  totalValue: number;
  pendingValue: number;
  approvedValue: number;
}

export interface TaxCreditFilterParams {
  status?: StatusType;
  type?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  searchQuery?: string;
}
