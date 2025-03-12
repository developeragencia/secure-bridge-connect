
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, Users, DollarSign, Activity, Calendar, TrendingUp, ArrowDown, Layers, FileClock } from 'lucide-react';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jan', valor: 2400 },
  { name: 'Fev', valor: 1398 },
  { name: 'Mar', valor: 9800 },
  { name: 'Abr', valor: 3908 },
  { name: 'Mai', valor: 4800 },
  { name: 'Jun', valor: 3800 },
  { name: 'Jul', valor: 4300 },
];

const lineData = [
  { name: 'Jan', valor: 4000 },
  { name: 'Fev', valor: 4200 },
  { name: 'Mar', valor: 5000 },
  { name: 'Abr', valor: 4780 },
  { name: 'Mai', valor: 6090 },
  { name: 'Jun', valor: 7190 },
  { name: 'Jul', valor: 8090 },
];

const pieData = [
  { name: 'Categoria A', value: 35 },
  { name: 'Categoria B', value: 25 },
  { name: 'Categoria C', value: 20 },
  { name: 'Categoria D', value: 15 },
  { name: 'Categoria E', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdminDashboard = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral das métricas principais</p>
      </motion.div>
      
      {/* Stats */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={itemVariants}
      >
        <Card className="overflow-hidden border-primary/5 hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Usuários</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3" /> 12.5%
              </span>
              desde o último mês
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-primary/5 hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.231</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3" /> 8.2%
              </span>
              desde o último mês
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-primary/5 hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Atividade</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Activity className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,543</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-green-500 flex items-center mr-1">
                <ArrowUpRight className="h-3 w-3" /> 4.3%
              </span>
              desde a última semana
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-primary/5 hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Eventos</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Agendados para este mês
            </p>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Charts */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={itemVariants}
      >
        <Card className="border-primary/5 h-full">
          <CardHeader>
            <CardTitle>Faturamento Mensal</CardTitle>
            <CardDescription>Faturamento mensal durante o último ano</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid rgba(0,0,0,0.1)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="valor" fill="hsl(var(--primary))" name="Valor (R$)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/5 h-full">
          <CardHeader>
            <CardTitle>Crescimento</CardTitle>
            <CardDescription>Tendência de crescimento nos últimos 7 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid rgba(0,0,0,0.1)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="valor" 
                    stroke="hsl(var(--primary))" 
                    name="Valor (R$)"
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Additional Stats */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={itemVariants}
      >
        <Card className="border-primary/5 h-full">
          <CardHeader>
            <CardTitle>Distribuição de Categorias</CardTitle>
            <CardDescription>Divisão percentual por categorias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentual']}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid rgba(0,0,0,0.1)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/5 h-full">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Resumo das últimas atividades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { icon: <Users className="h-4 w-4 text-primary" />, title: 'Novos usuários registrados', time: 'Há 2 horas atrás' },
                { icon: <DollarSign className="h-4 w-4 text-green-500" />, title: 'Novo pagamento recebido', time: 'Ontem às 14:30' },
                { icon: <FileClock className="h-4 w-4 text-amber-500" />, title: 'Relatório mensal gerado', time: 'Há 2 dias atrás' },
                { icon: <Layers className="h-4 w-4 text-purple-500" />, title: 'Atualização do sistema', time: 'Há 3 dias atrás' }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/5 h-full">
          <CardHeader>
            <CardTitle>Resumo de Desempenho</CardTitle>
            <CardDescription>Indicadores principais de desempenho</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Taxa de Conversão', value: '5.24%', change: 1.2, up: true },
                { name: 'Tempo Médio no Sistema', value: '3m 45s', change: 0.8, up: true },
                { name: 'Taxa de Rejeição', value: '42.3%', change: 2.5, up: false },
                { name: 'Retorno de Usuários', value: '67.5%', change: 4.1, up: true }
              ].map((metric, i) => (
                <div key={i} className="flex justify-between items-center py-1 border-b border-border/30 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{metric.name}</p>
                    <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{metric.value}</p>
                    <p className={`text-xs flex items-center ${metric.up ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.up ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {metric.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
