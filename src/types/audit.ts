
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
}

export interface AuditSummary {
  totalAudits: number;
  pendingAudits: number;
  completedAudits: number;
  inProgressAudits: number;
}
