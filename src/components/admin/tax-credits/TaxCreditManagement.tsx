
import React from 'react';
import { Card } from '@/components/ui/card';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import { useTaxCreditManagement } from '@/hooks/useTaxCreditManagement';

// Import the extracted components
import CreditHeader from './components/CreditHeader';
import CreditSummaryCards from './components/CreditSummaryCards';
import CreditChart from './components/CreditChart';
import CreditFilters from './components/CreditFilters';
import CreditTable from './components/CreditTable';

const TaxCreditManagement: React.FC = () => {
  const {
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
    handleRefresh,
    handleCreateCredit,
    handleViewDetails,
    handleExportData,
  } = useTaxCreditManagement();

  const { classes: cardClasses } = useAnimationOnScroll<HTMLDivElement>({
    threshold: 0.1,
    transitionType: 'fade-in',
  });

  return (
    <div className="space-y-6">
      {/* Header with Create and Refresh buttons */}
      <CreditHeader 
        onRefresh={handleRefresh} 
        onCreateCredit={handleCreateCredit}
        isListening={isListening}
      />

      {/* Summary Cards */}
      {summary && (
        <CreditSummaryCards summary={summary} className={cardClasses} />
      )}

      {/* Overview Chart */}
      {summary && <CreditChart summary={summary} />}

      {/* Filters */}
      <CreditFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        onExportData={handleExportData}
      />

      {/* Tax Credits Table */}
      <Card>
        <CreditTable 
          credits={filteredCredits} 
          isLoading={isLoading} 
          onViewDetails={handleViewDetails} 
        />
      </Card>
    </div>
  );
};

export default TaxCreditManagement;
