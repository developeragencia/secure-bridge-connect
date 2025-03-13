
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileSearch, Clock, Calendar, CheckCircle } from 'lucide-react';
import { AuditSummary } from '@/types/audit';

interface AuditStatusCardsProps {
  summary: AuditSummary;
  className?: string; // Added className prop
}

const AuditStatusCards: React.FC<AuditStatusCardsProps> = ({ summary, className }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${className || ''}`}>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Auditorias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{summary.total}</div>
            <FileSearch className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Em Andamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{summary.emAndamento}</div>
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Pendentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{summary.pendente}</div>
            <Calendar className="h-5 w-5 text-yellow-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Concluídas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{summary.concluida}</div>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditStatusCards;
