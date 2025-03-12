
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

const ADMIN_EMAIL = 'admin@sistemasclaudio.com';
const ADMIN_PASSWORD = 'essaadmin123';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const setupAdminUser = async () => {
      try {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD
        });

        if (signInError && signInError.message.includes('Invalid login credentials')) {
          console.log('Admin user does not exist. Creating...');
          
          const { error: signUpError } = await supabase.auth.signUp({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
          });

          if (signUpError) {
            console.error('Failed to create admin user:', signUpError);
          } else {
            console.log('Admin user created successfully');
            
            await supabase.auth.signOut();
          }
        }
        
        setInitializing(false);
      } catch (err) {
        console.error('Error during admin setup:', err);
        setInitializing(false);
      }
    };
    
    setupAdminUser();
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/admin');
      } else {
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Painel Administrativo.",
        variant: "default",
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
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative bg-gradient-to-br from-primary/5 to-secondary/10 dark:from-background dark:to-background/80">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Animated background shapes */}
      <div className="absolute pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-primary/10 -top-20 -right-20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-72 h-72 rounded-full bg-secondary/10 -bottom-20 -left-20"
          animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
      
      <div className="absolute top-6 left-6 z-10">
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
              <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Acesso Administrativo
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Entre com suas credenciais para acessar o painel
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.form 
              onSubmit={handleLogin} 
              className="space-y-4"
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
              
              {error && (
                <motion.div 
                  className="text-sm text-destructive bg-destructive/10 p-3 rounded"
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

              <div className="text-xs text-center text-muted-foreground">
                <p>Email padrão: <span className="font-medium">admin@sistemasclaudio.com</span></p>
                <p>Senha padrão: <span className="font-medium">essaadmin123</span></p>
              </div>
            </motion.form>
          </CardContent>
          <CardFooter className="flex justify-center text-center">
            <motion.p 
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              Sistema Administrativo © {new Date().getFullYear()} Claudio Figueiredo
            </motion.p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
