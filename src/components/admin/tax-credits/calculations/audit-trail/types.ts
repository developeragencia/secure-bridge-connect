
import { StatusType } from '@/types/declarations';

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
  userId: string;
  userName: string;
  userRole: string;
  action: AuditAction;
  resourceType: string;
  resourceId: string;
  resourceName: string;
  details: string;
  ipAddress: string;
  previousStatus?: StatusType;
  newStatus?: StatusType;
}
