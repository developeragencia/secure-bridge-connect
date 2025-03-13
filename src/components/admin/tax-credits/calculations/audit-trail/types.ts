
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
