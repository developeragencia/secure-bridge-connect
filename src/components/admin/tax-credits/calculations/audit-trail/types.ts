
// Audit log entry interface
export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress?: string;
  changes: {
    before: any;
    after: any;
  };
}

// Audit filter interface
export interface AuditFilter {
  searchQuery: string;
  actionType: string | null;
  userId: string | null;
  dateFrom: Date | null;
  dateTo: Date | null;
}

// AuditAction enum for action types
export type AuditAction = 'create' | 'update' | 'delete' | 'status_change' | 'calculation' | 'export' | 'import';

// AuditTrail interface for use in components
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
  previousStatus?: string;
  newStatus?: string;
}
