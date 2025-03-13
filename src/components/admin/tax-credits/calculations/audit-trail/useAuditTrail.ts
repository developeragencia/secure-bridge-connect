
import { useState } from 'react';
import { AuditTrail } from './types';
import { mockAuditTrail, getUniqueUsers } from './mock-data';

export const useAuditTrail = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string | null>(null);
  const [userFilter, setUserFilter] = useState<string | null>(null);
  const [selectedAudit, setSelectedAudit] = useState<AuditTrail | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredAudits = mockAuditTrail.filter(audit => {
    const matchesSearch = searchQuery === '' || 
      audit.userName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      audit.resourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.details.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesAction = !actionFilter || audit.action === actionFilter;
    const matchesUser = !userFilter || audit.userId === userFilter;
    
    return matchesSearch && matchesAction && matchesUser;
  });
  
  const viewDetails = (audit: AuditTrail) => {
    setSelectedAudit(audit);
    setIsDetailsOpen(true);
  };
  
  const uniqueUsers = getUniqueUsers();
  
  return {
    searchQuery,
    setSearchQuery,
    actionFilter,
    setActionFilter,
    userFilter,
    setUserFilter,
    selectedAudit,
    setSelectedAudit,
    isDetailsOpen,
    setIsDetailsOpen,
    handleSearch,
    filteredAudits,
    viewDetails,
    uniqueUsers,
  };
};
