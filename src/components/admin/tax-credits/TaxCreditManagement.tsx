
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaxCredit, TaxCreditSummary } from '@/types/tax-credits';
import { Badge } from '@/components/ui/badge';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Download, FileSearch, PlusCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';

// Mock data generator function
const generateMockTaxCredits = (): TaxCredit[] => {
  return Array.from({ length: 8 }, (_, i) => ({
    id: `credit-${i + 1}`,
    clientId: `client-${Math.floor(Math.random() * 5) + 1}`,
    clientName: `Client ${Math.floor(Math.random() * 5) + 1}`,
    documentNumber: `${Math.floor(Math.random() * 90000000) + 10000000}/${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 90) + 10}`,
    creditType: ['IRRF', 'PIS', 'COFINS', 'CSLL', 'OTHER'][Math.floor(Math.random() * 5)] as any,
    creditAmount: Math.floor(Math.random() * 1000000) + 10000,
    originalAmount: Math.floor(Math.random() * 1500000) + 50000,
    periodStart: new Date(2020, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    periodEnd: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    status: ['PENDING', 'ANALYZING', 'APPROVED', 'REJECTED', 'RECOVERED'][Math.floor(Math.random() * 5)] as any,
    createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    updatedAt: new Date().toISOString(),
    assignedTo: Math.random() > 0.5 ? `Usuario ${Math.floor(Math.random() * 5) + 1}` : undefined,
  }));
};

// Mock summary generator
const generateMockSummary = (): TaxCreditSummary => {
  return {
    totalCredits: Math.floor(Math.random() * 5000000) + 1000000,
    pendingCredits: Math.floor(Math.random() * 1000000) + 100000,
    approvedCredits: Math.floor(Math.random() * 3000000) + 500000,
    recoveredCredits: Math.floor(Math.random() * 1000000) + 100000,
    rejectedCredits: Math.floor(Math.random() * 500000) + 50000,
  };
};

const TaxCreditManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [taxCredits, setTaxCredits] = useState<TaxCredit[]>([]);
  const [summary, setSummary] = useState<TaxCreditSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const { classes: cardClasses } = useAnimationOnScroll<HTMLDivElement>({
    threshold: 0.1,
    transitionType: 'fade-in',
  });

  // Use real-time updates
  const { isListening } = useRealtimeUpdates({
    tableName: 'tax_credits',
    onInsert: (newCredit) => {
      setTaxCredits(prev => [newCredit, ...prev]);
      fetchSummaryData(); // Update summary when new data is added
    },
    onUpdate: (updatedCredit) => {
      setTaxCredits(prev => 
        prev.map(credit => credit.id === updatedCredit.id ? updatedCredit : credit)
      );
      fetchSummaryData(); // Update summary when data is changed
    },
    onDelete: (deletedCredit) => {
      setTaxCredits(prev => prev.filter(credit => credit.id !== deletedCredit.id));
      fetchSummaryData(); // Update summary when data is removed
    }
  });

  // Fetch data
  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be a database call
      // For now, we'll use mock data
      setTimeout(() => {
        const mockData = generateMockTaxCredits();
        setTaxCredits(mockData);
        fetchSummaryData();
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching tax credits:', error);
      toast.error('Erro ao carregar créditos tributários');
      setIsLoading(false);
    }
  };

  const fetchSummaryData = () => {
    // In a real app, this would be a database call
    // For now, we'll use mock data
    const mockSummary = generateMockSummary();
    setSummary(mockSummary);
  };

  const handleRefresh = () => {
    toast.info('Atualizando dados...');
    setRefreshKey(prev => prev + 1);
  };

  const handleCreateCredit = () => {
    toast.success('Novo crédito tributário', {
      description: 'Formulário de criação aberto',
    });
    // This would open a form in a real app
  };

  const handleViewDetails = (creditId: string) => {
    toast.info('Visualizando detalhes', {
      description: `Detalhes do crédito #${creditId}`,
    });
    // This would navigate to a details page in a real app
  };

  const handleExportData = () => {
    toast.success('Exportando dados', {
      description: 'O download começará em breve',
    });
    // This would generate a download in a real app
  };

  // Filter tax credits
  const filteredCredits = taxCredits.filter(credit => {
    const matchesSearch = credit.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      credit.documentNumber.includes(searchQuery);
    const matchesStatus = statusFilter ? credit.status === statusFilter : true;
    const matchesType = typeFilter ? credit.creditType === typeFilter : true;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Chart data
  const chartData = [
    { name: 'Pendentes', value: summary?.pendingCredits || 0 },
    { name: 'Em Análise', value: summary?.approvedCredits || 0 },
    { name: 'Aprovados', value: summary?.recoveredCredits || 0 },
    { name: 'Recuperados', value: summary?.rejectedCredits || 0 },
  ];

  // Function to format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header with Create and Refresh buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestão de Créditos Tributários</h1>
          <p className="text-muted-foreground">
            Gerencie os créditos tributários dos seus clientes
            {isListening && <span className="ml-2 text-xs text-green-500">• Atualizações em tempo real ativas</span>}
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button 
            variant="default" 
            className="w-full sm:w-auto"
            onClick={handleCreateCredit}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Crédito
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={handleRefresh}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className={cardClasses}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Créditos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(summary.totalCredits)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Todos os créditos identificados
              </p>
            </CardContent>
          </Card>
          
          <Card className={cardClasses}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Créditos Aprovados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(summary.approvedCredits)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {((summary.approvedCredits / summary.totalCredits) * 100).toFixed(1)}% do total
              </p>
            </CardContent>
          </Card>
          
          <Card className={cardClasses}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Créditos Recuperados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(summary.recoveredCredits)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {((summary.recoveredCredits / summary.totalCredits) * 100).toFixed(1)}% do total
              </p>
            </CardContent>
          </Card>
          
          <Card className={cardClasses}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Créditos Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{formatCurrency(summary.pendingCredits)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {((summary.pendingCredits / summary.totalCredits) * 100).toFixed(1)}% do total
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral dos Créditos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), "Valor"]}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0' 
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar por cliente ou documento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os status</SelectItem>
              <SelectItem value="PENDING">Pendente</SelectItem>
              <SelectItem value="ANALYZING">Em Análise</SelectItem>
              <SelectItem value="APPROVED">Aprovado</SelectItem>
              <SelectItem value="REJECTED">Rejeitado</SelectItem>
              <SelectItem value="RECOVERED">Recuperado</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Tipo de Crédito" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os tipos</SelectItem>
              <SelectItem value="IRRF">IRRF</SelectItem>
              <SelectItem value="PIS">PIS</SelectItem>
              <SelectItem value="COFINS">COFINS</SelectItem>
              <SelectItem value="CSLL">CSLL</SelectItem>
              <SelectItem value="OTHER">Outros</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tax Credits Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left font-medium">Cliente</th>
                <th className="py-3 px-4 text-left font-medium">Documento</th>
                <th className="py-3 px-4 text-left font-medium">Tipo</th>
                <th className="py-3 px-4 text-left font-medium">Valor</th>
                <th className="py-3 px-4 text-left font-medium">Período</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-left font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={`skeleton-${index}`} className="border-b">
                    <td colSpan={7} className="py-4 px-4">
                      <div className="h-6 bg-secondary/50 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))
              ) : filteredCredits.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-4 px-4 text-center text-muted-foreground">
                    Nenhum crédito tributário encontrado.
                  </td>
                </tr>
              ) : (
                filteredCredits.map((credit) => (
                  <tr key={credit.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{credit.clientName}</td>
                    <td className="py-3 px-4">{credit.documentNumber}</td>
                    <td className="py-3 px-4">{credit.creditType}</td>
                    <td className="py-3 px-4">{formatCurrency(credit.creditAmount)}</td>
                    <td className="py-3 px-4">
                      {new Date(credit.periodStart).toLocaleDateString('pt-BR')} a {new Date(credit.periodEnd).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={credit.status} />
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewDetails(credit.id)}
                      >
                        <FileSearch className="h-4 w-4" />
                        <span className="sr-only">Ver detalhes</span>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Status Badge component
const StatusBadge: React.FC<{ status: TaxCredit['status'] }> = ({ status }) => {
  const statusConfig = {
    PENDING: { label: 'Pendente', variant: 'secondary' as const },
    ANALYZING: { label: 'Em Análise', variant: 'default' as const },
    APPROVED: { label: 'Aprovado', variant: 'default' as const },
    REJECTED: { label: 'Rejeitado', variant: 'destructive' as const },
    RECOVERED: { label: 'Recuperado', variant: 'default' as const },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={
      status === 'PENDING' ? 'bg-amber-500/20 text-amber-700 hover:bg-amber-500/30' :
      status === 'ANALYZING' ? 'bg-blue-500/20 text-blue-700 hover:bg-blue-500/30' :
      status === 'APPROVED' ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30' :
      status === 'REJECTED' ? 'bg-red-500/20 text-red-700 hover:bg-red-500/30' :
      'bg-purple-500/20 text-purple-700 hover:bg-purple-500/30'
    }>
      {config.label}
    </Badge>
  );
};

export default TaxCreditManagement;
