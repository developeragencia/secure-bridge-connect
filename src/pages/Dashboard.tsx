
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUpRight, BarChart3, CreditCard, CalendarDays, 
  TrendingUp, FileBarChart, Briefcase, FileCheck,
  DollarSign, RefreshCw, Download, MoreHorizontal,
  ChevronDown, ChevronUp, Building, AlertCircle, 
  InfoIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, 
  Cell, LineChart, Line
} from 'recharts';
import { cn } from '@/lib/utils';
import { useClientStore } from '@/hooks/useClientStore';
import { useToast } from '@/components/ui/use-toast';
import ActiveClientHeader from '@/components/ActiveClientHeader';

// Sample data for charts
const monthlyCreditsData = [
  { name: 'Jan', valor: 12000 },
  { name: 'Fev', valor: 15000 },
  { name: 'Mar', valor: 18000 },
  { name: 'Abr', valor: 14000 },
  { name: 'Mai', valor: 21000 },
  { name: 'Jun', valor: 25000 },
  { name: 'Jul', valor: 19000 },
  { name: 'Ago', valor: 22000 },
  { name: 'Set', valor: 28000 },
  { name: 'Out', valor: 26000 },
  { name: 'Nov', valor: 30000 },
  { name: 'Dez', valor: 33000 },
];

const creditTypeData = [
  { name: 'IRRF', value: 45 },
  { name: 'PIS', value: 20 },
  { name: 'COFINS', value: 25 },
  { name: 'CSLL', value: 10 },
];

const COLORS = ['#3b82f6', '#10b981', '#f97316', '#8b5cf6'];

const lastTransactionsData = [
  { 
    id: '1', 
    description: 'Recuperação de crédito IRRF', 
    value: 5432.10, 
    date: '2023-10-15', 
    status: 'completed',
    client: 'Empresa ACME Ltda'
  },
  { 
    id: '2', 
    description: 'Recuperação de crédito PIS', 
    value: 2145.85, 
    date: '2023-10-10', 
    status: 'processing',
    client: 'Indústrias XYZ S/A'
  },
  { 
    id: '3', 
    description: 'Recuperação de crédito COFINS', 
    value: 8752.35, 
    date: '2023-10-05', 
    status: 'completed',
    client: 'Tech Solutions Brasil'
  },
  { 
    id: '4', 
    description: 'Recuperação de crédito CSLL', 
    value: 1523.45, 
    date: '2023-09-25', 
    status: 'completed',
    client: 'Empresa ACME Ltda'
  },
];

