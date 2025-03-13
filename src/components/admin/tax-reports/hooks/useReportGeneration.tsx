
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export function useReportGeneration() {
  const { toast } = useToast();
  const [reportPeriod, setReportPeriod] = useState('last-month');
  const [reportType, setReportType] = useState('complete');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('fiscal');
  const [exportFormat, setExportFormat] = useState('pdf');

  const handleGenerateReport = () => {
    if (isGenerating) return; // Prevent multiple clicks
    
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Relatório gerado com sucesso",
        description: `Seu relatório está pronto para download no formato ${reportType}.`,
      });
    }, 2000);
  };

  const handleExportReport = () => {
    toast({
      title: "Exportando relatório",
      description: `Exportando no formato ${exportFormat.toUpperCase()}.`,
    });
  };

  return {
    reportPeriod,
    setReportPeriod,
    reportType,
    setReportType,
    isGenerating,
    activeTab,
    setActiveTab,
    exportFormat,
    setExportFormat,
    handleGenerateReport,
    handleExportReport
  };
}
