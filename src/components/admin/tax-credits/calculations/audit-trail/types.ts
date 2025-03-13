
export type AuditAction = 
  | 'create' 
  | 'update' 
  | 'delete' 
  | 'status_change' 
  | 'calculation' 
  | 'export' 
  | 'import';

export interface AuditTrail {
  id: string;
  date: Date;
  userName: string;
  userRole: string;
  action: AuditAction;
  resourceName: string;
  resourceId: string;
  ipAddress: string;
  details: string;
  previousStatus?: string; // Adding optional previousStatus property
  newStatus?: string; // Adding optional newStatus property
}