const Dashboard = () => {
  const { activeClient, allClients } = useClientStore();
  const [dateFilter, setDateFilter] = useState('year');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Calculated values for summary cards
  const totalCredits = 263412.75;
  const pendingAnalysis = 45250.00;
  const pendingDeclarations = 3;
  const creditGrowth = 12.5;

  // Format currency in BRL
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const handleRefreshData = () => {
    toast({
      title: "Dados atualizados",
      description: "Os dados do dashboard foram atualizados com sucesso",
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-sm">
          <p className="text-sm font-medium">{`${label}`}</p>
          <p className="text-sm text-primary">{`Valor: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

  const PieChartCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <ActiveClientHeader />
      
      <div className="container mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              {activeClient ? (
                <span className="flex items-center">
                  <Building className="h-4 w-4 mr-1.5" />
                  Visão geral dos créditos de {activeClient.name}
                </span>
              ) : (
                'Selecione um cliente para visualizar seus dados'
              )}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9"
              onClick={handleRefreshData}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Atualizar Dados
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>
                  Exportar como PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Exportar como Excel
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Exportar como CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {!activeClient ? (
          <div className="bg-muted/40 rounded-lg border border-border p-6 text-center">
            <div className="max-w-md mx-auto">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Nenhum cliente selecionado</h2>
              <p className="text-muted-foreground mb-4">
                Selecione um cliente para visualizar os dados de créditos tributários.
              </p>
              <Button onClick={() => navigate('/clients')}>
                Ver Clientes
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de Créditos
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">
                    {formatCurrency(totalCredits)}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <span className="flex items-center text-emerald-500 font-medium">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {creditGrowth}%
                    </span>
                    <span className="ml-1">vs. mês anterior</span>
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pendente Análise
                  </CardTitle>
                  <FileBarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">
                    {formatCurrency(pendingAnalysis)}
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span>Progresso</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pendente Declaração
                  </CardTitle>
                  <FileCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">
                    {pendingDeclarations} {pendingDeclarations === 1 ? 'declaração' : 'declarações'}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    Próximo prazo: 20/10/2023
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Regularização
                  </CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold mb-1 flex items-center">
                    <div className="h-3 w-3 rounded-full bg-emerald-500 mr-2"></div>
                    Situação Regular
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Última verificação: 03/10/2023
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">
                      Evolução dos Créditos
                    </CardTitle>
                    <div className="flex gap-1">
                      <Button 
                        variant={dateFilter === 'month' ? 'secondary' : 'ghost'} 
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setDateFilter('month')}
                      >
                        Mês
                      </Button>
                      <Button 
                        variant={dateFilter === 'quarter' ? 'secondary' : 'ghost'} 
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setDateFilter('quarter')}
                      >
                        Trimestre
                      </Button>
                      <Button 
                        variant={dateFilter === 'year' ? 'secondary' : 'ghost'} 
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setDateFilter('year')}
                      >
                        Ano
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Evolução dos créditos recuperados ao longo do tempo
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-1">
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyCreditsData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          tickFormatter={(value) => `R$ ${value/1000}k`}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar 
                          dataKey="valor" 
                          fill="var(--primary)" 
                          barSize={30}
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-0">
                  <CardTitle className="text-base font-medium">
                    Distribuição por Tipo
                  </CardTitle>
                  <CardDescription>
                    Distribuição dos créditos por tipo de tributo
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="w-full h-[220px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={creditTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={PieChartCustomLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {creditTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {creditTypeData.map((entry, index) => (
                      <div key={entry.name} className="flex items-center">
                        <div 
                          className="h-3 w-3 rounded-sm mr-2" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-xs">{entry.name}: {entry.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">
                    Últimas Transações
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8"
                    onClick={() => navigate('/transactions')}
                  >
                    Ver todas
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lastTransactionsData.map((transaction) => (
                    <div 
                      key={transaction.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card"
                    >
                      <div className="flex items-start">
                        <div className={cn(
                          "h-9 w-9 rounded-full flex items-center justify-center mr-3",
                          transaction.status === 'completed' ? "bg-green-100" : "bg-amber-100"
                        )}>
                          <CreditCard className={cn(
                            "h-5 w-5",
                            transaction.status === 'completed' ? "text-green-600" : "text-amber-600"
                          )} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{transaction.description}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-muted-foreground">
                              {formatDate(transaction.date)}
                            </span>
                            <span className="mx-1.5 text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              {transaction.client}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {formatCurrency(transaction.value)}
                        </div>
                        <div className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium mt-1",
                          transaction.status === 'completed' 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        )}>
                          {transaction.status === 'completed' ? 'Concluído' : 'Em processamento'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    Próximas Etapas
                  </CardTitle>
                  <CardDescription>
                    Próximas etapas para otimização fiscal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background">
                        <span className="text-sm font-bold text-primary">1</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium">Análise fiscal de Outubro</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Realizar análise fiscal dos documentos de Outubro/2023
                        </p>
                        <Button variant="link" size="sm" className="h-auto p-0 mt-1 text-xs">
                          Iniciar análise
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted bg-background">
                        <span className="text-sm font-bold text-muted-foreground">2</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium">Preparar declaração PER/DCOMP</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Preparar documentação para solicitar restituição dos créditos
                        </p>
                        <Button variant="link" size="sm" className="h-auto p-0 mt-1 text-xs">
                          Preparar declaração
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted bg-background">
                        <span className="text-sm font-bold text-muted-foreground">3</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium">Revisão de escrituração fiscal</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Revisar documentos fiscais para identificar oportunidades
                        </p>
                        <Button variant="link" size="sm" className="h-auto p-0 mt-1 text-xs">
                          Agendar revisão
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    Alertas Tributários
                  </CardTitle>
                  <CardDescription>
                    Informações importantes sobre prazos e obrigações
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Prazo EFD-Contribuições</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            O prazo para envio da EFD-Contribuições de Set/2023 termina em 5 dias.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <InfoIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Nova legislação publicada</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Nova instrução normativa sobre compensação de tributos foi publicada.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Crédito homologado</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            O crédito de R$ 12.456,78 foi homologado pela Receita Federal.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
