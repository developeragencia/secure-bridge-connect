import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';
import { 
  Search, Filter, ArrowRight, FileSearch, Upload, Clock, 
  CheckCircle, AlertTriangle, AlertCircle, FileText, BarChart4,
  Building, Calendar, RefreshCw, Settings, Download, Percent, BarChart2,
  XCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useClientStore } from '@/hooks/useClientStore';
import NewCreditAnalysisModal, { AnalysisFormData } from './NewCreditAnalysisModal';

const MOCK_CREDITS = [
  {
    id: 'CR-1001',
    supplier: 'Empresa de Tecnologia Ltda',
    cnpj: '12.345.678/0001-23',
    paymentDate: '2023-06-15',
    paymentAmount: 25000.00,
    taxableAmount: 20000.00,
    retentionRate: 1.5,
    retentionAmount: 300.00,
    correctionAmount: 28.50,
    totalCredit: 328.50,
    identificationDate: '2023-10-22',
    status: 'approved',
    category: 'technology'
  },
  {
    id: 'CR-1002',
    supplier: 'Consultoria Financeira S/A',
    cnpj: '23.456.789/0001-34',
    paymentDate: '2023-07-10',
    paymentAmount: 35000.00,
    taxableAmount: 35000.00,
    retentionRate: 1.5,
    retentionAmount: 525.00,
    correctionAmount: 42.00,
    totalCredit: 567.00,
    identificationDate: '2023-10-22',
    status: 'pending',
    category: 'consulting'
  },
  {
    id: 'CR-1003',
    supplier: 'Serviços Gráficos ME',
    cnpj: '34.567.890/0001-45',
    paymentDate: '2023-08-05',
    paymentAmount: 8500.00,
    taxableAmount: 8500.00,
    retentionRate: 1.5,
    retentionAmount: 127.50,
    correctionAmount: 8.50,
    totalCredit: 136.00,
    identificationDate: '2023-10-22',
    status: 'approved',
    category: 'printing'
  },
  {
    id: 'CR-1004',
    supplier: 'Manutenção Predial Eireli',
    cnpj: '45.678.901/0001-56',
    paymentDate: '2023-08-18',
    paymentAmount: 12000.00,
    taxableAmount: 12000.00,
    retentionRate: 1.5,
    retentionAmount: 180.00,
    correctionAmount: 10.80,
    totalCredit: 190.80,
    identificationDate: '2023-10-22',
    status: 'rejected',
    category: 'maintenance',
    rejectionReason: 'Serviço isento de retenção conforme IN RFB 1234/2012'
  },
  {
    id: 'CR-1005',
    supplier: 'Sistemas de Segurança S/A',
    cnpj: '56.789.012/0001-67',
    paymentDate: '2023-09-01',
    paymentAmount: 18500.00,
    taxableAmount: 15000.00,
    retentionRate: 1.5,
    retentionAmount: 225.00,
    correctionAmount: 11.25,
    totalCredit: 236.25,
    identificationDate: '2023-10-22',
    status: 'pending',
    category: 'security'
  }
];

