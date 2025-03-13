
import React, { useState } from 'react';
import { Activity, BarChart4, Calendar, ChevronDown, Download, FileBarChart2, Filter, LineChart, PieChart, RefreshCw, Settings2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend, LineChart as RechartsLineChart, Line } from 'recharts';
import TabTitleSection from '../header/TabTitleSection';

// Mock data for charts
const monthlyData = [
  { name: 'Jan', value: 120000 },
  { name: 'Fev', value: 150000 },
  { name: 'Mar', value: 180000 },
  { name: 'Abr', value: 170000 },
  { name: 'Mai', value: 220000 },
  { name: 'Jun', value: 250000 },
  { name: 'Jul', value: 240000 },
  { name: 'Ago', value: 280000 },
  { name: 'Set', value: 260000 },
  { name: 'Out', value: 300000 },
  { name: 'Nov', value: 280000 },
  { name: 'Dez', value: 320000 },
];

const taxTypeData = [
  { name: 'PIS/COFINS', value: 45 },
  { name: 'ICMS', value: 25 },
  { name: 'IRPJ/CSLL', value: 15 },
  { name: 'IPI', value: 10 },
  { name: 'Outros', value: 5 },
];

const statusData = [
  { name: 'Aprovado', value: 60 },
  { name: 'Em Análise', value: 20 },
  { name: 'Pendente', value: 15 },
  { name: 'Negado', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const InteractiveDashboardPanel: React.FC = () => {
  const [period, setPeriod] = useState('year');
  const [year, setYear] = useState('2023');

  return (
    <div className="space-y-6">
      <TabTitleSection 
        Icon={Activity} 
        title="Dashboard Interativo" 
        description="Visualize dados de créditos tributários em tempo real com gráficos e análises interativas."
      />

      {/* Filters and controls */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mês atual</SelectItem>
              <SelectItem value="quarter">Trimestre atual</SelectItem>
              <SelectItem value="year">Ano atual</SelectItem>
              <SelectItem value="custom">Período personalizado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            <span>Atualizar</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Settings2 className="h-4 w-4" />
            <span>Configurar</span>
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total de Créditos"
          value="R$ 2.547.893,45"
          change="+15,3%"
          trend="up"
          icon={<FileBarChart2 className="h-4 w-4" />}
        />
        <SummaryCard
          title="Quantidade de Processos"
          value="127"
          change="+7,5%"
          trend="up"
          icon={<FileBarChart2 className="h-4 w-4" />}
        />
        <SummaryCard
          title="Taxa de Aprovação"
          value="87,4%"
          change="+3,2%"
          trend="up"
          icon={<FileBarChart2 className="h-4 w-4" />}
        />
        <SummaryCard
          title="Tempo Médio de Análise"
          value="32 dias"
          change="-4,1%"
          trend="down"
          icon={<Calendar className="h-4 w-4" />}
        />
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex gap-2 items-center">
            <BarChart4 className="h-4 w-4" />
            <span>Visão Geral</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex gap-2 items-center">
            <LineChart className="h-4 w-4" />
            <span>Tendências</span>
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex gap-2 items-center">
            <PieChart className="h-4 w-4" />
            <span>Distribuição</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex gap-2 items-center">
            <FileBarChart2 className="h-4 w-4" />
            <span>Relatórios</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Créditos por Mês (R$)</CardTitle>
                <CardDescription>Evolução de créditos recuperados ao longo do ano</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`} />
                      <Bar dataKey="value" fill="#8884d8" name="Valor (R$)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Distribuição por Tributo</CardTitle>
                <CardDescription>Porcentagem por tipo de tributo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={taxTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {taxTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status dos Créditos</CardTitle>
              <CardDescription>Distribuição dos créditos por status atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={statusData}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <RechartsTooltip />
                    <Bar dataKey="value" fill="#82ca9d" name="Porcentagem" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tendências de Recuperação</CardTitle>
              <CardDescription>Evolução das recuperações de crédito ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={monthlyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      name="Valor (R$)"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Em breve</CardTitle>
              <CardDescription>Esta funcionalidade será implementada em breve</CardDescription>
            </CardHeader>
            <CardContent className="h-60 flex items-center justify-center">
              <p className="text-center text-muted-foreground">As visualizações de distribuição estão em desenvolvimento.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Em breve</CardTitle>
              <CardDescription>Esta funcionalidade será implementada em breve</CardDescription>
            </CardHeader>
            <CardContent className="h-60 flex items-center justify-center">
              <p className="text-center text-muted-foreground">Os relatórios personalizados estão em desenvolvimento.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper component for summary cards
interface SummaryCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon 
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
          <span className={trend === 'up' ? 'text-emerald-500' : 'text-red-500'}>
            {change}
          </span>
          {' comparado ao período anterior'}
        </p>
      </CardContent>
    </Card>
  );
};

export default InteractiveDashboardPanel;
