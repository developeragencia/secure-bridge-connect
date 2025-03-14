
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface OpportunityCardProps {
  title: string;
  client: string;
  value: string;
  confidence: number;
  date: string;
  status: 'Disponível' | 'Em análise' | 'Aprovado' | 'Negado';
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  title,
  client,
  value,
  confidence,
  date,
  status,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'disponível':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'em análise':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'aprovado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negado':
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
            Confiança: 
            <span className={confidence >= 90 ? 'text-green-600' : confidence >= 80 ? 'text-amber-600' : 'text-gray-600'}>
              {' '}{confidence}%
            </span>
          </div>
        </div>
        <CardTitle className="text-base mt-2">{title}</CardTitle>
        <CardDescription>{client}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-sm text-muted-foreground">Valor potencial</p>
            <p className="text-lg font-bold">{value}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Identificado em</p>
            <p className="text-sm">{date}</p>
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

export default OpportunityCard;
