
export interface RecoveryProcess {
  id: string;
  clientId: string;
  clientName: string;
  documentNumber: string;
  processType: string;
  originalAmount: number;
  currentStatus: string;
  startDate: string;
  completionDate?: string;
  responsiblePerson: string;
}

export interface RecoverySummary {
  totalProcesses: number;
  completedProcesses: number;
  inProgressProcesses: number;
  successRate: number;
}
