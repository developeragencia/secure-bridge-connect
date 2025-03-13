
import { useState, useCallback, useMemo } from 'react';
import { AuditTrail } from './types';
import { mockAuditLogs } from './mock-data';

export const useAuditTrail = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [userFilter, setUserFilter] = useState<string>("all");
  const [selectedAudit, setSelectedAudit] = useState<AuditTrail | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Get all audit logs (in a real app, this would be fetched from an API)
  const auditLogs: AuditTrail[] = useMemo(() => {
    try {
      return mockAuditLogs || [];
    } catch (error) {
      console.error("Error loading audit logs:", error);
      return [];
    }
  }, []);
  
  // Extract unique users for the filter dropdown
  const uniqueUsers = useMemo(() => {
    try {
      const users = new Map();
      auditLogs.forEach(log => {
        if (!users.has(log.userName)) {
          users.set(log.userName, {
            id: log.userName, // Use username as ID for simplicity
            name: log.userName
          });
        }
      });
      return Array.from(users.values());
    } catch (error) {
      console.error("Error extracting unique users:", error);
      return [];
    }
  }, [auditLogs]);
  
  // Handle search input changes
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);
  
  // Filter audit logs based on search query and filters
  const filteredAudits = useMemo(() => {
    try {
      return auditLogs.filter(log => {
        // Apply search filter
        const matchesSearch = searchQuery === '' || 
          log.resourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.details.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Apply action filter
        const matchesAction = actionFilter === "all" || log.action === actionFilter;
        
        // Apply user filter
        const matchesUser = userFilter === "all" || log.userName === userFilter;
        
        return matchesSearch && matchesAction && matchesUser;
      });
    } catch (error) {
      console.error("Error filtering audits:", error);
      return [];
    }
  }, [auditLogs, searchQuery, actionFilter, userFilter]);
  
  // Open detail dialog for a specific audit log
  const viewDetails = useCallback((audit: AuditTrail) => {
    setSelectedAudit(audit);
    setIsDetailsOpen(true);
  }, []);
  
  return {
    searchQuery,
    handleSearch,
    actionFilter,
    setActionFilter,
    userFilter,
    setUserFilter,
    selectedAudit,
    isDetailsOpen,
    setIsDetailsOpen,
    filteredAudits,
    viewDetails,
    uniqueUsers,
  };
};
