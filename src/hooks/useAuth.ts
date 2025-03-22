
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // Add a helper method for checking permissions (used in ProtectedRoute)
  const checkPermission = (permission: string) => {
    return context.user?.permissions?.includes(permission) || false;
  };

  const isAuthenticated = !!context.user;

  return { 
    ...context,
    isAuthenticated,
    checkPermission
  };
}
