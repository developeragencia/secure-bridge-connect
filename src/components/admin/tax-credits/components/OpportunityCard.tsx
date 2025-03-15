
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

interface OpportunityCardProps {
  id?: string;
  title: string;
  client: string;
  value: string;
  confidence: number;
  date: string;
  status: 'Disponível' | 'Em análise' | 'Aprovado' | 'Negado';
  onClick?: () => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  id = `OP-${Math.floor(Math.random() * 1000)}`,
  title,
  client,
  value,
  confidence,
  date,
  status,
  onClick
}) => {
  const { toast } = useToast();
  
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

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (onClick) {
      onClick();
    } else {
      // Default fallback if no onClick handler is provided
      toast({
        title: "Detalhes da Oportunidade",
        description: `Visualizando detalhes de ${title} para ${client}`,
      });
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="overflow-hidden transition hover:shadow-md hover:border-primary/60 cursor-pointer h-full flex flex-col"
        onClick={onClick || handleViewDetails}
      >
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
        <CardContent className="pb-2 flex-grow">
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
        <CardFooter className="bg-muted/20 border-t pt-3 mt-auto">
          <Button 
            variant="ghost" 
            className="w-full justify-between"
            onClick={handleViewDetails}
          >
            <span>Ver detalhes</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default OpportunityCard;
