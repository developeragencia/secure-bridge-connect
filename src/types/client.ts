
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
  role: UserRole;
  status: 'active' | 'inactive';
  clientId?: string;
  createdAt: string;
  updatedAt?: string;
  lastLogin?: string;
  phoneNumber?: string;
}

export type UserRole = 'admin' | 'office' | 'client' | 'sales';

export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}
