
export type UserRole = 
  | 'MASTER_ADMIN' 
  | 'OFFICE_TEAM' 
  | 'CLIENT' 
  | 'SALES_REP'
  // Backward compatibility roles
  | 'admin' 
  | 'staff' 
  | 'client' 
  | 'representative' 
  | 'office' 
  | 'sales'
  | 'admin_master'
  | 'staff_permanent'
  | 'staff_outsourced'
  | 'commercial_rep';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
  avatar?: string;
  clientId?: string;
  status?: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
  avatar?: string;
  phone?: string;
  position?: string;
  department?: string;
  bio?: string;
  notificationPreferences?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  status?: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia?: string;
  type: 'public' | 'private';
  name?: string; // For backward compatibility
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
  // Backward compatibility
  admin: 'Administrador',
  staff: 'Equipe',
  client: 'Cliente',
  representative: 'Representante',
  office: 'Escritório',
  sales: 'Vendas',
  admin_master: 'Administrador Master',
  staff_permanent: 'Equipe Permanente',
  staff_outsourced: 'Equipe Terceirizada',
  commercial_rep: 'Representante Comercial'
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
  // Backward compatibility
  admin: [
    'all.access',
    'clients.manage',
    'transactions.manage',
    'reports.access',
    'settings.manage',
  ],
  staff: [
    'clients.view',
    'clients.edit',
    'transactions.manage',
    'reports.access',
  ],
  client: [
    'own_data.view',
    'own_transactions.view',
    'own_reports.view',
  ],
  representative: [
    'assigned_clients.view',
    'assigned_clients.edit',
    'transactions.view',
    'reports.view',
  ],
  office: [
    'clients.view',
    'clients.edit',
    'transactions.manage',
    'reports.access',
  ],
  sales: [
    'assigned_clients.view',
    'assigned_clients.edit',
    'transactions.view',
    'reports.view',
  ],
  admin_master: [
    'all.access',
    'clients.manage',
    'transactions.manage',
    'reports.access',
    'settings.manage',
  ],
  staff_permanent: [
    'clients.view',
    'clients.edit',
    'transactions.manage',
    'reports.access',
  ],
  staff_outsourced: [
    'clients.view',
    'clients.edit',
    'transactions.view',
    'reports.view',
  ],
  commercial_rep: [
    'assigned_clients.view',
    'assigned_clients.edit',
    'transactions.view',
    'reports.view',
  ]
};
