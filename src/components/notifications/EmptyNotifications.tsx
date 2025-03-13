
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const EmptyNotifications: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-muted/40 rounded-lg border border-border">
      <div className="h-12 w-12 rounded-full bg-muted/60 flex items-center justify-center mb-4">
        <Bell className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-1">Não há notificações</h3>
      <p className="text-muted-foreground text-center max-w-md mb-4">
        Você não tem notificações no momento. As notificações sobre novos créditos 
        identificados e outras atualizações importantes aparecerão aqui.
      </p>
      <Button 
        variant="outline" 
        onClick={() => navigate('/dashboard')}
      >
        Voltar para o Dashboard
      </Button>
    </div>
  );
};

export default EmptyNotifications;
