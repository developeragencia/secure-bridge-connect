
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, LineChart, PieChart, ResponsiveContainer, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, Line, Pie, Cell
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Download, RefreshCcw } from 'lucide-react';

// Mock data for the dashboard
const monthlyData = [
  { name: 'Jan', IRRF: 4000, PIS: 2400, COFINS: 1800 },
  { name: 'Fev', IRRF: 3000, PIS: 1398, COFINS: 2300 },
  { name: 'Mar', IRRF: 2000, PIS: 9800, COFINS: 2290 },
  { name: 'Abr', IRRF: 2780, PIS: 3908, COFINS: 2000 },
  { name: 'Mai', IRRF: 1890, PIS: 4800, COFINS: 2181 },
  { name: 'Jun', IRRF: 2390, PIS: 3800, COFINS: 2500 },
];

const pieData = [
  { name: 'IRRF', value: 35 },
  { name: 'PIS', value: 15 },
  { name: 'COFINS', value: 25 },
  { name: 'CSLL', value: 15 },
  { name: 'ISS', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const InteractiveDashboardPanel: React.FC = () => {
  const [period, setPeriod] = useState('last-6-months');
  const [view, setView] = useState('comparison');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Dashboard Interativo</h2>
          <p className="text-muted-foreground">Análise gerencial dos dados fiscais e tributários</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCcw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Período</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Mês Atual</SelectItem>
                <SelectItem value="last-month">Mês Anterior</SelectItem>
                <SelectItem value="last-3-months">Últimos 3 Meses</SelectItem>
                <SelectItem value="last-6-months">Últimos 6 Meses</SelectItem>
                <SelectItem value="year-to-date">Ano até a Data</SelectItem>
                <SelectItem value="last-year">Ano Anterior</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Visualização</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={view} onValueChange={setView}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a visualização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comparison">Comparativo de Tributos</SelectItem>
                <SelectItem value="evolution">Evolução de Recuperação</SelectItem>
                <SelectItem value="distribution">Distribuição por Tipo</SelectItem>
                <SelectItem value="projection">Projeção Futura</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Recuperado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">R$ 1.254.789,35</p>
              <span className="ml-2 text-sm text-green-500">+12.5%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Em comparação com o período anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={view} onValueChange={setView} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="comparison">Comparativo</TabsTrigger>
          <TabsTrigger value="evolution">Evolução</TabsTrigger>
          <TabsTrigger value="distribution">Distribuição</TabsTrigger>
          <TabsTrigger value="projection">Projeção</TabsTrigger>
        </TabsList>
        
        <TabsContent value="comparison" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparativo de Tributos</CardTitle>
              <CardDescription>Valores de IRRF, PIS e COFINS nos últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={monthlyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                  <Legend />
                  <Bar dataKey="IRRF" fill="#0088FE" />
                  <Bar dataKey="PIS" fill="#00C49F" />
                  <Bar dataKey="COFINS" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="evolution" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução de Recuperação</CardTitle>
              <CardDescription>Evolução da recuperação de créditos tributários</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={monthlyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                  <Legend />
                  <Line type="monotone" dataKey="IRRF" stroke="#0088FE" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="PIS" stroke="#00C49F" />
                  <Line type="monotone" dataKey="COFINS" stroke="#FFBB28" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distribution" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Tipo de Tributo</CardTitle>
              <CardDescription>Percentual por tipo de tributo recuperado</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projection" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Projeção Futura</CardTitle>
              <CardDescription>Projeção de recuperação para os próximos meses</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">Dados de projeção em desenvolvimento</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveDashboardPanel;
