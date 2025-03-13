
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const useLoginCheck = () => {
  const [initializing, setInitializing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check localStorage first for remembered session
        const rememberedAuth = localStorage.getItem('adminAuthRemembered');
        const sessionAuth = localStorage.getItem('adminAuth');
        
        if (rememberedAuth) {
          try {
            const authData = JSON.parse(rememberedAuth);
            // If saved session is less than 30 days old, use it
            if (authData && (Date.now() - authData.timestamp) < 30 * 24 * 60 * 60 * 1000) {
              // Delay navigation to ensure smooth transition
              setTimeout(() => {
                navigate('/admin');
              }, 300);
              return;
            } else {
              // Clear expired remembered login
              localStorage.removeItem('adminAuthRemembered');
            }
          } catch (e) {
            localStorage.removeItem('adminAuthRemembered');
          }
        }
        
        // Check regular session
        if (sessionAuth) {
          try {
            const authData = JSON.parse(sessionAuth);
            if (authData && (Date.now() - authData.timestamp) < 24 * 60 * 60 * 1000) {
              // Delay navigation to ensure smooth transition
              setTimeout(() => {
                navigate('/admin');
              }, 300);
              return;
            } else {
              // Clear expired session
              localStorage.removeItem('adminAuth');
            }
          } catch (e) {
            localStorage.removeItem('adminAuth');
          }
        }
        
        // Check Supabase session as fallback
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error checking Supabase session:", error);
          toast.error("Erro ao verificar a sessão");
        }
        
        if (data.session) {
          // Delay navigation to ensure smooth transition
          setTimeout(() => {
            navigate('/admin');
          }, 300);
        } else {
          setInitializing(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setInitializing(false);
      }
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setTimeout(() => {
            navigate('/admin');
          }, 300);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return { initializing };
};

export default useLoginCheck;
