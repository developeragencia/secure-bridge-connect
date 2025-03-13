
export interface TaxCredit {
  id: string;
  clientId: string;
  clientName: string;
  documentNumber: string; // CNPJ
  creditType: "IRRF" | "PIS" | "COFINS" | "CSLL" | "OTHER";
  creditAmount: number;
  originalAmount: number;
  periodStart: string; // ISO date
  periodEnd: string; // ISO date
  status: "PENDING" | "ANALYZING" | "APPROVED" | "REJECTED" | "RECOVERED";
  createdAt: string;
  updatedAt: string;
  documents?: string[]; // Document URLs
  notes?: string;
  assignedTo?: string;
}

export interface Client {
  id: string;
  name: string;
  documentNumber: string; // CNPJ
  email: string;
  phone: string;
  address?: string;
  contactPerson?: string;
  industry?: string;
  createdAt: string;
  updatedAt: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface TaxCreditSummary {
  totalCredits: number;
  pendingCredits: number;
  approvedCredits: number;
  recoveredCredits: number;
  rejectedCredits: number;
}
