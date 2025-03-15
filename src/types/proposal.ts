
export type ProposalStatus = 'REQUEST' | 'ANALYSIS' | 'APPROVED' | 'REJECTED' | 'CONVERTED';

export interface Proposal {
  id: string;
  clientId: string;
  clientName: string;
  cnpj: string;
  title: string;
  description: string;
  service: string;
  value: number;
  status: ProposalStatus;
  createdBy: string;
  createdByName: string;
  representativeId?: string;
  representativeName?: string;
  approvedBy?: string;
  approvedByName?: string;
  rejectedBy?: string;
  rejectedByName?: string;
  rejectionReason?: string;
  contractId?: string;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  convertedAt?: string;
  timeline: ProposalTimelineEvent[];
}

export interface ProposalTimelineEvent {
  id: string;
  proposalId: string;
  type: 'CREATED' | 'UPDATED' | 'ANALYZED' | 'APPROVED' | 'REJECTED' | 'CONVERTED';
  description: string;
  userId: string;
  userName: string;
  createdAt: string;
  metadata?: Record<string, any>;
}
