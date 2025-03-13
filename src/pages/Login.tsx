import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedLogo from '@/components/AnimatedLogo';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Key, Mail, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const ADMIN_EMAIL = 'admin@sistemasclaudio.com';
const ADMIN_PASSWORD = 'admin123';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check localStorage first for remembered session
        const rememberedAuth = localStorage.getItem('adminAuthRemembered');
        
        if (rememberedAuth) {
          try {
            const authData = JSON.parse(rememberedAuth);
            // If saved session is less than 30 days old, use it
            if (authData && (Date.now() - authData.timestamp) < 30 * 24 * 60 * 60 * 1000) {
              navigate('/admin');
              return;
            } else {
              // Clear expired remembered login
              localStorage.removeItem('adminAuthRemembered');
            }
          } catch (e) {
            localStorage.removeItem('adminAuthRemembered');
          }
        }
        
        // Check Supabase session as fallback
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          navigate('/admin');
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
          navigate('/admin');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Simplified login approach - direct login without trying to create a user first
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Admin fallback login for demo purposes
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        console.log('Using fallback admin login');
        
        // Set a mock session for demo purposes
        const authData = {
          email: ADMIN_EMAIL,
          isAdmin: true,
          timestamp: Date.now()
        };
        
        // Store in the appropriate storage based on remember me option
        if (rememberMe) {
          localStorage.setItem('adminAuthRemembered', JSON.stringify(authData));
        } else {
          localStorage.setItem('adminAuth', JSON.stringify(authData));
        }
        
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao Painel Administrativo.",
        });
        
        navigate('/admin');
        return;
      }
      
      // Regular Supabase authentication
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // If rememberMe is checked, setup session persistence
      if (rememberMe) {
        // Store auth info with longer expiry
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          localStorage.setItem('adminAuthRemembered', JSON.stringify({
            timestamp: Date.now(),
            sessionExpiry: data.session.expires_at
          }));
        }
      }

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Painel Administrativo.",
      });
      
      navigate('/admin');
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Erro de autenticação",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10 dark:from-background dark:to-background/80">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative bg-gradient-to-br from-primary/5 to-secondary/10 dark:from-background dark:to-background/80 px-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Animated background shapes */}
      <div className="absolute pointer-events-none">
        <motion.div
          className="absolute w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-primary/10 -top-20 -right-20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-secondary/10 -bottom-20 -left-20"
          animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
      
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <AnimatedLogo showText={true} />
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md z-10"
      >
        <Card className="shadow-xl border-primary/10 overflow-hidden bg-white/90 backdrop-blur-md dark:bg-background/80">
          <CardHeader className="space-y-1 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="mx-auto w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-2 sm:mb-3">
                <Shield className="h-6 sm:h-7 w-6 sm:w-7 text-primary" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Acesso Administrativo
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Entre com suas credenciais para acessar o painel
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.form 
              onSubmit={handleLogin} 
              className="space-y-3 sm:space-y-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@sistemasclaudio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 border-primary/20 focus-visible:ring-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 border-primary/20 focus-visible:ring-primary"
                  />
                </div>
              </div>
              
              {/* Remember Me Option - Mobile Optimized */}
              <div className="flex items-center space-x-2">
                <Switch 
                  id="remember-me" 
                  checked={rememberMe} 
                  onCheckedChange={setRememberMe}
                  className="data-[state=checked]:bg-primary"
                />
                <Label 
                  htmlFor="remember-me" 
                  className="text-xs sm:text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                >
                  Manter conectado
                </Label>
              </div>
              
              {error && (
                <motion.div 
                  className="text-xs sm:text-sm text-destructive bg-destructive/10 p-2 sm:p-3 rounded"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.div>
              )}
              
              <Button 
                type="submit" 
                className="w-full transition-all hover:shadow-lg hover:shadow-primary/20"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>

              <div className="text-[10px] sm:text-xs text-center text-muted-foreground">
                <p>Email padrão: <span className="font-medium">admin@sistemasclaudio.com</span></p>
                <p>Senha padrão: <span className="font-medium">admin123</span></p>
              </div>
            </motion.form>
          </CardContent>
          <CardFooter className="flex justify-center text-center">
            <motion.p 
              className="text-[10px] sm:text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              Sistema Administrativo © {new Date().getFullYear()} Claudio Figueiredo | 
              Desenvolvido por <a href="https://alexdesenvolvedor.com.br" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Alex Developer
              </a>
            </motion.p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
