import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Client } from '@/types/client';
import { toast } from 'sonner';

// Extend Client type to include user role permissions
interface ClientWithPermissions extends Client {
  userRoles?: {
    canViewOperations: boolean;
    canEditOperations: boolean;
    canApproveOperations: boolean;
    isAdmin: boolean;
    isRepresentative: boolean;
  }
}

interface ClientStore {
  activeClient: ClientWithPermissions | null;
  recentClients: ClientWithPermissions[];
  allClients: ClientWithPermissions[]; 
  pendingProposals: number;
  setActiveClient: (client: ClientWithPermissions | null) => void;
  addClient: (client: ClientWithPermissions) => void;
  updateClient: (id: string, data: Partial<ClientWithPermissions>) => void;
  removeClient: (id: string) => void;
  clearActiveClient: () => void;
  setPendingProposals: (count: number) => void;
  // Alias for backward compatibility
  clients: ClientWithPermissions[];
}

export const useClientStore = create<ClientStore>()(
  persist(
    (set, get) => ({
      activeClient: null,
      recentClients: [],
      allClients: [
        {
          id: '1',
          name: 'Prefeitura Municipal de São Paulo',
          cnpj: '12.345.678/0001-90',
          documentNumber: '12.345.678/0001-90',
          email: 'contato@prefeitura.sp.gov.br',
          phone: '(11) 3456-7890',
          address: 'Praça da Sé, 1000',
          city: 'São Paulo',
          state: 'SP',
          contactName: 'João Silva',
          contactEmail: 'joao@prefeitura.sp.gov.br',
          contactPhone: '(11) 98765-4321',
          status: 'ACTIVE',
          createdAt: '2023-06-01T10:00:00Z',
          updatedAt: '2023-06-01T10:00:00Z',
          segment: 'Municipal',
          type: 'public',
          userRoles: {
            canViewOperations: true,
            canEditOperations: false,
            canApproveOperations: false,
            isAdmin: false,
            isRepresentative: false
          }
        },
        {
          id: '2',
          name: 'Secretaria Estadual de Saúde',
          cnpj: '98.765.432/0001-10',
          documentNumber: '98.765.432/0001-10',
          email: 'financeiro@saude.sp.gov.br',
          phone: '(11) 2345-6789',
          address: 'Av. Dr. Arnaldo, 500',
          city: 'São Paulo',
          state: 'SP',
          contactName: 'Maria Oliveira',
          contactEmail: 'maria@saude.sp.gov.br',
          contactPhone: '(11) 98765-4321',
          status: 'ACTIVE',
          createdAt: '2023-07-15T14:30:00Z',
          updatedAt: '2023-07-15T14:30:00Z',
          segment: 'Estadual',
          type: 'public',
          userRoles: {
            canViewOperations: true,
            canEditOperations: true,
            canApproveOperations: false,
            isAdmin: false,
            isRepresentative: false
          }
        },
        {
          id: '3',
          name: 'Universidade Federal',
          cnpj: '56.789.123/0001-45',
          documentNumber: '56.789.123/0001-45',
          email: 'contato@universidade.edu.br',
          phone: '(21) 9876-5432',
          address: 'Av. Universitária, 100',
          city: 'Rio de Janeiro',
          state: 'RJ',
          contactName: 'Roberto Santos',
          contactEmail: 'roberto@universidade.edu.br',
          contactPhone: '(21) 98765-4321',
          status: 'ACTIVE',
          createdAt: '2023-08-10T09:15:00Z',
          updatedAt: '2023-08-10T09:15:00Z',
          segment: 'Federal',
          type: 'public',
          userRoles: {
            canViewOperations: true,
            canEditOperations: true,
            canApproveOperations: true,
            isAdmin: false,
            isRepresentative: false
          }
        },
      ],
      pendingProposals: 3,
      // Define clients getter that returns allClients
      get clients() {
        return get().allClients;
      },
      setActiveClient: (client) => {
        set((state) => {
          // Update recent clients
          let recentClients = [...state.recentClients];
          
          if (client) {
            // Remove if already exists
            recentClients = recentClients.filter(c => c.id !== client.id);
            // Add to beginning of array
            recentClients.unshift(client);
            // Limit to 5 recent clients
            recentClients = recentClients.slice(0, 5);
            
            // Show toast notification
            toast.success(`Cliente ativo: ${client.name}`, {
              description: `CNPJ: ${client.cnpj}`,
              duration: 3000,
            });
          }
          
          return {
            activeClient: client,
            recentClients
          };
        });
      },
      clearActiveClient: () => {
        set({ activeClient: null });
        toast.info('Cliente ativo removido', {
          duration: 2000,
        });
      },
      addClient: (client) => {
        set((state) => ({
          allClients: [...state.allClients, client]
        }));
      },
      updateClient: (id, data) => {
        set((state) => {
          const updatedClients = state.allClients.map(client => 
            client.id === id ? { ...client, ...data } : client
          );
          
          // Update active client if it's the one being modified
          let updatedActiveClient = state.activeClient;
          if (state.activeClient && state.activeClient.id === id) {
            updatedActiveClient = { ...state.activeClient, ...data };
          }
          
          // Update recent clients if needed
          const updatedRecentClients = state.recentClients.map(client => 
            client.id === id ? { ...client, ...data } : client
          );
          
          return {
            allClients: updatedClients,
            activeClient: updatedActiveClient,
            recentClients: updatedRecentClients
          };
        });
      },
      removeClient: (id) => {
        set((state) => {
          // Remove from all clients
          const updatedClients = state.allClients.filter(client => client.id !== id);
          
          // Remove from recent clients
          const updatedRecentClients = state.recentClients.filter(client => client.id !== id);
          
          // Reset active client if it's the one being removed
          const updatedActiveClient = 
            state.activeClient && state.activeClient.id === id 
              ? null 
              : state.activeClient;
          
          return {
            allClients: updatedClients,
            recentClients: updatedRecentClients,
            activeClient: updatedActiveClient
          };
        });
      },
      setPendingProposals: (count) => {
        set({ pendingProposals: count });
      }
    }),
    {
      name: 'client-store'
    }
  )
);

// Create a custom hook for active client management
export const useActiveClient = () => {
  const store = useClientStore();
  
  return {
    activeClient: store.activeClient,
    setActiveClient: store.setActiveClient,
    clearActiveClient: store.clearActiveClient,
    recentClients: store.recentClients, // Added recentClients property to fix the error
    hasViewAccess: store.activeClient?.userRoles?.canViewOperations || false,
    hasEditAccess: store.activeClient?.userRoles?.canEditOperations || false,
    hasApprovalAccess: store.activeClient?.userRoles?.canApproveOperations || false,
    isClientAdmin: store.activeClient?.userRoles?.isAdmin || false,
    isRepresentative: store.activeClient?.userRoles?.isRepresentative || false
  };
};
