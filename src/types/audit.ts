
import { StatusType } from './declarations';

export interface Audit {
  id: string;
  clientName: string;
  documentNumber: string;
  auditType: string;
  startDate: string | Date;
  deadline: string | Date;
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
  documentsCount: number;
  assignedTo?: string;
  notes?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface AuditSummary {
  total: number;
  pendentes: number;
  emAndamento: number;
  concluidas: number;
  canceladas: number;
}

export interface AuditFilterParams {
  status?: string;
  type?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  searchQuery?: string;
}
