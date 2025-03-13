
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  ArrowUpRight, Users, DollarSign, Activity, Calendar, TrendingUp, ArrowDown, 
  Layers, FileClock, Award, Target, Zap, CreditCard, BarChart3, PieChart as PieChartIcon,
  Clock, FileSpreadsheet, RefreshCcw, Sparkles, CheckCircle, TrendingDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  const [activeChartTab, setActiveChartTab] = useState('barChart');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
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

  // Hover animation variants
  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  // Chart switch tab handler
  const handleChartTabChange = (tab: string) => {
    setActiveChartTab(tab);
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-primary">
          <BarChart3 className="h-8 w-8" /> 
          <span>Dashboard</span>
        </h1>
        <p className="text-muted-foreground text-lg">Visão geral das métricas principais</p>
      </motion.div>
      
      {/* Stats */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={itemVariants}
      >
        {[
          {
            title: "Usuários",
            value: "1,245",
            change: "+12.5%",
            trend: "up",
            period: "mês",
            icon: <Users className="h-5 w-5 text-white" />,
            bgColor: "from-blue-500 to-blue-600"
          },
          {
            title: "Faturamento",
            value: "R$ 45.231",
            change: "+8.2%",
            trend: "up",
            period: "mês",
            icon: <DollarSign className="h-5 w-5 text-white" />,
            bgColor: "from-green-500 to-green-600"
          },
          {
            title: "Atividade",
            value: "2,543",
            change: "+4.3%",
            trend: "up",
            period: "semana",
            icon: <Activity className="h-5 w-5 text-white" />,
            bgColor: "from-purple-500 to-purple-600"
          },
          {
            title: "Eventos",
            value: "12",
            subtitle: "Agendados para este mês",
            icon: <Calendar className="h-5 w-5 text-white" />,
            bgColor: "from-amber-500 to-amber-600"
          }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            variants={cardHoverVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredCard(i)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <Card className={cn(
              "overflow-hidden border-0 shadow-md transition-all duration-300",
              hoveredCard === i ? "ring-2 ring-primary/50" : ""
            )}>
              <div className={cn(
                "absolute top-0 left-0 w-full h-2 bg-gradient-to-r",
                stat.bgColor
              )}></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br",
                  stat.bgColor
                )}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                {stat.change ? (
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className={cn(
                      "flex items-center mr-1",
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    )}>
                      {stat.trend === "up" ? 
                        <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                        <ArrowDown className="h-3 w-3 mr-1" />
                      } 
                      {stat.change}
                    </span>
                    desde o último {stat.period}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.subtitle}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Charts Tabs */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleChartTabChange('barChart')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all",
            activeChartTab === 'barChart' 
              ? "bg-primary text-white shadow-md" 
              : "bg-secondary hover:bg-secondary/80"
          )}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Faturamento</span>
        </button>
        <button
          onClick={() => handleChartTabChange('lineChart')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all",
            activeChartTab === 'lineChart' 
              ? "bg-primary text-white shadow-md" 
              : "bg-secondary hover:bg-secondary/80"
          )}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Crescimento</span>
        </button>
        <button
          onClick={() => handleChartTabChange('pieChart')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all",
            activeChartTab === 'pieChart' 
              ? "bg-primary text-white shadow-md" 
              : "bg-secondary hover:bg-secondary/80"
          )}
        >
          <PieChartIcon className="w-4 h-4" />
          <span>Categorias</span>
        </button>
      </motion.div>
      
      {/* Charts */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={itemVariants}
      >
        <Card className={cn(
          "border-primary/5 shadow-lg transition-all duration-300",
          activeChartTab === 'barChart' ? "lg:col-span-2" : "hidden"
        )}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle>Faturamento Mensal</CardTitle>
            </div>
            <CardDescription>Faturamento mensal durante o último ano</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
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
                  <Bar 
                    dataKey="valor" 
                    fill="url(#barGradient)" 
                    name="Valor (R$)" 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className={cn(
          "border-primary/5 shadow-lg transition-all duration-300",
          activeChartTab === 'lineChart' ? "lg:col-span-2" : "hidden"
        )}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Crescimento</CardTitle>
            </div>
            <CardDescription>Tendência de crescimento nos últimos 7 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
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
                    fill="url(#lineGradient)"
                    dot={{ 
                      r: 4, 
                      fill: "hsl(var(--primary))",
                      strokeWidth: 2,
                      stroke: "white" 
                    }} 
                    activeDot={{ 
                      r: 6, 
                      strokeWidth: 0,
                      fill: "hsl(var(--primary))"
                    }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className={cn(
          "border-primary/5 shadow-lg transition-all duration-300",
          activeChartTab === 'pieChart' ? "lg:col-span-2" : "hidden"
        )}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
              <CardTitle>Distribuição de Categorias</CardTitle>
            </div>
            <CardDescription>Divisão percentual por categorias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
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
                    animationDuration={1200}
                    animationBegin={200}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={{ stroke: 'hsl(var(--primary))', strokeWidth: 0.5 }}
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        stroke="hsl(var(--background))"
                        strokeWidth={2}
                      />
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
        
        <Card className="border-primary/5 shadow-lg h-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <RefreshCcw className="h-5 w-5 text-primary animate-spin-slow" />
              <CardTitle>Atividades Recentes</CardTitle>
            </div>
            <CardDescription>Resumo das últimas atividades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { icon: <Users className="h-4 w-4 text-blue-500" />, title: 'Novos usuários registrados', time: 'Há 2 horas atrás', color: 'bg-blue-500/10' },
                { icon: <DollarSign className="h-4 w-4 text-green-500" />, title: 'Novo pagamento recebido', time: 'Ontem às 14:30', color: 'bg-green-500/10' },
                { icon: <FileClock className="h-4 w-4 text-amber-500" />, title: 'Relatório mensal gerado', time: 'Há 2 dias atrás', color: 'bg-amber-500/10' },
                { icon: <Layers className="h-4 w-4 text-purple-500" />, title: 'Atualização do sistema', time: 'Há 3 dias atrás', color: 'bg-purple-500/10' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  <div className={cn("p-2 rounded-full", item.color)}>
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* KPI Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={itemVariants}
      >
        {[
          { 
            title: "Metas Atingidas", 
            value: "87%", 
            icon: <Target className="h-5 w-5 text-rose-500" />,
            trend: "up",
            change: "12%",
            color: "bg-rose-500/10",
            barColor: "bg-rose-500",
            barValue: 87
          },
          { 
            title: "Eficiência Operacional", 
            value: "92%", 
            icon: <Zap className="h-5 w-5 text-yellow-500" />,
            trend: "up",
            change: "5%",
            color: "bg-yellow-500/10",
            barColor: "bg-yellow-500",
            barValue: 92
          },
          { 
            title: "Satisfação do Cliente", 
            value: "96%", 
            icon: <CheckCircle className="h-5 w-5 text-green-600" />,
            trend: "up",
            change: "2%",
            color: "bg-green-600/10",
            barColor: "bg-green-600",
            barValue: 96
          },
          { 
            title: "Tempo de Resposta", 
            value: "4.2s", 
            icon: <Clock className="h-5 w-5 text-blue-500" />,
            trend: "down",
            change: "0.5s",
            color: "bg-blue-500/10",
            barColor: "bg-blue-500",
            barValue: 78
          }
        ].map((kpi, i) => (
          <motion.div
            key={i}
            variants={cardHoverVariants}
            whileHover="hover"
            className="h-full"
          >
            <Card className="border shadow-md h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className={cn("p-2 rounded-lg", kpi.color)}>
                    {kpi.icon}
                  </div>
                  <span className={cn(
                    "text-xs font-medium inline-flex items-center px-2 py-1 rounded-full",
                    kpi.trend === "up" ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-700"
                  )}>
                    {kpi.trend === "up" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {kpi.change}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium text-sm text-muted-foreground">{kpi.title}</h3>
                <div className="text-2xl font-bold mt-1">{kpi.value}</div>
                <div className="mt-2 w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div 
                    className={cn("h-full rounded-full", kpi.barColor)}
                    initial={{ width: "0%" }}
                    animate={{ width: `${kpi.barValue}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Bottom Row */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={itemVariants}
      >
        <Card className="border-primary/5 shadow-lg md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <CardTitle>Resumo de Desempenho</CardTitle>
            </div>
            <CardDescription>Indicadores principais de performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Taxa de Conversão', value: '5.24%', change: 1.2, up: true, icon: <Sparkles className="h-4 w-4 text-amber-500" /> },
                { name: 'Tempo Médio no Sistema', value: '3m 45s', change: 0.8, up: true, icon: <Clock className="h-4 w-4 text-blue-500" /> },
                { name: 'Taxa de Rejeição', value: '42.3%', change: 2.5, up: false, icon: <TrendingDown className="h-4 w-4 text-rose-500" /> },
                { name: 'Retorno de Usuários', value: '67.5%', change: 4.1, up: true, icon: <RefreshCcw className="h-4 w-4 text-green-500" /> }
              ].map((metric, i) => (
                <motion.div 
                  key={i} 
                  className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-1.5 rounded-md",
                      i % 2 === 0 ? "bg-primary/10" : "bg-secondary"
                    )}>
                      {metric.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{metric.name}</p>
                      <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{metric.value}</p>
                    <p className={`text-xs flex items-center ${metric.up ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.up ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {metric.change}%
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/5 shadow-lg h-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <CardTitle>Análise Financeira</CardTitle>
            </div>
            <CardDescription>Resumo das finanças</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Despesas totais</p>
                  <p className="text-xs text-muted-foreground">Este mês</p>
                </div>
              </div>
              <p className="text-lg font-bold">R$ 18.240</p>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-500/5 rounded-lg">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Receitas</p>
                  <p className="text-xs text-muted-foreground">Este mês</p>
                </div>
              </div>
              <p className="text-lg font-bold text-green-600">R$ 45.231</p>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-500/5 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Lucro líquido</p>
                  <p className="text-xs text-muted-foreground">Este mês</p>
                </div>
              </div>
              <p className="text-lg font-bold text-blue-600">R$ 26.991</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
