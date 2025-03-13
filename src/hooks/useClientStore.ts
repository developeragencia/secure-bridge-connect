
import { create } from 'zustand';

interface Client {
  id: string;
  name: string;
  cnpj: string;
  status: 'ACTIVE' | 'INACTIVE';
}

interface ClientStore {
  clients: Client[];
  activeClient: Client | null;
  setActiveClient: (client: Client) => void;
  clearActiveClient: () => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [
    { id: 'client-1', name: 'Empresa ABC Ltda', cnpj: '12.345.678/0001-99', status: 'ACTIVE' },
    { id: 'client-2', name: 'Indústrias XYZ S/A', cnpj: '98.765.432/0001-10', status: 'ACTIVE' },
    { id: 'client-3', name: 'Comércio FastShop Ltda', cnpj: '45.678.901/0001-23', status: 'INACTIVE' }
  ],
  activeClient: null,
  setActiveClient: (client) => set({ activeClient: client }),
  clearActiveClient: () => set({ activeClient: null })
}));
