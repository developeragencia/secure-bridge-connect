
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, ArrowLeft, CheckCircle, AlertCircle, 
  InfoIcon, CheckCheck, Trash2, AlertTriangle,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useNotificationStore } from '@/hooks/useNotificationStore';
import ActiveClientHeader from '@/components/ActiveClientHeader';

const Notifications = () => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    removeNotification,
    clearAll
  } = useNotificationStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Mark notifications as viewed when the page is opened
    const unreadNotifications = notifications.filter(n => !n.read);
    if (unreadNotifications.length > 0) {
      setTimeout(() => {
        markAllAsRead();
      }, 3000);
    }
  }, [notifications, markAllAsRead]);

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

  const handleNotificationClick = (id: string, link?: string) => {
    markAsRead(id);
    if (link) {
      navigate(link);
    }
  };

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeNotification(id);
    toast({
      title: "Notificação removida",
      description: "A notificação foi removida com sucesso",
    });
  };

  const handleClearAll = () => {
    clearAll();
    toast({
      title: "Notificações limpas",
      description: "Todas as notificações foram removidas",
    });
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast({
      title: "Notificações lidas",
      description: "Todas as notificações foram marcadas como lidas",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <ActiveClientHeader />
      <div className="container mx-auto p-4 sm:p-6">
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
              onClick={handleMarkAllAsRead}
              disabled={!notifications.some(n => !n.read)}
            >
              <CheckCheck className="mr-2 h-4 w-4" />
              Marcar todas como lidas
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleClearAll}
              disabled={notifications.length === 0}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Limpar todas
            </Button>
          </div>
        </div>

        {notifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  !notification.read && "border-l-4 border-l-primary bg-primary/5"
                )}
                onClick={() => handleNotificationClick(notification.id, notification.link)}
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
                      onClick={(e) => handleRemove(notification.id, e)}
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
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Notifications;
