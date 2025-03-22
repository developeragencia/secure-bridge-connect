import React, { createContext, useCallback, useEffect, useState } from 'react';
import { User } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { getAvailablePermissions } from '@/lib/permissions';

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
  updateUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedUser = localStorage.getItem('@SecureBridgeConnect:user');
        const storedToken = localStorage.getItem('@SecureBridgeConnect:token');

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          // Garante que as permissões estão atualizadas
          parsedUser.permissions = getAvailablePermissions(parsedUser.role);
          setUser(parsedUser);
          // TODO: Validar token e renovar se necessário
        }
      } catch (error) {
        console.error('Erro ao carregar dados armazenados:', error);
        localStorage.removeItem('@SecureBridgeConnect:user');
        localStorage.removeItem('@SecureBridgeConnect:token');
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredData();
  }, []);

  const signIn = useCallback(async ({ email, password }: { email: string; password: string }) => {
    try {
      setIsLoading(true);

      // TODO: Implementar autenticação com a API
      const response = {
        user: {
          id: '1',
          name: 'John Doe',
          email,
          role: 'MASTER_ADMIN' as const,
          permissions: getAvailablePermissions('MASTER_ADMIN'),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: 'dummy-token',
      };

      const { user: userData, token } = response;

      localStorage.setItem('@SecureBridgeConnect:user', JSON.stringify(userData));
      localStorage.setItem('@SecureBridgeConnect:token', token);

      setUser(userData);
      navigate('/dashboard');

      toast({
        title: 'Login realizado com sucesso',
        description: `Bem-vindo(a), ${userData.name}!`,
      });
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: 'Ocorreu um erro ao fazer login. Verifique suas credenciais.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [navigate, toast]);

  const signOut = useCallback(() => {
    localStorage.removeItem('@SecureBridgeConnect:user');
    localStorage.removeItem('@SecureBridgeConnect:token');
    setUser(null);
    navigate('/login');

    toast({
      title: 'Logout realizado com sucesso',
      description: 'Você foi desconectado com sucesso.',
    });
  }, [navigate, toast]);

  const updateUser = useCallback((userData: User) => {
    // Garante que as permissões estão atualizadas
    userData.permissions = getAvailablePermissions(userData.role);
    localStorage.setItem('@SecureBridgeConnect:user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 