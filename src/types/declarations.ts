
// Define status types used across the application

export type StatusType = 
  | 'PENDING'
  | 'PROCESSING' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'CANCELED'
  | 'COMPLETED'
  | 'ACTIVE'
  | 'INACTIVE';

export interface Declaration {
  id: string;
  title: string;
  description?: string;
  status: StatusType;
  createdAt: string;
  updatedAt?: string;
  clientId: string;
  clientName: string;
  documentNumber: string;
  fiscalYear: string;
  fiscalPeriod: string;
  deadline?: string;
  assignedTo?: string;
  taxType: string;
  amount?: number;
  attachmentsCount: number;
}
