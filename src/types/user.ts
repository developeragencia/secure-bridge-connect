
export type UserRole = 
  | 'admin_master' 
  | 'staff_permanent' 
  | 'staff_outsourced' 
  | 'client' 
  | 'commercial_rep'
  | 'admin'
  | 'staff'
  | 'representative'
  | 'office'
  | 'sales';

export interface UserPermissions {
  viewAllClients: boolean;
  editClients: boolean;
  deleteClients: boolean;
  viewProposals: boolean;
  createProposals: boolean;
  approveProposals: boolean;
  viewOperationalDetails: boolean;
  assignUsers: boolean;
  viewReports: boolean;
  adminAccess: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions?: UserPermissions;
  avatar?: string;
  clientId?: string;
  assignedClientIds?: string[];
  createdAt: string;
  updatedAt?: string;
  lastLoginAt?: string;
  status: 'active' | 'inactive';
}
