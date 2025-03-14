
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  EyeIcon, 
  PenIcon, 
  User, 
  UserCog 
} from 'lucide-react';
import { Client } from '@/types/client.d';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ClientOperationsAccessProps {
  client: Client;
  compact?: boolean;
}

const ClientOperationsAccess: React.FC<ClientOperationsAccessProps> = ({ 
  client, 
  compact = false 
}) => {
  // Get user roles from client (default to some basic permissions if not defined)
  const userRoles = client.userRoles || {
    canViewOperations: true,
    canEditOperations: false,
    canApproveOperations: false,
    isAdmin: false,
    isRepresentative: false
  };

  // Define access badges
  const accessBadges = [
    {
      name: 'Visualização',
      icon: <EyeIcon className="h-3 w-3" />,
      enabled: userRoles.canViewOperations,
      tooltip: 'Pode visualizar operações'
    },
    {
      name: 'Edição',
      icon: <PenIcon className="h-3 w-3" />,
      enabled: userRoles.canEditOperations,
      tooltip: 'Pode editar operações'
    },
    {
      name: 'Aprovação',
      icon: <Shield className="h-3 w-3" />,
      enabled: userRoles.canApproveOperations, 
      tooltip: 'Pode aprovar operações'
    },
    {
      name: 'Admin',
      icon: <UserCog className="h-3 w-3" />,
      enabled: userRoles.isAdmin,
      tooltip: 'Acesso de administrador'
    },
    {
      name: 'Representante',
      icon: <User className="h-3 w-3" />,
      enabled: userRoles.isRepresentative,
      tooltip: 'Acesso de representante'
    }
  ];

  if (compact) {
    // Compact view shows only enabled permissions as simple icons
    const enabledBadges = accessBadges.filter(badge => badge.enabled);
    
    if (enabledBadges.length === 0) {
      return <Badge variant="outline" className="text-xs px-1.5 h-5 bg-red-500/10 text-red-600">Sem Acesso</Badge>;
    }
    
    return (
      <div className="flex items-center gap-1">
        {enabledBadges.map((badge, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge 
                  variant="outline" 
                  className="p-1 h-5 w-5 flex items-center justify-center bg-primary/5 text-primary"
                >
                  {badge.icon}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{badge.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    );
  }

  // Full view shows all permissions with names and status indicators
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium mb-1.5">Permissões de Acesso</h4>
      <div className="flex flex-wrap gap-2">
        {accessBadges.map((badge, index) => (
          <Badge 
            key={index}
            variant="outline" 
            className={cn(
              "flex items-center gap-1.5 text-xs px-2 py-1",
              badge.enabled 
                ? "bg-green-500/10 text-green-700 dark:text-green-400" 
                : "bg-muted text-muted-foreground"
            )}
          >
            {badge.enabled ? (
              <CheckCircle className="h-3 w-3" />
            ) : (
              <XCircle className="h-3 w-3" />
            )}
            <span>{badge.name}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ClientOperationsAccess;
