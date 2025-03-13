
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { HistoryItem } from '@/types/declarations';

interface CreditHistoryTabProps {
  history: HistoryItem[];
  formatDateTime: (dateString: string) => string;
}

const CreditHistoryTab: React.FC<CreditHistoryTabProps> = ({ history, formatDateTime }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Histórico</CardTitle>
        <CardDescription>Atividades relacionadas a este crédito tributário</CardDescription>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">Nenhum registro de atividade disponível</p>
          </div>
        ) : (
          <div className="relative pl-6 space-y-6">
            <div className="absolute top-0 bottom-0 left-2 border-l-2 border-dashed border-muted"></div>
            
            {history.map((event) => (
              <div key={event.id} className="relative">
                <div className={`absolute -left-6 top-0 w-4 h-4 rounded-full bg-background 
                  ${event.status === 'APPROVED' ? 'border-2 border-green-500' : 
                    event.status === 'REJECTED' ? 'border-2 border-destructive' : 
                    'border-2 border-primary'}`}>
                </div>
                <div>
                  <p className="font-medium">{event.action}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatDateTime(event.date)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.user}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreditHistoryTab;
