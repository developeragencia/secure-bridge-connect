
export interface Audit {
  id: string;
  clientId: string;
  clientName: string;
  documentNumber: string;
  auditType: string;
  startDate: string;
  deadline: string;
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
  assignedTo: string;
  documentsCount: number;
  findings?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuditSummary {
  // Original properties
  totalAudits: number;
  pendingAudits: number;
  inProgressAudits: number;
  completedAudits: number;
  canceledAudits: number;
  
  // Properties used in components
  total: number;
  emAndamento: number;
  pendente: number;
  concluida: number;
  cancelada: number;
}
