
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { toast } from 'sonner';

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Log domain information for debugging
  useEffect(() => {
    const hostname = window.location.hostname;
    console.log("Admin auth initialized on domain:", hostname);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check for remembered auth in localStorage
        const rememberedAuth = localStorage.getItem('adminAuthRemembered');
        const adminAuth = localStorage.getItem('adminAuth');
        let adminAuthData = null;
        
        if (rememberedAuth) {
          try {
            const authData = JSON.parse(rememberedAuth);
            const now = Date.now();
            const authTime = authData.timestamp || 0;
            // 30 days validity
            if (now - authTime < 30 * 24 * 60 * 60 * 1000) {
              setUser({ email: authData.email || 'admin@sistemasclaudio.com' });
              setLoading(false);
              return;
            } else {
              localStorage.removeItem('adminAuthRemembered');
            }
          } catch (e) {
            console.error("Error parsing remembered auth:", e);
            localStorage.removeItem('adminAuthRemembered');
          }
        }
        
        // Then check regular session
        if (adminAuth) {
          try {
            adminAuthData = JSON.parse(adminAuth);
            const now = Date.now();
            const authTime = adminAuthData.timestamp || 0;
            // 1 day validity
            if (now - authTime < 24 * 60 * 60 * 1000) {
              setUser({ email: adminAuthData.email || 'admin@sistemasclaudio.com' });
              setLoading(false);
              return;
            } else {
              localStorage.removeItem('adminAuth');
              adminAuthData = null;
            }
          } catch (e) {
            console.error("Error parsing admin auth:", e);
            localStorage.removeItem('adminAuth');
          }
        }
        
        // Finally check Supabase session
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Supabase auth error:", error);
          throw error;
        }
        
        if (data.session) {
          setUser(data.session.user);
          setLoading(false);
        } else {
          // No valid session found, redirect to login
          navigate('/login');
        }
      } catch (error) {
        console.error("Authentication error:", error);
        toast.error("Erro de autenticação. Por favor, faça login novamente.");
        setLoading(false);
        navigate('/login');
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminAuthRemembered');
          setUser(null);
          navigate('/login');
        } else if (session) {
          setUser(session.user);
          setLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('adminAuth');
      localStorage.removeItem('adminAuthRemembered');
      await supabase.auth.signOut();
      uiToast({
        title: "Sessão encerrada",
        description: "Você foi desconectado com sucesso.",
      });
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
      uiToast({
        variant: "destructive",
        title: "Erro ao fazer logout",
        description: "Ocorreu um erro ao tentar encerrar sua sessão.",
      });
    }
  };

  return { user, loading, handleLogout };
};
