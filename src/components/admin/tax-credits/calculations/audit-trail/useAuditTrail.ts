
import { useState, useCallback, useMemo } from 'react';
import { AuditLogEntry } from './types';
import { mockAuditLogs } from './mock-data';

export const useAuditTrail = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string | null>(null);
  const [userFilter, setUserFilter] = useState<string | null>(null);
  const [selectedAudit, setSelectedAudit] = useState<AuditLogEntry | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Get all audit logs (in a real app, this would be fetched from an API)
  const auditLogs: AuditLogEntry[] = mockAuditLogs;
  
  // Extract unique users for the filter dropdown
  const uniqueUsers = useMemo(() => {
    const users = new Map();
    auditLogs.forEach(log => {
      if (log.user && !users.has(log.user.id)) {
        users.set(log.user.id, log.user);
      }
    });
    return Array.from(users.values());
  }, [auditLogs]);
  
  // Handle search input changes
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);
  
  // Custom handlers for filter changes to handle empty string conversion to null
  const handleActionFilterChange = useCallback((value: string) => {
    setActionFilter(value === '' ? null : value);
  }, []);
  
  const handleUserFilterChange = useCallback((value: string) => {
    setUserFilter(value === '' ? null : value);
  }, []);
  
  // Filter audit logs based on search query and filters
  const filteredAudits = useMemo(() => {
    return auditLogs.filter(log => {
      // Apply search filter
      const matchesSearch = searchQuery === '' || 
        log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
        (log.details && log.details.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Apply action filter
      const matchesAction = actionFilter === null || log.action === actionFilter;
      
      // Apply user filter
      const matchesUser = userFilter === null || log.user?.id === userFilter;
      
      return matchesSearch && matchesAction && matchesUser;
    });
  }, [auditLogs, searchQuery, actionFilter, userFilter]);
  
  // Open detail dialog for a specific audit log
  const viewDetails = useCallback((audit: AuditLogEntry) => {
    setSelectedAudit(audit);
    setIsDetailsOpen(true);
  }, []);
  
  return {
    searchQuery,
    handleSearch,
    actionFilter,
    setActionFilter: handleActionFilterChange,
    userFilter,
    setUserFilter: handleUserFilterChange,
    selectedAudit,
    isDetailsOpen,
    setIsDetailsOpen,
    filteredAudits,
    viewDetails,
    uniqueUsers,
  };
};
