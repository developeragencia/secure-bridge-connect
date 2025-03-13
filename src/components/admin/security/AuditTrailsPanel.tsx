
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/components/admin/tax-credits/calculations/audit-trail/utils';
import { AuditTrail } from '@/components/admin/tax-credits/calculations/audit-trail/types';
import { mockAuditLogs } from '@/components/admin/tax-credits/calculations/audit-trail/mock-data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Download, FileSearch, RefreshCw, Search } from 'lucide-react';
import { toast } from 'sonner';
import AuditDetailDialog from '@/components/admin/tax-credits/calculations/audit-trail/components/AuditDetailDialog';

const AuditTrailsPanel: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditTrail[]>(mockAuditLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [timeRangeFilter, setTimeRangeFilter] = useState('all');
  const [selectedAudit, setSelectedAudit] = useState<AuditTrail | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter logs based on search and filters
  const filteredLogs = auditLogs.filter(log => {
    // Search filter
    const matchesSearch = 
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Action filter
    const matchesAction = actionFilter ? log.action === actionFilter : true;
    
    // Time range filter
    let matchesTimeRange = true;
    const now = new Date();
    const logDate = new Date(log.date);
    
    if (timeRangeFilter === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      matchesTimeRange = logDate >= today;
    } else if (timeRangeFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesTimeRange = logDate >= weekAgo;
    } else if (timeRangeFilter === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      matchesTimeRange = logDate >= monthAgo;
    }
    
    return matchesSearch && matchesAction && matchesTimeRange;
  });

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setAuditLogs(mockAuditLogs);
      setIsLoading(false);
      toast.success('Registros de auditoria atualizados');
    }, 1000);
  };

  const handleExport = () => {
    toast.success('Exportando registros de auditoria para CSV');
  };

  const handleViewDetails = (audit: AuditTrail) => {
    setSelectedAudit(audit);
    setIsDetailOpen(true);
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-500/20 text-green-700';
      case 'update':
        return 'bg-blue-500/20 text-blue-700';
      case 'delete':
        return 'bg-red-500/20 text-red-700';
      case 'status_change':
        return 'bg-amber-500/20 text-amber-700';
      case 'calculation':
        return 'bg-purple-500/20 text-purple-700';
      case 'export':
        return 'bg-indigo-500/20 text-indigo-700';
      case 'import':
        return 'bg-cyan-500/20 text-cyan-700';
      default:
        return 'bg-gray-500/20 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Trilhas de Auditoria</h2>
          <p className="text-muted-foreground">Monitore as atividades e ações realizadas no sistema</p>
        </div>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button variant="default" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtre os registros de auditoria por diferentes critérios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Pesquisar</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Usuário, recurso ou descrição..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="action-filter">Tipo de Ação</Label>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger id="action-filter">
                  <SelectValue placeholder="Todas as ações" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as ações</SelectItem>
                  <SelectItem value="create">Criação</SelectItem>
                  <SelectItem value="update">Atualização</SelectItem>
                  <SelectItem value="delete">Exclusão</SelectItem>
                  <SelectItem value="status_change">Mudança de Status</SelectItem>
                  <SelectItem value="calculation">Cálculo</SelectItem>
                  <SelectItem value="export">Exportação</SelectItem>
                  <SelectItem value="import">Importação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time-filter">Período</Label>
              <Select value={timeRangeFilter} onValueChange={setTimeRangeFilter}>
                <SelectTrigger id="time-filter">
                  <SelectValue placeholder="Todo o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todo o período</SelectItem>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registros de Auditoria</CardTitle>
          <CardDescription>
            Total de {filteredLogs.length} registros encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Data/Hora</th>
                    <th className="px-4 py-3 text-left font-medium">Usuário</th>
                    <th className="px-4 py-3 text-left font-medium">Ação</th>
                    <th className="px-4 py-3 text-left font-medium">Recurso</th>
                    <th className="px-4 py-3 text-left font-medium">Detalhes</th>
                    <th className="px-4 py-3 text-center font-medium">Ver</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={`skeleton-${index}`} className="border-b">
                        <td colSpan={6} className="px-4 py-3">
                          <div className="h-6 bg-muted animate-pulse rounded"></div>
                        </td>
                      </tr>
                    ))
                  ) : filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-3 text-center text-muted-foreground">
                        Nenhum registro de auditoria encontrado
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          {formatDate(log.date)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span>{log.userName}</span>
                            <span className="text-xs text-muted-foreground">
                              {log.userRole}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                            {log.action === 'create' && 'Criação'}
                            {log.action === 'update' && 'Atualização'}
                            {log.action === 'delete' && 'Exclusão'}
                            {log.action === 'status_change' && 'Status'}
                            {log.action === 'calculation' && 'Cálculo'}
                            {log.action === 'export' && 'Exportação'}
                            {log.action === 'import' && 'Importação'}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span>{log.resourceName}</span>
                            <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                              ID: {log.resourceId}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="truncate max-w-[200px]" title={log.details}>
                            {log.details}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewDetails(log)}
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
          </div>
        </CardContent>
      </Card>

      <AuditDetailDialog 
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        audit={selectedAudit}
      />
    </div>
  );
};

export default AuditTrailsPanel;
