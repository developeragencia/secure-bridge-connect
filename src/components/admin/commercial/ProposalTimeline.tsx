
import React from 'react';
import { Check, Clock, Edit, FileCheck, FilePlus, ThumbsDown, ThumbsUp } from 'lucide-react';
import { ProposalTimelineEvent } from '@/types/proposal';
import { cn } from '@/lib/utils';

interface ProposalTimelineProps {
  events: ProposalTimelineEvent[];
}

const ProposalTimeline: React.FC<ProposalTimelineProps> = ({ events }) => {
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="space-y-4">
      <div className="relative ml-6 py-2">
        <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-border -ml-3" />
        
        {sortedEvents.map((event, index) => (
          <div key={event.id} className="relative mb-8 last:mb-0">
            <div className="absolute -left-6 mt-1.5">
              <div className={cn(
                "h-6 w-6 rounded-full flex items-center justify-center",
                getEventIconBackground(event.type)
              )}>
                {getEventIcon(event.type)}
              </div>
            </div>
            
            <div className="ml-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                <h4 className="font-medium">{getEventTitle(event.type)}</h4>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1 inline" />
                  {formatDateTime(event.createdAt)}
                </div>
              </div>
              
              <p className="text-sm mb-2">{event.description}</p>
              
              <div className="text-xs text-muted-foreground flex items-center">
                <div className="h-4 w-4 rounded-full bg-muted flex items-center justify-center mr-1.5">
                  <span className="text-[10px]">{event.userName.charAt(0)}</span>
                </div>
                <span>{event.userName}</span>
              </div>
              
              {event.metadata && event.type === 'REJECTED' && (
                <div className="mt-2 text-sm border border-red-200 rounded-md p-2 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
                  <strong>Motivo:</strong> {event.metadata.reason}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper functions

function getEventIcon(type: ProposalTimelineEvent['type']) {
  switch (type) {
    case 'CREATED':
      return <FilePlus className="h-3.5 w-3.5 text-white" />;
    case 'UPDATED':
      return <Edit className="h-3.5 w-3.5 text-white" />;
    case 'ANALYZED':
      return <Check className="h-3.5 w-3.5 text-white" />;
    case 'APPROVED':
      return <ThumbsUp className="h-3.5 w-3.5 text-white" />;
    case 'REJECTED':
      return <ThumbsDown className="h-3.5 w-3.5 text-white" />;
    case 'CONVERTED':
      return <FileCheck className="h-3.5 w-3.5 text-white" />;
    default:
      return <Clock className="h-3.5 w-3.5 text-white" />;
  }
}

function getEventIconBackground(type: ProposalTimelineEvent['type']) {
  switch (type) {
    case 'CREATED':
      return 'bg-blue-600';
    case 'UPDATED':
      return 'bg-amber-600';
    case 'ANALYZED':
      return 'bg-cyan-600';
    case 'APPROVED':
      return 'bg-green-600';
    case 'REJECTED':
      return 'bg-red-600';
    case 'CONVERTED':
      return 'bg-purple-600';
    default:
      return 'bg-slate-600';
  }
}

function getEventTitle(type: ProposalTimelineEvent['type']) {
  switch (type) {
    case 'CREATED':
      return 'Proposta criada';
    case 'UPDATED':
      return 'Proposta atualizada';
    case 'ANALYZED':
      return 'Proposta analisada';
    case 'APPROVED':
      return 'Proposta aprovada';
    case 'REJECTED':
      return 'Proposta rejeitada';
    case 'CONVERTED':
      return 'Convertida em contrato';
    default:
      return 'Evento registrado';
  }
}

function formatDateTime(dateTimeString: string) {
  const date = new Date(dateTimeString);
  
  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  const formattedTime = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return `${formattedDate} às ${formattedTime}`;
}

export default ProposalTimeline;
