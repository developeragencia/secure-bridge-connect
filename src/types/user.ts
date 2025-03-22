export type UserRole = 'MASTER_ADMIN' | 'OFFICE_TEAM' | 'CLIENT' | 'SALES_REP';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
  avatar?: string;
  clientId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia?: string;
  type: 'public' | 'private';
  address: {
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contacts: {
    name: string;
    position: string;
    email: string;
    phone: string;
  }[];
  contractNumber?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  MASTER_ADMIN: 'Administrador Master',
  OFFICE_TEAM: 'Equipe do Escritório',
  CLIENT: 'Cliente',
  SALES_REP: 'Representante Comercial',
};

export const DEFAULT_PERMISSIONS: Record<UserRole, string[]> = {
  MASTER_ADMIN: [
    'all.access',
    'clients.manage',
    'transactions.manage',
    'reports.access',
    'settings.manage',
  ],
  OFFICE_TEAM: [
    'clients.view',
    'clients.edit',
    'transactions.manage',
    'reports.access',
  ],
  CLIENT: [
    'own_data.view',
    'own_transactions.view',
    'own_reports.view',
  ],
  SALES_REP: [
    'assigned_clients.view',
    'assigned_clients.edit',
    'transactions.view',
    'reports.view',
  ],
};
