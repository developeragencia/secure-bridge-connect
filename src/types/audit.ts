
export interface Audit {
  id: string;
  clientId: string;
  clientName: string;
  documentNumber: string;
  auditType: string;
  startDate: string;
  deadline: string;
  status: "EM_ANDAMENTO" | "PENDENTE" | "CONCLUIDA" | "CANCELADA";
  assignedTo: string;
  documentsCount: number;
}

export interface AuditSummary {
  total: number;
  emAndamento: number;
  pendente: number;
  concluida: number;
  cancelada: number;
}
