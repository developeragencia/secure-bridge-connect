
export interface Client {
  id: string;
  name: string;
  cnpj: string;
  documentNumber: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  segment?: string;
  type?: 'public' | 'private'; 
}

export interface ClientUserRoles {
  canViewOperations: boolean;
  canEditOperations: boolean;
  canApproveOperations: boolean;
  isAdmin: boolean;
  isRepresentative: boolean;
}

export interface ClientWithPermissions extends Client {
  userRoles?: ClientUserRoles;
}

export interface ClientIdentification {
  clientId: string;
  identificationDate: string;
  sourceType: string;
  sourceDocument: string;
  identifiedAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}
