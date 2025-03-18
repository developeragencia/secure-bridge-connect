
import { useEffect } from 'react';
import { mockCredits } from './mockData';
import { useTaxCreditFilters } from './useTaxCreditFilters';
import { useTaxCreditSummary } from './useTaxCreditSummary';
import { useTaxCreditCrud } from './useTaxCreditCrud';
import { useTaxCreditActions } from './useTaxCreditActions';

export const useTaxCreditManagement = () => {
  // Initialize CRUD operations with mock data
  const { 
    credits, 
    setCredits, 
    createCredit, 
    updateCredit, 
    deleteCredit, 
    changeStatus 
  } = useTaxCreditCrud([]);
  
  // Initialize UI actions
  const { 
    isLoading, 
    setIsLoading, 
    isListening, 
    startListening, 
    stopListening, 
    handleRefresh, 
    handleCreateCredit, 
    handleViewDetails, 
    handleExportData 
  } = useTaxCreditActions();
  
  // Initialize filters
  const { 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter, 
    typeFilter, 
    setTypeFilter, 
    filteredCredits 
  } = useTaxCreditFilters(credits);
  
  // Calculate summary
  const summary = useTaxCreditSummary(credits);
  
  // Initial data fetch (simulated)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API request
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Set mock data
        setCredits(mockCredits);
        
        // Start listening for real-time updates
        startListening();
      } catch (error) {
        console.error('Error fetching credits:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Cleanup: stop listening when component unmounts
    return () => {
      stopListening();
    };
  }, [setCredits, setIsLoading, startListening, stopListening]);

  // Return all needed values and functions
  return {
    // State and filters
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredCredits,
    summary,
    isLoading,
    isListening,
    
    // UI action handlers
    handleRefresh,
    handleCreateCredit,
    handleViewDetails,
    handleExportData,
    
    // CRUD operations - explicitly return these to fix TypeScript errors
    createCredit,
    updateCredit,
    deleteCredit,
    changeStatus,
  };
};
