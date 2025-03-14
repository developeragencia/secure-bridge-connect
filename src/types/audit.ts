
export interface Audit {
  id: string;
  clientName: string;
  auditType: string;
  status: string;
  priority?: string;
  assignedTo?: string;
  date: string;
  completionDate?: string;
  observations?: string;
  documents?: string[];
  documentNumber: string;
  startDate: string;
  deadline: string;
  documentsCount: number;
  notes?: string;
}

export interface AuditSummary {
  totalAudits: number;
  pendingAudits: number;
  completedAudits: number;
  inProgressAudits: number;
  // Additional properties for Portuguese labels
  total: number;
  emAndamento: number;
  pendentes: number;
  concluidas: number;
}
