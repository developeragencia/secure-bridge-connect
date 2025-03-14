
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Landmark, CheckCircle, RefreshCw, AlertTriangle } from 'lucide-react';
import { useIRRFRecovery } from './hooks/useIRRFRecovery';

// Componentes refatorados
import IRRFHeader from './components/irrf/IRRFHeader';
import SummaryCards from './components/irrf/SummaryCards';
import IRRFFilters from './components/irrf/IRRFFilters';
import OverviewTab from './components/irrf/tabs/OverviewTab';
import { 
  ProcessesTab, 
  CalculationsTab, 
  ReportsTab, 
  SettingsTab 
} from './components/irrf/tabs/UnderDevelopmentTab';

const IRRFRecovery = () => {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    yearFilter,
    setYearFilter,
    statusFilter,
    setStatusFilter,
    summaryData,
    handleNewRecovery,
    handleImportData,
    handleRunCalculation,
    activeClient
  } = useIRRFRecovery();

  // Atualizando os ícones no summaryData
  const summarDataWithIcons = [
    { ...summaryData[0], icon: <Landmark className="h-5 w-5 text-blue-600" /> },
    { ...summaryData[1], icon: <CheckCircle className="h-5 w-5 text-green-600" /> },
    { ...summaryData[2], icon: <RefreshCw className="h-5 w-5 text-amber-600" /> },
    { ...summaryData[3], icon: <AlertTriangle className="h-5 w-5 text-red-600" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <IRRFHeader
        activeClient={activeClient}
        onNewRecovery={handleNewRecovery}
        onImportData={handleImportData}
        onRunCalculation={handleRunCalculation}
      />
      
      {/* Summary Cards */}
      <SummaryCards summaryData={summarDataWithIcons} />
      
      {/* Filters and Search */}
      <IRRFFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="processes">Processos</TabsTrigger>
          <TabsTrigger value="calculations">Cálculos</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <OverviewTab onNewRecovery={handleNewRecovery} />
        </TabsContent>
        
        {/* Processes Tab */}
        <TabsContent value="processes">
          <ProcessesTab onNewRecovery={handleNewRecovery} />
        </TabsContent>
        
        {/* Calculations Tab */}
        <TabsContent value="calculations">
          <CalculationsTab onRunCalculation={handleRunCalculation} />
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IRRFRecovery;
