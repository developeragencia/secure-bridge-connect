
import { Client as ClientBase } from './client';

export interface TaxCredit {
  id: string;
  clientId: string;
  clientName: string;
  documentNumber: string;
  creditType: string;
  creditAmount: number;
  originalAmount: number;
  periodStart: string;
  periodEnd: string;
  status: 'PENDING' | 'ANALYZING' | 'APPROVED' | 'REJECTED' | 'RECOVERED';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  notes?: string;
}

export interface TaxCreditSummary {
  totalCredits: number;
  pendingCredits: number;
  approvedCredits: number;
  recoveredCredits: number;
  rejectedCredits: number;
}

// Use the correct client type to avoid conflicts with recovery.ts
export type Client = ClientBase;
