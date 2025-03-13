
import React from 'react';
import ReportsHeader from './components/ReportsHeader';
import TabsContainer from './components/TabsContainer';
import ReportConfigForm from './components/ReportConfigForm';
import RecentReportsList from './components/RecentReportsList';
import { useReportGeneration } from './hooks/useReportGeneration';

const DetailedReportsPanel: React.FC = () => {
  const {
    reportPeriod,
    setReportPeriod,
    reportType,
    setReportType,
    isGenerating,
    activeTab,
    setActiveTab,
    handleGenerateReport
  } = useReportGeneration();

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
      <ReportsHeader />
      <TabsContainer 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        fiscalContent={fiscalContent}
      />
    </div>
  );
};

export default DetailedReportsPanel;
