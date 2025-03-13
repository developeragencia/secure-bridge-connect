
import React from 'react';
import { Bell, ArrowLeft, CheckCheck, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface NotificationsHeaderProps {
  hasNotifications: boolean;
  hasUnreadNotifications: boolean;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

const NotificationsHeader: React.FC<NotificationsHeaderProps> = ({
  hasNotifications,
  hasUnreadNotifications,
  onMarkAllAsRead,
  onClearAll
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="h-8 w-8 mr-1"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Notificações</h1>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onMarkAllAsRead}
          disabled={!hasUnreadNotifications}
        >
          <CheckCheck className="mr-2 h-4 w-4" />
          Marcar todas como lidas
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onClearAll}
          disabled={!hasNotifications}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Limpar todas
        </Button>
      </div>
    </div>
  );
};

export default NotificationsHeader;
