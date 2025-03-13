
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileBarChart2, PlusCircle, RefreshCcw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AuditManagement: React.FC = () => {
  const handleRefresh = () => {
    toast({
      title: "Atualizando dados",
      description: "Os dados de auditoria foram atualizados",
    });
  };

  const handleCreateAudit = () => {
    toast({
      title: "Nova auditoria",
      description: "Formulário de criação de auditoria aberto",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileBarChart2 className="h-6 w-6 text-primary" />
            <span>Auditorias Tributárias</span>
          </h2>
          <p className="text-muted-foreground mt-1">
            Gerencie processos de auditoria para otimização fiscal
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button size="sm" onClick={handleCreateAudit}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nova Auditoria
          </Button>
        </div>
      </div>

      {/* Placeholder content */}
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Auditorias</CardTitle>
          <CardDescription>
            Esta seção ainda está em desenvolvimento. Em breve você poderá gerenciar auditorias tributárias aqui.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <div className="text-center">
            <FileBarChart2 className="h-16 w-16 mx-auto text-muted-foreground opacity-20" />
            <p className="mt-4 text-muted-foreground">
              Conteúdo em desenvolvimento
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditManagement;
