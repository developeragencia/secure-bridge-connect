
export type UserRole = 
  | 'MASTER_ADMIN' // Administrador Master
  | 'OFFICE_TEAM' // Equipe do Escritório
  | 'CLIENT' // Cliente
  | 'SALES_REP' // Representante Comercial
  | 'admin' // Backwards compatibility
  | 'staff' // Backwards compatibility
  | 'client' // Backwards compatibility
  | 'representative' // Backwards compatibility
  | 'office' // Backwards compatibility
  | 'sales' // Backwards compatibility
  | 'admin_master' // Backwards compatibility
  | 'staff_permanent' // Backwards compatibility
  | 'staff_outsourced' // Backwards compatibility
  | 'commercial_rep'; // Backwards compatibility

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status?: 'active' | 'inactive';
  permissions?: string[];
  clientId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  position?: string;
  department?: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  role: UserRole;
  status?: 'active' | 'inactive';
  notificationPreferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  position?: string;
  phone?: string;
  department?: string;
  bio?: string;
  notificationPreferences?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

export interface UpdateAvatarResponse {
  avatarUrl: string;
}

export interface Client {
  id: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia?: string;
  address?: {
    street?: string;
    number?: string;
    complement?: string;
    district?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  contactEmail?: string;
  contactPhone?: string;
  type?: 'public' | 'private';
  status?: 'active' | 'inactive';
  createdAt: string;
  updatedAt?: string;
}

export interface CreateClientData {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia?: string;
  address?: {
    street?: string;
    number?: string;
    complement?: string;
    district?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  contactEmail?: string;
  contactPhone?: string;
  type?: 'public' | 'private';
}

export interface UpdateClientData {
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  address?: {
    street?: string;
    number?: string;
    complement?: string;
    district?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  contactEmail?: string;
  contactPhone?: string;
  type?: 'public' | 'private';
  status?: 'active' | 'inactive';
}

export interface ClientsResponse {
  data: Client[];
  total: number;
}
