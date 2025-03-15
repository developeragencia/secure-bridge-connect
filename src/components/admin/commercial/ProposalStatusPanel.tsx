
import React from 'react';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertTriangle, 
  FileCheck, 
  UserCheck 
} from 'lucide-react';
import { ProposalStatus } from '@/types/proposal';

interface StatusCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, count, icon, color, onClick }) => {
  return (
    <div 
      className={`rounded-lg border p-4 hover:shadow-md transition-shadow cursor-pointer ${color}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
        <div className={`p-2 rounded-full ${color.replace('border-l-', 'bg-')}`}>{icon}</div>
      </div>
      <div className="flex items-center gap-1 mt-3 text-xs font-medium">
        <span>Ver detalhes</span>
        <ArrowUpRight className="h-3 w-3" />
      </div>
    </div>
  );
};

interface ProposalStatusPanelProps {
  proposalCounts: Record<ProposalStatus, number>;
  onFilterByStatus: (status: ProposalStatus | null) => void;
}

const ProposalStatusPanel: React.FC<ProposalStatusPanelProps> = ({ 
  proposalCounts, 
  onFilterByStatus 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <StatusCard
        title="Solicitadas"
        count={proposalCounts.REQUEST}
        icon={<UserCheck className="h-5 w-5 text-blue-600" />}
        color="border-l-4 border-l-blue-500"
        onClick={() => onFilterByStatus('REQUEST')}
      />
      
      <StatusCard
        title="Em Análise"
        count={proposalCounts.ANALYSIS}
        icon={<Clock className="h-5 w-5 text-amber-600" />}
        color="border-l-4 border-l-amber-500"
        onClick={() => onFilterByStatus('ANALYSIS')}
      />
      
      <StatusCard
        title="Aprovadas"
        count={proposalCounts.APPROVED}
        icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
        color="border-l-4 border-l-green-500"
        onClick={() => onFilterByStatus('APPROVED')}
      />
      
      <StatusCard
        title="Rejeitadas"
        count={proposalCounts.REJECTED}
        icon={<XCircle className="h-5 w-5 text-red-600" />}
        color="border-l-4 border-l-red-500"
        onClick={() => onFilterByStatus('REJECTED')}
      />
      
      <StatusCard
        title="Convertidas"
        count={proposalCounts.CONVERTED}
        icon={<FileCheck className="h-5 w-5 text-violet-600" />}
        color="border-l-4 border-l-violet-500"
        onClick={() => onFilterByStatus('CONVERTED')}
      />
      
      <StatusCard
        title="Todas"
        count={Object.values(proposalCounts).reduce((acc, curr) => acc + curr, 0)}
        icon={<AlertTriangle className="h-5 w-5 text-indigo-600" />}
        color="border-l-4 border-l-indigo-500"
        onClick={() => onFilterByStatus(null)}
      />
    </div>
  );
};

export default ProposalStatusPanel;
