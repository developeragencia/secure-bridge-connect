
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Client } from '@/types/client';

interface ActiveClientState {
  activeClient: Client | null;
  recentClients: Client[];
  setActiveClient: (client: Client) => void;
  clearActiveClient: () => void;
}

export const useActiveClient = create<ActiveClientState>()(
  persist(
    (set) => ({
      activeClient: null,
      recentClients: [],
      setActiveClient: (client) => set((state) => {
        // Add to recent clients if not already there
        const filteredRecents = state.recentClients.filter(c => c.id !== client.id);
        const newRecents = [client, ...filteredRecents].slice(0, 5); // Keep only 5 most recent
        
        return {
          activeClient: client,
          recentClients: newRecents,
        };
      }),
      clearActiveClient: () => set({ activeClient: null }),
    }),
    {
      name: 'active-client-storage',
    }
  )
);
