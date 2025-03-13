
import { useClientStore } from './useClientStore';

export const useActiveClient = () => {
  const { activeClient, clients, setActiveClient, clearActiveClient } = useClientStore();
  
  const handleSelectClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setActiveClient(client);
    }
  };
  
  return {
    activeClient,
    clients,
    setActiveClient,
    clearActiveClient,
    handleSelectClient
  };
};
