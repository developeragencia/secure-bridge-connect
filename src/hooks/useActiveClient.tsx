
import { Client } from '@/types/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ActiveClientState {
  activeClient: Client | null;
  setActiveClient: (client: Client | null) => void;
  clearActiveClient: () => void;
}

export const useActiveClient = create<ActiveClientState>()(
  persist(
    (set) => ({
      activeClient: null,
      setActiveClient: (client) => set({ activeClient: client }),
      clearActiveClient: () => set({ activeClient: null }),
    }),
    {
      name: 'active-client-storage',
    }
  )
);
