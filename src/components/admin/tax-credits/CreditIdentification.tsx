
import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import TabTitleSection from '../header/TabTitleSection';
import { useClientStore } from '@/hooks/useClientStore';
import NewCreditAnalysisModal, { AnalysisFormData } from './components/NewCreditAnalysisModal';
import CreditSummarySection from './components/CreditSummarySection';
import CreditSearchFilters from './components/CreditSearchFilters';
import AnalysisProgressCard from './components/AnalysisProgressCard';
import OpportunitiesTabContent from './components/OpportunitiesTabContent';
import AnalysisTabContent from './components/AnalysisTabContent';
import PlaceholderTabContent from './components/PlaceholderTabContent';

const CreditIdentification: React.FC = () => {
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { activeClient } = useClientStore();
  const { toast } = useToast();

  const handleNewAnalysis = () => {
    if (!activeClient) {
      toast({
        title: "Cliente não selecionado",
        description: "Selecione um cliente antes de iniciar uma análise.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalysisModalOpen(true);
  };

  const handleAnalysisSubmit = (data: AnalysisFormData) => {
    setIsAnalysisModalOpen(false);
    startAnalysis(data);
  };

  const startAnalysis = (data: AnalysisFormData) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    toast({
      title: "Análise iniciada",
      description: `Analisando dados do cliente "${activeClient?.name}" no período de ${data.startDate?.toLocaleDateString('pt-BR')} a ${data.endDate?.toLocaleDateString('pt-BR')}.`,
    });
    
    // Simulate progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            toast({
              title: "Análise concluída",
              description: "Foram identificadas novas oportunidades de crédito tributário.",
            });
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 800);
  };

  return (
    <div className="space-y-6">
      <TabTitleSection 
        Icon={Lightbulb} 
        title="Identificação de Créditos" 
        description="Ferramenta de identificação automática de oportunidades de créditos tributários."
      />

      {/* Summary cards */}
      <CreditSummarySection />

      {/* Analysis progress card (shows when analysis is running) */}
      {isAnalyzing && (
        <AnalysisProgressCard 
          analysisProgress={analysisProgress} 
          onCancel={() => setIsAnalyzing(false)} 
        />
      )}

      {/* Search and filters */}
      <CreditSearchFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNewAnalysis={handleNewAnalysis}
      />

      {/* Main content tabs */}
      <Tabs defaultValue="opportunities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
          <TabsTrigger value="analysis">Análises</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          <OpportunitiesTabContent />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <AnalysisTabContent />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <PlaceholderTabContent 
            title="Alertas Fiscais" 
            description="Alertas identificados durante análises" 
          />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <PlaceholderTabContent 
            title="Histórico de Identificações" 
            description="Histórico de oportunidades de crédito identificadas" 
          />
        </TabsContent>
      </Tabs>

      {/* Modal for creating a new analysis */}
      <NewCreditAnalysisModal 
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        onSubmit={handleAnalysisSubmit}
      />
    </div>
  );
};

export default CreditIdentification;
