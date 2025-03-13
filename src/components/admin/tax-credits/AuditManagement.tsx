
import React from 'react';
import { FileCheck, CheckCircle2, AlertCircle, Clock, Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import TabTitleSection from '../header/TabTitleSection';

const AuditManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <TabTitleSection 
        Icon={FileCheck} 
        title="Gestão de Auditorias" 
        description="Gerencie auditorias tributárias e seus resultados para garantir conformidade fiscal."
      />

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Auditorias Concluídas"
          value="87"
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
          description="7 novas este mês"
          textColor="text-emerald-500"
        />
        <SummaryCard
          title="Auditorias Pendentes"
          value="34"
          icon={<Clock className="h-5 w-5 text-amber-500" />}
          description="12 com prazo próximo"
          textColor="text-amber-500"
        />
        <SummaryCard
          title="Economia Gerada"
          value="R$ 1.245.789,56"
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
          description="+15% em relação ao ano anterior"
          textColor="text-emerald-500"
        />
        <SummaryCard
          title="Problemas Encontrados"
          value="53"
          icon={<AlertCircle className="h-5 w-5 text-red-500" />}
          description="23 corrigidos, 30 pendentes"
          textColor="text-red-500"
        />
      </div>

      {/* Filters and search */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar auditorias..."
              className="w-full bg-background pl-8 md:w-[320px]"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm">Nova Auditoria</Button>
        </div>
      </div>

      {/* Main content tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="ongoing">Em Andamento</TabsTrigger>
          <TabsTrigger value="completed">Concluídas</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>Todas as Auditorias</CardTitle>
              <CardDescription>
                Lista completa de auditorias tributárias realizadas e em andamento
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-t">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50 text-sm text-muted-foreground">
                      <th className="h-10 px-4 text-left font-medium">ID</th>
                      <th className="h-10 px-4 text-left font-medium">Cliente</th>
                      <th className="h-10 px-4 text-left font-medium">Tipo</th>
                      <th className="h-10 px-4 text-left font-medium">Período</th>
                      <th className="h-10 px-4 text-left font-medium">Status</th>
                      <th className="h-10 px-4 text-left font-medium">Responsável</th>
                      <th className="h-10 px-4 text-left font-medium">Prazo</th>
                      <th className="h-10 px-4 text-left font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AuditRow
                      id="AUD-2023-001"
                      client="Empresa ABC Ltda"
                      type="PIS/COFINS"
                      period="Jan-Mar/2023"
                      status="Concluído"
                      responsible="Carlos Silva"
                      deadline="15/06/2023"
                    />
                    <AuditRow
                      id="AUD-2023-002"
                      client="XYZ Indústria S.A."
                      type="ICMS"
                      period="2022"
                      status="Em progresso"
                      responsible="Ana Oliveira"
                      deadline="22/07/2023"
                    />
                    <AuditRow
                      id="AUD-2023-003"
                      client="Tech Solutions Ltda"
                      type="IRRF"
                      period="2022-2023"
                      status="Pendente"
                      responsible="Roberto Martins"
                      deadline="30/07/2023"
                    />
                    <AuditRow
                      id="AUD-2023-004"
                      client="Comércio Geral Ltda"
                      type="Completa"
                      period="2021-2022"
                      status="Crítico"
                      responsible="Julia Santos"
                      deadline="10/06/2023"
                    />
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ongoing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Auditorias em Andamento</CardTitle>
              <CardDescription>Auditorias que estão em execução no momento</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Selecione "Todas" para ver as auditorias em andamento.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Auditorias Concluídas</CardTitle>
              <CardDescription>Auditorias finalizadas e com resultados disponíveis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Selecione "Todas" para ver as auditorias concluídas.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Auditorias Pendentes</CardTitle>
              <CardDescription>Auditorias agendadas mas ainda não iniciadas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Selecione "Todas" para ver as auditorias pendentes.</p>
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
  icon: React.ReactNode;
  description: string;
  textColor?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  icon, 
  description, 
  textColor = 'text-foreground' 
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${textColor}`}>{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

// Helper component for audit table rows
interface AuditRowProps {
  id: string;
  client: string;
  type: string;
  period: string;
  status: string;
  responsible: string;
  deadline: string;
}

const AuditRow: React.FC<AuditRowProps> = ({
  id,
  client,
  type,
  period,
  status,
  responsible,
  deadline,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'concluído':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'em progresso':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pendente':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'crítico':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="p-4 align-middle text-sm">{id}</td>
      <td className="p-4 align-middle font-medium">{client}</td>
      <td className="p-4 align-middle text-sm">{type}</td>
      <td className="p-4 align-middle text-sm">{period}</td>
      <td className="p-4 align-middle">
        <Badge variant="outline" className={`${getStatusColor(status)}`}>
          {status}
        </Badge>
      </td>
      <td className="p-4 align-middle text-sm">{responsible}</td>
      <td className="p-4 align-middle">
        <div className="flex items-center gap-1 text-sm">
          <Clock className="h-3 w-3 text-muted-foreground" />
          {deadline}
        </div>
      </td>
      <td className="p-4 align-middle">
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default AuditManagement;