const CreditIdentificationPanel = () => {
  const [activeTab, setActiveTab] = useState('identification');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState({
    monthsToAnalyze: 60,
    includeCorrectionSelic: true,
    minimumCreditValue: 100,
    automaticallyApprove: false
  });
  
  const { activeClient } = useClientStore();
  const { toast } = useToast();

  const filteredCredits = MOCK_CREDITS.filter(credit => 
    credit.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    credit.cnpj.includes(searchQuery) ||
    credit.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartAnalysis = () => {
    if (!activeClient) {
      toast({
        title: "Cliente não selecionado",
        description: "Selecione um cliente ativo para iniciar a análise.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalysisModalOpen(true);
  };

  const handleAnalysisSubmit = (data: AnalysisFormData) => {
    setIsAnalysisModalOpen(false);
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    toast({
      title: "Análise iniciada",
      description: `Analisando dados do cliente "${activeClient?.name}" no período selecionado.`,
    });
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            toast({
              title: "Análise concluída",
              description: "Foram identificados 5 possíveis créditos tributários.",
            });
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 800);
  };

  const handleApproveCredit = (creditId: string) => {
    toast({
      title: "Crédito aprovado",
      description: `O crédito ${creditId} foi aprovado e será incluído nos relatórios.`,
      variant: "default"
    });
  };

  const handleRejectCredit = (creditId: string) => {
    toast({
      title: "Crédito rejeitado",
      description: `O crédito ${creditId} foi rejeitado e não será considerado para recuperação.`,
      variant: "destructive"
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de identificação de créditos foram atualizadas.",
    });
    setShowSettings(false);
  };

  const totalIdentifiedCredits = MOCK_CREDITS.reduce((sum, credit) => sum + credit.totalCredit, 0);
  const approvedCredits = MOCK_CREDITS.filter(credit => credit.status === 'approved');
  const totalApprovedValue = approvedCredits.reduce((sum, credit) => sum + credit.totalCredit, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Identificação de Créditos</h2>
          <p className="text-muted-foreground">
            Identifique automaticamente os créditos tributários de IRRF/PJ.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={handleStartAnalysis}
            disabled={isAnalyzing}
          >
            <FileSearch className="h-4 w-4" />
            {isAnalyzing ? "Analisando..." : "Iniciar Análise"}
          </Button>
        </div>
      </div>

      {showSettings && (
        <Card>
          <CardHeader>
            <CardTitle>Configurações de Análise</CardTitle>
            <CardDescription>
              Ajuste os parâmetros para identificação de créditos tributários.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="monthsToAnalyze" className="text-sm font-medium">
                  Período de análise (meses)
                </label>
                <Input 
                  id="monthsToAnalyze" 
                  type="number" 
                  value={advancedSettings.monthsToAnalyze}
                  onChange={(e) => setAdvancedSettings({
                    ...advancedSettings, 
                    monthsToAnalyze: parseInt(e.target.value)
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Limite de 60 meses conforme legislação.
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="minimumCreditValue" className="text-sm font-medium">
                  Valor mínimo do crédito (R$)
                </label>
                <Input 
                  id="minimumCreditValue" 
                  type="number" 
                  value={advancedSettings.minimumCreditValue}
                  onChange={(e) => setAdvancedSettings({
                    ...advancedSettings, 
                    minimumCreditValue: parseInt(e.target.value)
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Ignorar créditos abaixo deste valor.
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="includeCorrectionSelic" 
                  className="h-4 w-4"
                  checked={advancedSettings.includeCorrectionSelic}
                  onChange={(e) => setAdvancedSettings({
                    ...advancedSettings, 
                    includeCorrectionSelic: e.target.checked
                  })}
                />
                <label htmlFor="includeCorrectionSelic" className="text-sm font-medium">
                  Aplicar correção pela taxa Selic
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="automaticallyApprove" 
                  className="h-4 w-4"
                  checked={advancedSettings.automaticallyApprove}
                  onChange={(e) => setAdvancedSettings({
                    ...advancedSettings, 
                    automaticallyApprove: e.target.checked
                  })}
                />
                <label htmlFor="automaticallyApprove" className="text-sm font-medium">
                  Aprovar créditos automaticamente
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowSettings(false)}>Cancelar</Button>
            <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
          </CardFooter>
        </Card>
      )}

      {isAnalyzing && (
        <Card>
          <CardHeader>
            <CardTitle>Análise em Andamento</CardTitle>
            <CardDescription>
              {analysisProgress < 100 
                ? "Analisando pagamentos e identificando possíveis créditos tributários..." 
                : "Análise concluída. Revisando os resultados..."}
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
                  <span>{Math.floor((analysisProgress / 100) * 5)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          {analysisProgress < 100 && (
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setIsAnalyzing(false)}>
                Cancelar Análise
              </Button>
            </CardFooter>
          )}
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <CardTitle className="text-sm font-medium">Total Identificado</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalIdentifiedCredits)}
            </div>
            <div className="text-xs text-muted-foreground">Valor total identificado</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalApprovedValue)}
            </div>
            <div className="text-xs text-muted-foreground">{approvedCredits.length} créditos aprovados</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <CardTitle className="text-sm font-medium">Média por Crédito</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                MOCK_CREDITS.length > 0 ? totalIdentifiedCredits / MOCK_CREDITS.length : 0
              )}
            </div>
            <div className="text-xs text-muted-foreground">Valor médio por crédito</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Buscar Créditos Identificados</CardTitle>
          <CardDescription>
            Pesquise por fornecedor, CNPJ ou número de identificação.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Buscar crédito..." 
                className="pl-9" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
              <Button>Buscar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="identification">Identificados</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="approved">Aprovados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="identification" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Créditos Identificados</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
              <CardDescription>
                Lista completa de créditos identificados pelo sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCredits.length > 0 ? (
                  filteredCredits.map((credit) => (
                    <div key={credit.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3 md:mb-0">
                        <div className={`p-2 rounded-full ${
                          credit.status === 'approved' ? "bg-green-500/10" : 
                          credit.status === 'rejected' ? "bg-red-500/10" : 
                          "bg-blue-500/10"
                        }`}>
                          <FileText className={`h-5 w-5 ${
                            credit.status === 'approved' ? "text-green-600" : 
                            credit.status === 'rejected' ? "text-red-600" : 
                            "text-blue-600"
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{credit.id}</p>
                            <Badge variant={
                              credit.status === 'approved' ? "success" : 
                              credit.status === 'rejected' ? "destructive" : 
                              "info"
                            }>
                              {credit.status === 'approved' ? "Aprovado" : 
                               credit.status === 'rejected' ? "Rejeitado" : 
                               "Pendente"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building className="h-3.5 w-3.5" />
                            <span>{credit.supplier}</span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Pagamento: {credit.paymentDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col items-end mr-2">
                          <span className="text-sm font-medium">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(credit.totalCredit)}
                          </span>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Percent className="h-3 w-3 mr-1" />
                            <span>{credit.retentionRate}%</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {credit.status === 'pending' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-2"
                                onClick={() => handleRejectCredit(credit.id)}
                              >
                                <XCircle className="h-3.5 w-3.5 text-red-500" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-2"
                                onClick={() => handleApproveCredit(credit.id)}
                              >
                                <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                              </Button>
                            </>
                          )}
                          <Button variant="outline" size="sm">Detalhes</Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">Nenhum crédito encontrado</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Não foram identificados créditos que correspondam aos seus critérios de busca.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            {filteredCredits.length > 5 && (
              <CardFooter className="flex justify-center">
                <Button variant="outline">Ver Mais</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Créditos Pendentes</CardTitle>
              <CardDescription>
                Créditos tributários identificados aguardando revisão.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCredits.filter(credit => credit.status === 'pending').length > 0 ? (
                  filteredCredits.filter(credit => credit.status === 'pending').map((credit) => (
                    <div key={credit.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3 md:mb-0">
                        <div className="bg-blue-500/10 p-2 rounded-full">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{credit.id}</p>
                            <Badge variant="info">Pendente</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building className="h-3.5 w-3.5" />
                            <span>{credit.supplier}</span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                            <span>{credit.cnpj}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col items-end mr-2">
                          <span className="text-sm font-medium">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(credit.totalCredit)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Pagamento: {credit.paymentDate}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 px-2"
                            onClick={() => handleRejectCredit(credit.id)}
                          >
                            Rejeitar
                          </Button>
                          <Button 
                            variant="success" 
                            size="sm"
                            onClick={() => handleApproveCredit(credit.id)}
                          >
                            Aprovar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">Nenhum crédito pendente</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Não há créditos pendentes de revisão no momento.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Créditos Aprovados</CardTitle>
                  <CardDescription>
                    Créditos tributários aprovados para compensação.
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Relatório
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCredits.filter(credit => credit.status === 'approved').length > 0 ? (
                  filteredCredits.filter(credit => credit.status === 'approved').map((credit) => (
                    <div key={credit.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3 md:mb-0">
                        <div className="bg-green-500/10 p-2 rounded-full">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{credit.id}</p>
                            <Badge variant="success">Aprovado</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building className="h-3.5 w-3.5" />
                            <span>{credit.supplier}</span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                            <RefreshCw className="h-3.5 w-3.5" />
                            <span>Atualizado: {credit.identificationDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col items-end mr-2">
                          <span className="text-sm font-medium">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(credit.totalCredit)}
                          </span>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="text-green-600">+</span>
                            <span>
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(credit.correctionAmount)}
                            </span>
                            <span className="ml-1">(Selic)</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <ArrowRight className="mr-2 h-4 w-4" />
                          Compensar
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">Nenhum crédito aprovado</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Não há créditos aprovados que correspondam aos seus critérios de busca.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <NewCreditAnalysisModal 
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        onSubmit={handleAnalysisSubmit}
      />
    </div>
  );
};

export default CreditIdentificationPanel;
