
import React, { useState } from 'react';
import { Receipt, Download, Plus, Search, Filter, Calendar, Printer, Send, ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TabTitleSection from '../header/TabTitleSection';

const RetentionReceiptsPanel: React.FC = () => {
  const [year, setYear] = useState('2023');
  
  return (
    <div className="space-y-6">
      <TabTitleSection 
        Icon={Receipt} 
        title="Recibos de Retenção" 
        description="Gerencie recibos de retenção tributária, emissão, envio e histórico de documentos."
      />

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total de Recibos"
          value="152"
          icon={<Receipt className="h-5 w-5 text-primary" />}
          description="42 emitidos este mês"
        />
        <SummaryCard
          title="Valor Total Retido"
          value="R$ 876.543,21"
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
          description="R$ 245.678,90 este mês"
        />
        <SummaryCard
          title="Pendentes de Envio"
          value="18"
          icon={<Clock className="h-5 w-5 text-amber-500" />}
          description="Aguardando processamento"
        />
        <SummaryCard
          title="Com Problemas"
          value="5"
          icon={<AlertCircle className="h-5 w-5 text-red-500" />}
          description="Requerem atenção imediata"
        />
      </div>

      {/* Filters and search */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-1 items-center gap-2 flex-wrap">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar recibos por cliente ou número..."
              className="w-full bg-background pl-8 md:w-[320px]"
            />
          </div>
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
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Novo Recibo
          </Button>
        </div>
      </div>

      {/* Main content tabs */}
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recentes</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="sent">Enviados</TabsTrigger>
          <TabsTrigger value="all">Todos</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>Recibos Recentes</CardTitle>
              <CardDescription>
                Recibos de retenção emitidos nos últimos 30 dias
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-t">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50 text-sm text-muted-foreground">
                      <th className="h-10 px-4 text-left font-medium">Número</th>
                      <th className="h-10 px-4 text-left font-medium">Cliente</th>
                      <th className="h-10 px-4 text-left font-medium">Data</th>
                      <th className="h-10 px-4 text-left font-medium">Tributo</th>
                      <th className="h-10 px-4 text-left font-medium">Valor</th>
                      <th className="h-10 px-4 text-left font-medium">Status</th>
                      <th className="h-10 px-4 text-left font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ReceiptRow
                      number="RET-2023-001"
                      client="Empresa ABC Ltda"
                      date="15/07/2023"
                      taxType="IRRF"
                      value="R$ 12.345,67"
                      status="Enviado"
                    />
                    <ReceiptRow
                      number="RET-2023-002"
                      client="XYZ Indústria S.A."
                      date="10/07/2023"
                      taxType="PIS/COFINS"
                      value="R$ 23.456,78"
                      status="Pendente"
                    />
                    <ReceiptRow
                      number="RET-2023-003"
                      client="Tech Solutions Ltda"
                      date="05/07/2023"
                      taxType="CSLL"
                      value="R$ 8.765,43"
                      status="Enviado"
                    />
                    <ReceiptRow
                      number="RET-2023-004"
                      client="Comércio Geral Ltda"
                      date="01/07/2023"
                      taxType="IRRF"
                      value="R$ 6.543,21"
                      status="Erro"
                    />
                    <ReceiptRow
                      number="RET-2023-005"
                      client="Distribuidora Norte Ltda"
                      date="28/06/2023"
                      taxType="PIS/COFINS"
                      value="R$ 15.678,90"
                      status="Enviado"
                    />
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <ReceiptGrid status="Pendente" />
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          <ReceiptGrid status="Enviado" />
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <ReceiptGrid status="Todos" />
        </TabsContent>
      </Tabs>
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

// Helper component for receipt table rows
interface ReceiptRowProps {
  number: string;
  client: string;
  date: string;
  taxType: string;
  value: string;
  status: 'Enviado' | 'Pendente' | 'Erro';
}

const ReceiptRow: React.FC<ReceiptRowProps> = ({
  number,
  client,
  date,
  taxType,
  value,
  status,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'enviado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pendente':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'erro':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="p-4 align-middle text-sm">{number}</td>
      <td className="p-4 align-middle font-medium">{client}</td>
      <td className="p-4 align-middle text-sm">{date}</td>
      <td className="p-4 align-middle text-sm">{taxType}</td>
      <td className="p-4 align-middle text-sm font-medium">{value}</td>
      <td className="p-4 align-middle">
        <Badge variant="outline" className={`${getStatusColor(status)}`}>
          {status}
        </Badge>
      </td>
      <td className="p-4 align-middle">
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

// Helper component for receipt grid
interface ReceiptGridProps {
  status: 'Pendente' | 'Enviado' | 'Erro' | 'Todos';
}

const ReceiptGrid: React.FC<ReceiptGridProps> = ({ status }) => {
  // This would typically fetch the receipts with the given status
  // For now, just show a placeholder message
  return (
    <Card>
      <CardHeader>
        <CardTitle>{status === 'Todos' ? 'Todos os Recibos' : `Recibos ${status}s`}</CardTitle>
        <CardDescription>{getStatusDescription(status)}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* For demonstration, let's show some receipt cards */}
        {Array.from({ length: 6 }).map((_, index) => (
          <ReceiptCard key={index} status={status === 'Todos' ? getRandomStatus() : status} />
        ))}
      </CardContent>
    </Card>
  );
};

// Helper function to get a random status for the "Todos" tab demonstration
const getRandomStatus = (): 'Pendente' | 'Enviado' | 'Erro' => {
  const statuses: Array<'Pendente' | 'Enviado' | 'Erro'> = ['Pendente', 'Enviado', 'Erro'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Helper function to get a description based on the status
const getStatusDescription = (status: string): string => {
  switch (status) {
    case 'Pendente':
      return 'Recibos que ainda não foram enviados aos clientes';
    case 'Enviado':
      return 'Recibos já enviados com sucesso aos clientes';
    case 'Erro':
      return 'Recibos que apresentaram erros durante o processamento';
    case 'Todos':
      return 'Visualização completa de todos os recibos';
    default:
      return '';
  }
};

// Helper component for receipt cards in the grid view
const ReceiptCard: React.FC<{ status: 'Pendente' | 'Enviado' | 'Erro' }> = ({ status }) => {
  // Generate some random mock data for the card
  const client = ['Empresa ABC', 'XYZ Indústria', 'Tech Solutions', 'Comércio Geral'][Math.floor(Math.random() * 4)];
  const value = `R$ ${(Math.random() * 20000 + 5000).toFixed(2)}`;
  const date = `${Math.floor(Math.random() * 28) + 1}/07/2023`;
  const taxType = ['IRRF', 'PIS/COFINS', 'CSLL', 'INSS'][Math.floor(Math.random() * 4)];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'enviado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pendente':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'erro':
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
            {date}
          </div>
        </div>
        <CardTitle className="text-base mt-2">{`RET-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`}</CardTitle>
        <CardDescription>{client}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm text-muted-foreground">Valor retido</p>
            <p className="text-lg font-bold">{value}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Tributo</p>
            <p className="text-sm">{taxType}</p>
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

export default RetentionReceiptsPanel;
