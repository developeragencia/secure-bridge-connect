
import React from 'react';
import { AlertCircle, Building, Calendar, FileText, Info } from 'lucide-react';
import { useActiveClient } from '@/hooks/useActiveClient';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ActiveClientHeader = () => {
  const { activeClient } = useActiveClient();

  if (!activeClient) return null;

  return (
    <div className="bg-card/50 backdrop-blur-sm border-b border-primary/5 py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Building className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">{activeClient.name}</h3>
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs px-1.5 h-5",
                  activeClient.status === 'active' && "bg-green-500/20 text-green-700 dark:text-green-300",
                  activeClient.status === 'inactive' && "bg-amber-500/20 text-amber-700 dark:text-amber-300",
                  activeClient.status === 'pending' && "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                )}
              >
                {activeClient.status === 'active' && 'Ativo'}
                {activeClient.status === 'inactive' && 'Inativo'}
                {activeClient.status === 'pending' && 'Pendente'}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{activeClient.cnpj}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-accent">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Cliente desde: {new Date(activeClient.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Data de início do cliente</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-accent">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Segmento: {activeClient.segment || 'Não informado'}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Segmento do cliente</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-accent">
                  <Info className="h-3.5 w-3.5" />
                  <span>Tipo: {activeClient.type === 'public' ? 'Público' : 'Privado'}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tipo de entidade</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ActiveClientHeader;
