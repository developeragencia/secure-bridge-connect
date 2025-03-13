
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Client as ClientType } from '@/types/client';

interface ClientStore {
  activeClient: ClientType | null;
  recentClients: ClientType[];
  allClients: ClientType[];
  setActiveClient: (client: ClientType | null) => void;
  addClient: (client: ClientType) => void;
  updateClient: (id: string, data: Partial<ClientType>) => void;
  removeClient: (id: string) => void;
}

export const useClientStore = create<ClientStore>()(
  persist(
    (set, get) => ({
      activeClient: null,
      recentClients: [],
      allClients: [
        {
          id: '1',
          name: 'Empresa ACME Ltda',
          cnpj: '12.345.678/0001-90',
          email: 'contato@acme.com.br',
          phone: '(11) 3456-7890',
          address: 'Av. Paulista, 1000',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01310-000',
          contactName: 'João Silva',
          status: 'ACTIVE',
          createdAt: '2023-06-01T10:00:00Z',
          updatedAt: '2023-06-01T10:00:00Z',
        },
        {
          id: '2',
          name: 'Indústrias XYZ S/A',
          cnpj: '98.765.432/0001-10',
          email: 'financeiro@xyz.com.br',
          phone: '(11) 2345-6789',
          address: 'Rua Augusta, 500',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01304-000',
          contactName: 'Maria Oliveira',
          status: 'ACTIVE',
          createdAt: '2023-07-15T14:30:00Z',
          updatedAt: '2023-07-15T14:30:00Z',
        },
        {
          id: '3',
          name: 'Tech Solutions Brasil',
          cnpj: '56.789.123/0001-45',
          email: 'contato@techsolutions.com.br',
          phone: '(21) 9876-5432',
          address: 'Av. Rio Branco, 100',
          city: 'Rio de Janeiro',
          state: 'RJ',
          zipCode: '20040-007',
          contactName: 'Roberto Santos',
          status: 'ACTIVE',
          createdAt: '2023-08-10T09:15:00Z',
          updatedAt: '2023-08-10T09:15:00Z',
        },
      ],
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
          }
          
          return {
            activeClient: client,
            recentClients
          };
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
      }
    }),
    {
      name: 'client-store'
    }
  )
);
