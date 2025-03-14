
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
  // Add missing properties
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
  // Add missing properties
  total: number;
  emAndamento: number;
  pendentes: number;
  concluidas: number;
}
