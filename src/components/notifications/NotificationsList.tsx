
import React from 'react';
import { 
  CheckCircle, AlertCircle, 
  InfoIcon, AlertTriangle,
  Check, Trash2
} from 'lucide-react';
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Notification } from '@/hooks/useNotificationStore';

interface NotificationsListProps {
  notifications: Notification[];
  onNotificationClick: (id: string, link?: string) => void;
  onRemove: (id: string, e: React.MouseEvent) => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onNotificationClick,
  onRemove
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'info':
      default:
        return <InfoIcon className="h-5 w-5 text-primary" />;
    }
  };

  const getNotificationTime = (date: string) => {
    return formatDistanceToNow(new Date(date), { 
      addSuffix: true,
      locale: ptBR
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
      {notifications.map((notification) => (
        <Card 
          key={notification.id} 
          className={cn(
            "cursor-pointer transition-all hover:shadow-md",
            !notification.read && "border-l-4 border-l-primary bg-primary/5"
          )}
          onClick={() => onNotificationClick(notification.id, notification.link)}
        >
          <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
            <div className="flex">
              <div className="mr-3 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>
              <div>
                <CardTitle className="text-base">{notification.title}</CardTitle>
                <CardDescription className="text-xs mt-1">
                  {getNotificationTime(notification.createdAt)}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!notification.read && (
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-muted"
                onClick={(e) => onRemove(notification.id, e)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <p className="text-sm text-foreground">{notification.message}</p>
          </CardContent>
          {notification.link && (
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {notification.read ? 'Visualizado' : 'Clique para ver mais detalhes'}
              </span>
              {notification.read ? (
                <Check className="h-4 w-4 text-muted-foreground" />
              ) : (
                <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  Não lida
                </div>
              )}
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
};

export default NotificationsList;
