
import React, { useState } from 'react';
import { Lightbulb, Search, ChevronDown, ArrowRight, FileCheck, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import TabTitleSection from '../header/TabTitleSection';
import { useClientStore } from '@/hooks/useClientStore';
import NewCreditAnalysisModal, { AnalysisFormData } from './components/NewCreditAnalysisModal';

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Oportunidades Identificadas"
          value="124"
          icon={<Lightbulb className="h-5 w-5 text-amber-500" />}
          description="23 novas nos últimos 30 dias"
        />
        <SummaryCard
          title="Créditos Potenciais"
          value="R$ 2.856.432,67"
          icon={<FileCheck className="h-5 w-5 text-emerald-500" />}
          description="Valor total estimado"
        />
        <SummaryCard
          title="Análises em Andamento"
          value="42"
          icon={<Clock className="h-5 w-5 text-blue-500" />}
          description="8 concluídas esta semana"
        />
        <SummaryCard
          title="Alertas Fiscais"
          value="17"
          icon={<AlertCircle className="h-5 w-5 text-red-500" />}
          description="5 críticos, 12 médios"
        />
      </div>

      {/* Analysis progress card (shows when analysis is running) */}
      {isAnalyzing && (
        <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle>Análise em Andamento</CardTitle>
            <CardDescription>
              {analysisProgress < 100 
                ? "Analisando pagamentos e identificando possíveis créditos tributários..." 
                : "Análise concluída. Processando resultados..."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso</span>
                <span>{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
              
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Pagamentos analisados</span>
                  <span>{Math.floor((analysisProgress / 100) * 843)} / 843</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Fornecedores processados</span>
                  <span>{Math.floor((analysisProgress / 100) * 142)} / 142</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Possíveis créditos identificados</span>
                  <span>{Math.floor((analysisProgress / 100) * 18)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          {analysisProgress < 100 && (
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setIsAnalyzing(false)}
              >
                Cancelar Análise
              </Button>
            </CardFooter>
          )}
        </Card>
      )}

      {/* Search and filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar oportunidades por cliente ou tributo..."
            className="w-full bg-background pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center justify-between">
          <span>Filtrar por tributo</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" className="flex items-center justify-between">
          <span>Período</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" className="flex items-center justify-between">
          <span>Status</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button onClick={handleNewAnalysis}>Nova Análise</Button>
      </div>

      {/* Main content tabs */}
      <Tabs defaultValue="opportunities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
          <TabsTrigger value="analysis">Análises</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <OpportunityCard
              title="Crédito de PIS/COFINS sobre insumos"
              client="Empresa ABC Ltda"
              value="R$ 345.678,90"
              confidence={94}
              date="01/07/2023"
              status="Disponível"
            />
            <OpportunityCard
              title="Compensação de IRPJ"
              client="XYZ Indústria S.A."
              value="R$ 156.789,23"
              confidence={87}
              date="28/06/2023"
              status="Disponível"
            />
            <OpportunityCard
              title="Exclusão do ICMS da base de PIS/COFINS"
              client="Tech Solutions Ltda"
              value="R$ 567.123,45"
              confidence={96}
              date="15/06/2023"
              status="Em análise"
            />
            <OpportunityCard
              title="Crédito Extemporâneo de IPI"
              client="Comércio Geral Ltda"
              value="R$ 89.456,78"
              confidence={82}
              date="10/06/2023"
              status="Em análise"
            />
            <OpportunityCard
              title="Ressarcimento de ICMS-ST"
              client="Distribuidora Norte Ltda"
              value="R$ 123.987,65"
              confidence={91}
              date="05/06/2023"
              status="Aprovado"
            />
            <OpportunityCard
              title="Compensação de INSS sobre folha"
              client="Serviços Gerais S.A."
              value="R$ 234.567,89"
              confidence={88}
              date="01/06/2023"
              status="Aprovado"
            />
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análises em Andamento</CardTitle>
              <CardDescription>Análises de identificação de créditos em processamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AnalysisItem
                  client="Empresa ABC Ltda"
                  type="Análise Completa"
                  period="Jan 2020 - Dez 2022"
                  progress={65}
                  estimatedCompletion="15/07/2023"
                />
                <AnalysisItem
                  client="XYZ Indústria S.A."
                  type="PIS/COFINS"
                  period="2022"
                  progress={80}
                  estimatedCompletion="10/07/2023"
                />
                <AnalysisItem
                  client="Tech Solutions Ltda"
                  type="IRPJ/CSLL"
                  period="2021-2022"
                  progress={35}
                  estimatedCompletion="22/07/2023"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alertas Fiscais</CardTitle>
              <CardDescription>Alertas identificados durante análises</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Os alertas fiscais estão sendo processados e estarão disponíveis em breve.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Identificações</CardTitle>
              <CardDescription>Histórico de oportunidades de crédito identificadas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">O histórico completo de identificações estará disponível em breve.</p>
            </CardContent>
          </Card>
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

// Helper component for summary cards
interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  icon, 
  description 
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

// Helper component for opportunity cards
interface OpportunityCardProps {
  title: string;
  client: string;
  value: string;
  confidence: number;
  date: string;
  status: 'Disponível' | 'Em análise' | 'Aprovado' | 'Negado';
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  title,
  client,
  value,
  confidence,
  date,
  status,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'disponível':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'em análise':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'aprovado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="overflow-hidden transition hover:shadow-md hover:border-primary/60">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={getStatusColor(status)}>
            {status}
          </Badge>
          <div className="text-sm font-medium">
            Confiança: 
            <span className={confidence >= 90 ? 'text-green-600' : confidence >= 80 ? 'text-amber-600' : 'text-gray-600'}>
              {' '}{confidence}%
            </span>
          </div>
        </div>
        <CardTitle className="text-base mt-2">{title}</CardTitle>
        <CardDescription>{client}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm text-muted-foreground">Valor potencial</p>
            <p className="text-lg font-bold">{value}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Identificado em</p>
            <p className="text-sm">{date}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/20 border-t pt-3">
        <Button variant="ghost" className="w-full justify-between">
          <span>Ver detalhes</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Helper component for analysis items
interface AnalysisItemProps {
  client: string;
  type: string;
  period: string;
  progress: number;
  estimatedCompletion: string;
}

const AnalysisItem: React.FC<AnalysisItemProps> = ({
  client,
  type,
  period,
  progress,
  estimatedCompletion,
}) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium">{client}</h4>
          <p className="text-sm text-muted-foreground">{type} • Período: {period}</p>
        </div>
        <Button variant="outline" size="sm">Detalhes</Button>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Progresso da análise</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>Conclusão estimada: {estimatedCompletion}</span>
        </div>
      </div>
    </div>
  );
};

export default CreditIdentification;
