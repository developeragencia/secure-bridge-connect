
export type StatusType = 'PENDING' | 'ANALYZING' | 'APPROVED' | 'REJECTED' | 'RECOVERED' | 'SUBMITTED' | 'PROCESSING';

export interface Attachment {
  id: string;
  name: string;
  size: string;
  date: string;
}

export interface HistoryItem {
  id: string;
  date: string;
  action: string;
  user: string;
  status: StatusType;
}

export interface DeclarationType {
  id: string;
  type: string;
  title: string;
  period: string;
  periodName: string;
  dueDate: string;
  submissionDate: string;
  status: StatusType;
  amount: string;
  protocol: string;
  fiscalYear: string;
  taxOffice: string;
  company: string;
  cnpj: string;
  submittedBy: string;
  attachments: Attachment[];
  history: HistoryItem[];
}
