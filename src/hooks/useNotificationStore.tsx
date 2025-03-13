
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
  clientId?: string;
  link?: string;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [
        {
          id: '1',
          title: 'Crédito identificado',
          message: 'Um novo crédito foi identificado para Empresa ACME Ltda no valor de R$ 5.432,10',
          type: 'success',
          read: false,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          clientId: '1',
          link: '/credits/details/123'
        },
        {
          id: '2',
          title: 'Declaração pendente',
          message: 'A declaração para Indústrias XYZ S/A de Maio/2023 está pendente de envio',
          type: 'warning',
          read: false,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          clientId: '2',
          link: '/declarations'
        },
        {
          id: '3',
          title: 'Análise concluída',
          message: 'A análise fiscal para Tech Solutions Brasil foi concluída com sucesso',
          type: 'info',
          read: true,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          clientId: '3',
          link: '/analysis/report/456'
        },
      ],
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Date.now().toString(),
          read: false,
          createdAt: new Date().toISOString()
        };
        
        set((state) => ({
          notifications: [newNotification, ...state.notifications]
        }));
      },
      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map(notification => 
            notification.id === id 
              ? { ...notification, read: true } 
              : notification
          )
        }));
      },
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map(notification => ({ 
            ...notification, 
            read: true 
          }))
        }));
      },
      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter(notification => notification.id !== id)
        }));
      },
      clearAll: () => {
        set({ notifications: [] });
      },
      getUnreadCount: () => {
        return get().notifications.filter(notification => !notification.read).length;
      }
    }),
    {
      name: 'notification-store'
    }
  )
);
