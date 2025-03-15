
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { toast } from 'sonner';
import SimulationTab from './components/SimulationTab';
import PerDcompTab from './components/PerDcompTab';
import JudicialDecisionsTab from './components/JudicialDecisionsTab';
import TabsContainer from './components/TabsContainer';
import ReportsHeader from './components/ReportsHeader';
import { useTaxCompensation } from './hooks/useTaxCompensation';

const TaxCompensationReportsPanel: React.FC = () => {
  const {
    creditValue,
    simulationDate,
    includeSelicCorrection,
    reportType,
    activeTab,
    setActiveTab,
    isGenerating,
    isCalendarOpen,
    simulationHistory,
    setIsCalendarOpen,
    handleValueChange,
    setSimulationDate,
    setIncludeSelicCorrection,
    setReportType,
    handleGenerate,
    handleExport,
    handleSimulateSelic
  } = useTaxCompensation();

  const handleRefresh = () => {
    toast("Atualizando dados", {
      description: "Os dados estão sendo atualizados"
    });
  };

  const handleFilter = () => {
    toast("Filtros", {
      description: "Abrindo painel de filtros"
    });
  };

  return (
    <div className="space-y-6">
      <ReportsHeader
        onExport={handleExport}
        onFilter={handleFilter}
        onGenerateReport={handleGenerate}
        onRefresh={handleRefresh}
      />
      
      <TabsContainer activeTab={activeTab} setActiveTab={setActiveTab}>
        <TabsContent value="simulation" className="space-y-4 pt-4">
          <SimulationTab
            creditValue={creditValue}
            simulationDate={simulationDate}
            includeSelicCorrection={includeSelicCorrection}
            reportType={reportType}
            isGenerating={isGenerating}
            isCalendarOpen={isCalendarOpen}
            simulationHistory={simulationHistory}
            setIsCalendarOpen={setIsCalendarOpen}
            handleValueChange={handleValueChange}
            setSimulationDate={setSimulationDate}
            setIncludeSelicCorrection={setIncludeSelicCorrection}
            setReportType={setReportType}
            handleSimulateSelic={handleSimulateSelic}
            handleGenerate={handleGenerate}
          />
        </TabsContent>
        
        <TabsContent value="per_dcomp" className="space-y-4 pt-4">
          <PerDcompTab
            isGenerating={isGenerating}
            handleGenerate={handleGenerate}
            handleExport={handleExport}
          />
        </TabsContent>
        
        <TabsContent value="judicial" className="space-y-4 pt-4">
          <JudicialDecisionsTab
            isGenerating={isGenerating}
            handleGenerate={handleGenerate}
            handleExport={handleExport}
          />
        </TabsContent>
      </TabsContainer>
    </div>
  );
};

export default TaxCompensationReportsPanel;
