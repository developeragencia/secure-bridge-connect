
import { Client } from '@/types/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

interface ActiveClientState {
  activeClient: Client | null;
  setActiveClient: (client: Client | null) => void;
  clearActiveClient: () => void;
}

export const useActiveClient = create<ActiveClientState>()(
  persist(
    (set) => ({
      activeClient: null,
      setActiveClient: (client) => {
        set({ activeClient: client });
        if (client) {
          toast.success(`Cliente ativo: ${client.name}`, {
            description: `CNPJ: ${client.cnpj}`,
            duration: 3000,
          });
        }
      },
      clearActiveClient: () => {
        set({ activeClient: null });
        toast.info('Cliente ativo removido', {
          duration: 2000,
        });
      },
    }),
    {
      name: 'active-client-storage',
    }
  )
);
