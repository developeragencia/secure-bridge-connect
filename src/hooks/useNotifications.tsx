
import { useCallback, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNotificationStore } from '@/hooks/useNotificationStore';

export const useNotifications = () => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    removeNotification,
    clearAll
  } = useNotificationStore();
  const { toast } = useToast();

  // Mark notifications as viewed when the page is opened
  useEffect(() => {
    const unreadNotifications = notifications.filter(n => !n.read);
    if (unreadNotifications.length > 0) {
      const timeout = setTimeout(() => {
        markAllAsRead();
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [notifications, markAllAsRead]);

  const handleNotificationClick = useCallback((id: string, link?: string) => {
    markAsRead(id);
    return link;
  }, [markAsRead]);

  const handleRemove = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeNotification(id);
    toast({
      title: "Notificação removida",
      description: "A notificação foi removida com sucesso",
    });
  }, [removeNotification, toast]);

  const handleClearAll = useCallback(() => {
    clearAll();
    toast({
      title: "Notificações limpas",
      description: "Todas as notificações foram removidas",
    });
  }, [clearAll, toast]);

  const handleMarkAllAsRead = useCallback(() => {
    markAllAsRead();
    toast({
      title: "Notificações lidas",
      description: "Todas as notificações foram marcadas como lidas",
    });
  }, [markAllAsRead, toast]);

  const hasUnreadNotifications = notifications.some(n => !n.read);

  return {
    notifications,
    hasUnreadNotifications,
    handleNotificationClick,
    handleRemove,
    handleClearAll,
    handleMarkAllAsRead
  };
};
