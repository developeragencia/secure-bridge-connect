import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DownloadCloud, 
  Search, 
  Filter,
  Calendar,
  User,
  FileText,
  Eye
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import StatusBadge from '@/components/admin/tax-credits/components/StatusBadge';
import { StatusType } from '@/types/declarations';

type AuditAction = 
  | 'create' 
  | 'update' 
  | 'delete'
  | 'status_change'
  | 'calculation'
  | 'export'
  | 'import';

type AuditTrail = {
  id: string;
  date: Date;
  userId: string;
  userName: string;
  userRole: string;
  action: AuditAction;
  resourceType: string;
  resourceId: string;
  resourceName: string;
  details: string;
  ipAddress: string;
  previousStatus?: StatusType;
  newStatus?: StatusType;
};

// Mock data for audit trail
const mockAuditTrail: AuditTrail[] = [
  {
    id: '1',
    date: new Date(2023, 9, 15, 10, 30),
    userId: 'user123',
    userName: 'João Silva',
    userRole: 'Analista',
    action: 'calculation',
    resourceType: 'tax_credit',
    resourceId: 'CR-0123',
    resourceName: 'Crédito Tributário - Empresa ABC',
    details: 'Cálculo de retenção IRRF realizado',
    ipAddress: '192.168.1.1',
  },
  {
    id: '2',
    date: new Date(2023, 9, 15, 11, 45),
    userId: 'user456',
    userName: 'Maria Souza',
    userRole: 'Supervisor',
    action: 'update',
    resourceType: 'tax_credit',
    resourceId: 'CR-0123',
    resourceName: 'Crédito Tributário - Empresa ABC',
    details: 'Atualização de valor base de cálculo',
    ipAddress: '192.168.1.2',
  },
  {
    id: '3',
    date: new Date(2023, 9, 15, 14, 20),
    userId: 'user789',
    userName: 'Carlos Mendes',
    userRole: 'Administrador',
    action: 'status_change',
    resourceType: 'tax_credit',
    resourceId: 'CR-0123',
    resourceName: 'Crédito Tributário - Empresa ABC',
    details: 'Alteração de status do crédito',
    ipAddress: '192.168.1.3',
    previousStatus: 'PENDING',
    newStatus: 'APPROVED',
  },
  {
    id: '4',
    date: new Date(2023, 9, 16, 9, 15),
    userId: 'user123',
    userName: 'João Silva',
    userRole: 'Analista',
    action: 'calculation',
    resourceType: 'tax_credit',
    resourceId: 'CR-0456',
    resourceName: 'Crédito Tributário - Empresa XYZ',
    details: 'Cálculo de correção monetária realizado',
    ipAddress: '192.168.1.1',
  },
  {
    id: '5',
    date: new Date(2023, 9, 16, 10, 30),
    userId: 'user456',
    userName: 'Maria Souza',
    userRole: 'Supervisor',
    action: 'export',
    resourceType: 'report',
    resourceId: 'REP-789',
    resourceName: 'Relatório Mensal de Créditos',
    details: 'Exportação de relatório em PDF',
    ipAddress: '192.168.1.2',
  },
  {
    id: '6',
    date: new Date(2023, 9, 17, 11, 45),
    userId: 'user789',
    userName: 'Carlos Mendes',
    userRole: 'Administrador',
    action: 'create',
    resourceType: 'tax_credit',
    resourceId: 'CR-0789',
    resourceName: 'Crédito Tributário - Empresa DEF',
    details: 'Criação de novo crédito tributário',
    ipAddress: '192.168.1.3',
  },
  {
    id: '7',
    date: new Date(2023, 9, 17, 14, 15),
    userId: 'user123',
    userName: 'João Silva',
    userRole: 'Analista',
    action: 'update',
    resourceType: 'supplier',
    resourceId: 'SUP-456',
    resourceName: 'Fornecedor ABC Serviços',
    details: 'Atualização de CNAE do fornecedor',
    ipAddress: '192.168.1.1',
  },
  {
    id: '8',
    date: new Date(2023, 9, 18, 9, 30),
    userId: 'user456',
    userName: 'Maria Souza',
    userRole: 'Supervisor',
    action: 'import',
    resourceType: 'data_batch',
    resourceId: 'IMP-123',
    resourceName: 'Lote de Notas Fiscais',
    details: 'Importação de lote de notas fiscais do cliente',
    ipAddress: '192.168.1.2',
  },
  {
    id: '9',
    date: new Date(2023, 9, 18, 11, 15),
    userId: 'user789',
    userName: 'Carlos Mendes',
    userRole: 'Administrador',
    action: 'delete',
    resourceType: 'calculation',
    resourceId: 'CALC-789',
    resourceName: 'Cálculo Tributário',
    details: 'Exclusão de cálculo duplicado',
    ipAddress: '192.168.1.3',
  },
  {
    id: '10',
    date: new Date(2023, 9, 19, 10, 45),
    userId: 'user123',
    userName: 'João Silva',
    userRole: 'Analista',
    action: 'status_change',
    resourceType: 'tax_credit',
    resourceId: 'CR-0456',
    resourceName: 'Crédito Tributário - Empresa XYZ',
    details: 'Alteração de status do crédito',
    ipAddress: '192.168.1.1',
    previousStatus: 'ANALYZING',
    newStatus: 'RECOVERED',
  },
];

const AuditTrailPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string | null>(null);
  const [userFilter, setUserFilter] = useState<string | null>(null);
  const [selectedAudit, setSelectedAudit] = useState<AuditTrail | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredAudits = mockAuditTrail.filter(audit => {
    const matchesSearch = searchQuery === '' || 
      audit.userName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      audit.resourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.details.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesAction = !actionFilter || audit.action === actionFilter;
    const matchesUser = !userFilter || audit.userId === userFilter;
    
    return matchesSearch && matchesAction && matchesUser;
  });
  
  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yyyy HH:mm", { locale: ptBR });
  };
  
  const getActionBadge = (action: AuditAction) => {
    const config: Record<AuditAction, { label: string, class: string }> = {
      create: { label: 'Criação', class: 'bg-green-100 text-green-800' },
      update: { label: 'Atualização', class: 'bg-blue-100 text-blue-800' },
      delete: { label: 'Exclusão', class: 'bg-red-100 text-red-800' },
      status_change: { label: 'Mudança de Status', class: 'bg-purple-100 text-purple-800' },
      calculation: { label: 'Cálculo', class: 'bg-yellow-100 text-yellow-800' },
      export: { label: 'Exportação', class: 'bg-indigo-100 text-indigo-800' },
      import: { label: 'Importação', class: 'bg-pink-100 text-pink-800' }
    };
    
    const style = config[action];
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.class}`}
      >
        {style.label}
      </span>
    );
  };
  
  const viewDetails = (audit: AuditTrail) => {
    setSelectedAudit(audit);
    setIsDetailsOpen(true);
  };
  
  const uniqueUsers = Array.from(new Set(mockAuditTrail.map(a => a.userId)))
    .map(userId => {
      const user = mockAuditTrail.find(a => a.userId === userId);
      return {
        id: userId,
        name: user ? user.userName : '',
      };
    });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-lg font-medium">Histórico Detalhado de Auditoria</h3>
        <Button variant="outline">
          <DownloadCloud className="mr-2 h-4 w-4" />
          Exportar Logs
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por usuário, recurso ou detalhes..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            <Select
              value={actionFilter || ''}
              onValueChange={(value) => setActionFilter(value === '' ? null : value)}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por ação" />
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
            
            <Select
              value={userFilter || ''}
              onValueChange={(value) => setUserFilter(value === '' ? null : value)}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <User className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por usuário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os usuários</SelectItem>
                {uniqueUsers.map(user => (
                  <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Recurso</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead className="text-center">Detalhes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAudits.length > 0 ? (
                  filteredAudits.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{formatDate(audit.date)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{audit.userName}</span>
                          <span className="text-xs text-muted-foreground">{audit.userRole}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getActionBadge(audit.action)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{audit.resourceName}</span>
                          <span className="text-xs text-muted-foreground">{audit.resourceId}</span>
                        </div>
                      </TableCell>
                      <TableCell>{audit.ipAddress}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm" onClick={() => viewDetails(audit)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      Nenhum registro de auditoria encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes da Auditoria</DialogTitle>
            <DialogDescription>
              Informações detalhadas do registro de auditoria
            </DialogDescription>
          </DialogHeader>
          
          {selectedAudit && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-y-2">
                <div className="text-sm font-medium">Data/Hora:</div>
                <div className="text-sm">{formatDate(selectedAudit.date)}</div>
                
                <div className="text-sm font-medium">Usuário:</div>
                <div className="text-sm">{selectedAudit.userName}</div>
                
                <div className="text-sm font-medium">Cargo:</div>
                <div className="text-sm">{selectedAudit.userRole}</div>
                
                <div className="text-sm font-medium">Endereço IP:</div>
                <div className="text-sm">{selectedAudit.ipAddress}</div>
                
                <div className="text-sm font-medium">Ação:</div>
                <div className="text-sm">{getActionBadge(selectedAudit.action)}</div>
                
                <div className="text-sm font-medium">Recurso:</div>
                <div className="text-sm">{selectedAudit.resourceName}</div>
                
                <div className="text-sm font-medium">ID do Recurso:</div>
                <div className="text-sm">{selectedAudit.resourceId}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-1">Detalhes da Ação:</div>
                <div className="text-sm p-2 bg-muted rounded-md">
                  {selectedAudit.details}
                </div>
              </div>
              
              {selectedAudit.action === 'status_change' && selectedAudit.previousStatus && selectedAudit.newStatus && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Status Anterior:</div>
                    <StatusBadge status={selectedAudit.previousStatus} />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Novo Status:</div>
                    <StatusBadge status={selectedAudit.newStatus} />
                  </div>
                </div>
              )}
              
              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Exportar Relatório
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuditTrailPanel;
