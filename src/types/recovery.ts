
export interface RecoveryProcess {
  id: string;
  clientId: string;
  clientName: string;
  documentNumber: string;
  creditType: string;
  originalAmount: number;
  recoveredAmount: number;
  recoveryPercent: number;
  startDate: string;
  status: "INICIAL" | "EM_ANDAMENTO" | "PARCIAL" | "CONCLUIDO";
  processNumber: string;
}

export interface RecoverySummary {
  totalCredits: number;
  recoveredAmount: number;
  avgRecoveryRate: number;
  completedProcesses: number;
}
