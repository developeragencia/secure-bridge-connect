
export interface Client {
  id: string;
  name: string;
  documentNumber: string;
  email: string;
  phone: string;
  address?: string;
  contactPerson?: string;
  industry?: string;
  createdAt: string;
  updatedAt: string;
  status: "ACTIVE" | "INACTIVE" | "PROSPECT";
  // These properties are used in different parts of the application
  cnpj: string;
  segment: string;
  city: string;
  state: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  type: 'private' | 'public';
  zipCode?: string; // Adding zipCode as optional to fix the errors
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
  clientId?: string; // Adding clientId as optional to fix UserProfileHeader errors
}

export type UserRole = 'admin' | 'staff' | 'client' | 'representative' | 'office' | 'sales';
