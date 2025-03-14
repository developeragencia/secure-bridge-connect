import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { 
  AlertTriangle, 
  ArrowRight, 
  Building, 
  Calculator, 
  Calendar, 
  CheckCircle, 
  FileText, 
  Filter, 
  Landmark, 
  Plus, 
  RefreshCw, 
  Search, 
  Settings, 
  Upload 
} from 'lucide-react';
import { useActiveClient } from '@/hooks/useActiveClient';
import ButtonEffect from '../common/ButtonEffect';

const IRRFRecovery = () => {
  const { toast } = useToast();
  const { activeClient } = useActiveClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('2023');
  const [statusFilter, setStatusFilter] = useState('all');

  // Handle new recovery process
  const handleNewRecovery = () => {
    if (!activeClient) {
      toast({
        title: "Cliente não selecionado",
        description: "Por favor, selecione um cliente ativo antes de iniciar um novo processo.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Novo processo de recuperação IRRF/PJ",
      description: `Iniciando novo processo para ${activeClient.name}`,
    });
  };

  // Handle import data
  const handleImportData = () => {
    if (!activeClient) {
      toast({
        title: "Cliente não selecionado",
        description: "Por favor, selecione um cliente ativo antes de importar dados.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Importar dados IRRF/PJ",
      description: `Preparando importação para ${activeClient.name}`,
    });
  };

  // Handle run calculation
  const handleRunCalculation = () => {
    if (!activeClient) {
      toast({
        title: "Cliente não selecionado",
        description: "Por favor, selecione um cliente ativo antes de executar cálculos.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Executar cálculos IRRF/PJ",
      description: `Iniciando cálculos para ${activeClient.name}`,
    });
  };

  // Summary cards data
  const summaryData = [
    {
      title: "Processos Ativos",
      value: "12",
      icon: <Landmark className="h-5 w-5 text-blue-600" />,
      badge: { label: "+2 novos", color: "bg-blue-100 text-blue-800" }
    },
    {
      title: "Total Recuperado",
      value: "R$ 523.450,75",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      badge: { label: "+12% mês", color: "bg-green-100 text-green-800" }
    },
    {
      title: "Em Processamento",
      value: "R$ 825.320,12",
      icon: <RefreshCw className="h-5 w-5 text-amber-600" />,
      badge: { label: "8 processos", color: "bg-amber-100 text-amber-800" }
    },
    {
      title: "Alertas",
      value: "3",
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      badge: { label: "Requer atenção", color: "bg-red-100 text-red-800" }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Recuperação IRRF/PJ</h1>
          <p className="text-muted-foreground">
            Automatização de recuperação de créditos tributários IRRF para Pessoas Jurídicas
          </p>
        </div>
        
        <div className="flex gap-2">
          <ButtonEffect
            onClick={handleNewRecovery}
            icon={<Plus className="h-4 w-4" />}
            label="Novo Processo"
            tooltip="Iniciar novo processo de recuperação"
          />
          
          <ButtonEffect
            onClick={handleImportData}
            icon={<Upload className="h-4 w-4" />}
            label="Importar Dados"
            tooltip="Importar dados para análise"
            variant="outline"
          />
          
          <ButtonEffect
            onClick={handleRunCalculation}
            icon={<Calculator className="h-4 w-4" />}
            label="Executar Cálculos"
            tooltip="Executar cálculos para processos pendentes"
            variant="outline"
          />
        </div>
      </div>
      
      {/* Warning for no active client */}
      {!activeClient && (
        <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800 dark:text-amber-400">Cliente não selecionado</h3>
                <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
                  Selecione um cliente ativo na barra superior para vincular as ações neste módulo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{item.title}</p>
                <h3 className="text-2xl font-bold">{item.value}</h3>
                <Badge variant="secondary" className={`mt-2 ${item.badge.color}`}>
                  {item.badge.label}
                </Badge>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                {item.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar processos..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Ano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="all">Todos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                    <SelectItem value="processing">Em processamento</SelectItem>
                    <SelectItem value="completed">Concluídos</SelectItem>
                    <SelectItem value="error">Com erros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <ButtonEffect
                onClick={() => {
                  setSearchQuery('');
                  setYearFilter('2023');
                  setStatusFilter('all');
                }}
                icon={<RefreshCw className="h-4 w-4" />}
                variant="outline"
                size="icon"
                tooltip="Limpar filtros"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
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
          <Card>
            <CardHeader>
              <CardTitle>Visão Geral da Recuperação IRRF/PJ</CardTitle>
              <CardDescription>
                Acompanhe o status dos processos de recuperação de créditos IRRF para pessoas jurídicas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Processos Recentes</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium truncate">Processo #{1000 + item}</h4>
                            <Badge variant="outline" className="bg-amber-100 text-amber-800">Em Andamento</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Cliente: Prefeitura Municipal</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1.5" />
                              12/06/2023
                            </span>
                            <span className="flex items-center">
                              <FileText className="h-3.5 w-3.5 mr-1.5" />
                              15 documentos
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <span>Ver todos os processos</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Resumo por Status</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Pendentes</span>
                        <span className="text-amber-600 font-medium">24%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '24%' }}></div>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Em Processamento</span>
                        <span className="text-blue-600 font-medium">38%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '38%' }}></div>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Concluídos</span>
                        <span className="text-green-600 font-medium">35%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Com Erros</span>
                        <span className="text-red-600 font-medium">3%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '3%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mt-6">Ações Rápidas</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      <span>Novo Processo</span>
                    </Button>
                    
                    <Button variant="outline" className="flex items-center gap-2">
                      <Calculator className="h-4 w-4" />
                      <span>Calcular</span>
                    </Button>
                    
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Importar</span>
                    </Button>
                    
                    <Button variant="outline" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Configurar</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Processes Tab */}
        <TabsContent value="processes">
          <Card>
            <CardHeader>
              <CardTitle>Processos de Recuperação</CardTitle>
              <CardDescription>
                Gerencie todos os processos de recuperação de créditos IRRF/PJ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Landmark className="h-16 w-16 text-muted-foreground/60 mb-4" />
                <h3 className="text-lg font-medium">Módulo em desenvolvimento</h3>
                <p className="text-muted-foreground mt-1 mb-6 max-w-md">
                  O módulo de processos está sendo desenvolvido e estará disponível em breve.
                </p>
                <Button onClick={handleNewRecovery}>
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Processo de Teste
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Calculations Tab */}
        <TabsContent value="calculations">
          <Card>
            <CardHeader>
              <CardTitle>Cálculos IRRF/PJ</CardTitle>
              <CardDescription>
                Calcule e simule recuperações de créditos tributários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calculator className="h-16 w-16 text-muted-foreground/60 mb-4" />
                <h3 className="text-lg font-medium">Módulo em desenvolvimento</h3>
                <p className="text-muted-foreground mt-1 mb-6 max-w-md">
                  O módulo de cálculos está sendo desenvolvido e estará disponível em breve.
                </p>
                <Button onClick={handleRunCalculation}>
                  <Calculator className="mr-2 h-4 w-4" />
                  Executar Cálculo de Teste
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios IRRF/PJ</CardTitle>
              <CardDescription>
                Visualize relatórios detalhados sobre o processo de recuperação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-16 w-16 text-muted-foreground/60 mb-4" />
                <h3 className="text-lg font-medium">Módulo em desenvolvimento</h3>
                <p className="text-muted-foreground mt-1 mb-6 max-w-md">
                  O módulo de relatórios está sendo desenvolvido e estará disponível em breve.
                </p>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Ver Exemplo de Relatório
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações IRRF/PJ</CardTitle>
              <CardDescription>
                Configure os parâmetros do sistema de recuperação IRRF/PJ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Settings className="h-16 w-16 text-muted-foreground/60 mb-4" />
                <h3 className="text-lg font-medium">Módulo em desenvolvimento</h3>
                <p className="text-muted-foreground mt-1 mb-6 max-w-md">
                  O módulo de configurações está sendo desenvolvido e estará disponível em breve.
                </p>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações Padrão
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IRRFRecovery;

