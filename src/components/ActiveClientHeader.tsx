
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, ChevronDown, Bell, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useClientStore } from '@/hooks/useClientStore';
import { cn } from '@/lib/utils';

const ActiveClientHeader = () => {
  const { activeClient, setActiveClient, recentClients } = useClientStore();
  const navigate = useNavigate();

  const handleClientSwitch = (client: any) => {
    setActiveClient(client);
    navigate('/dashboard');
  };

  return (
    <div className="w-full bg-primary/10 border-b border-primary/20 py-1.5 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-xs text-muted-foreground">Cliente Ativo:</div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className={cn(
                "h-auto py-1 pl-2 pr-1 text-sm font-medium rounded-md",
                activeClient ? "text-primary" : "text-muted-foreground"
              )}>
                {activeClient ? (
                  <div className="flex items-center">
                    <Building className="h-3.5 w-3.5 mr-1.5" />
                    <span className="max-w-[140px] truncate">{activeClient.name}</span>
                    <span className="ml-1 text-xs text-muted-foreground">({activeClient.cnpj})</span>
                    <ChevronDown className="ml-1 h-3.5 w-3.5" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>Selecionar Cliente</span>
                    <ChevronDown className="ml-1 h-3.5 w-3.5" />
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-2">
              <div className="space-y-2">
                <div className="text-sm font-medium pb-1 border-b">Clientes Recentes</div>
                {recentClients.length > 0 ? (
                  <div className="space-y-1">
                    {recentClients.map((client) => (
                      <Button 
                        key={client.id} 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start text-left"
                        onClick={() => handleClientSwitch(client)}
                      >
                        <Building className="h-3.5 w-3.5 mr-1.5" />
                        <span className="max-w-[180px] truncate">{client.name}</span>
                        <span className="ml-1 text-xs text-muted-foreground">({client.cnpj})</span>
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground py-2">
                    Nenhum cliente recente
                  </div>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-between"
                  onClick={() => navigate('/clients')}
                >
                  <span>Ver todos os clientes</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/notifications')}
            className="relative h-8 w-8"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActiveClientHeader;
