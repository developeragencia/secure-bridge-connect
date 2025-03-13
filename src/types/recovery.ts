
export interface Client {
  id: string;
  name: string;
  documentNumber: string; // CNPJ
  email: string;
  phone: string;
  address?: string;
  contactPerson?: string;
  industry?: string;
  createdAt: string;
  updatedAt: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface RecoveryProcess {
  id: string;
  clientId: string;
  clientName: string;
  documentNumber: string;
  processType: string;
  creditType: string;
  originalAmount: number;
  recoveredAmount: number;
  recoveryPercent: number;
  currentStatus: string;
  status: 'INICIAL' | 'EM_ANDAMENTO' | 'PARCIAL' | 'CONCLUIDO';
  startDate: string;
  completionDate?: string;
  responsiblePerson: string;
  processNumber: string;
}

export interface RecoverySummary {
  totalProcesses: number;
  completedProcesses: number;
  inProgressProcesses: number;
  successRate: number;
  totalCredits: number;
  recoveredAmount: number;
  avgRecoveryRate: number;
}
