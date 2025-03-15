
import { useClientStore } from './useClientStore';
import { ClientWithPermissions } from '@/types/clientStore';

export const useActiveClient = () => {
  const store = useClientStore();
  
  return {
    activeClient: store.activeClient,
    clients: store.clients,
    setActiveClient: store.setActiveClient,
    clearActiveClient: store.clearActiveClient,
    recentClients: store.recentClients,
    hasViewAccess: store.activeClient?.userRoles?.canViewOperations || false,
    hasEditAccess: store.activeClient?.userRoles?.canEditOperations || false,
    hasApprovalAccess: store.activeClient?.userRoles?.canApproveOperations || false,
    isClientAdmin: store.activeClient?.userRoles?.isAdmin || false,
    isRepresentative: store.activeClient?.userRoles?.isRepresentative || false,
    handleSelectClient: (clientId: string) => {
      const client = store.clients.find(c => c.id === clientId);
      if (client) {
        store.setActiveClient(client);
      }
    }
  };
};
