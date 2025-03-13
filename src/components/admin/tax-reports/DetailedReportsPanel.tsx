
import React from 'react';
import ReportsHeader from './components/ReportsHeader';
import TabsContainer from './components/TabsContainer';
import ReportConfigForm from './components/ReportConfigForm';
import RecentReportsList from './components/RecentReportsList';
import { useReportGeneration } from './hooks/useReportGeneration';
import { useToast } from '@/components/ui/use-toast';

const DetailedReportsPanel: React.FC = () => {
  const toast = useToast();
  const {
    reportPeriod,
    setReportPeriod,
    reportType,
    setReportType,
    isGenerating,
    activeTab,
    setActiveTab,
    handleGenerateReport,
    handleExportReport
  } = useReportGeneration();

  const handleFilterClick = () => {
    toast.toast({
      title: "Filtros avançados",
      description: "Função de filtros avançados em desenvolvimento.",
    });
  };

  // Fiscal tab content
  const fiscalContent = (
    <>
      <ReportConfigForm
        reportPeriod={reportPeriod}
        setReportPeriod={setReportPeriod}
        reportType={reportType}
        setReportType={setReportType}
        isGenerating={isGenerating}
        onGenerateReport={handleGenerateReport}
      />
      <RecentReportsList />
    </>
  );

  return (
    <div className="space-y-6">
      <ReportsHeader 
        onExport={handleExportReport}
        onFilter={handleFilterClick}
      />
      <TabsContainer 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        fiscalContent={fiscalContent}
      />
    </div>
  );
};

export default DetailedReportsPanel;
