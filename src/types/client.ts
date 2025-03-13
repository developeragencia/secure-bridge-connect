
export interface Client {
  id: string;
  name: string;
  cnpj: string;
  status: 'active' | 'inactive' | 'pending';
  type: 'public' | 'private';
  segment?: string;
  address?: string;
  city?: string;
  state?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'office' | 'client' | 'sales';
  status: 'active' | 'inactive';
  clientId?: string;
  createdAt: string;
}

export type UserRole = 'admin' | 'office' | 'client' | 'sales';
