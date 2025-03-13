
// Define status types used across the application

export type StatusType = 
  | 'PENDING'
  | 'PROCESSING' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'CANCELED'
  | 'COMPLETED'
  | 'ACTIVE'
  | 'INACTIVE'
  | 'ANALYZING'
  | 'RECOVERED';

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

// Add missing types needed for other components
export interface Attachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  uploadedBy: string;
  downloadUrl: string;
}

export interface HistoryItem {
  id: string;
  action: string;
  date: string;
  user: string;
  details?: string;
  status?: StatusType;
}

export type DeclarationType = 'TAX_RETURN' | 'FINANCIAL_STATEMENT' | 'AUDIT_REPORT' | 'REGULATORY_FILING';
