
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import LoginForm from '@/components/auth/LoginForm';
import LoginHeader from '@/components/auth/LoginHeader';
import LoginFooter from '@/components/auth/LoginFooter';
import LoginBackground from '@/components/auth/LoginBackground';
import LoginLoadingState from '@/components/auth/LoginLoadingState';
import useLoginCheck from '@/hooks/useLoginCheck';

const Login = () => {
  const { initializing } = useLoginCheck();
  const navigate = useNavigate();

  if (initializing) {
    return <LoginLoadingState />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative bg-gradient-to-br from-primary/5 to-secondary/10 dark:from-background dark:to-background/80 px-4">
      <LoginBackground />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md z-10"
      >
        <Card className="shadow-xl border-primary/10 overflow-hidden bg-white/90 backdrop-blur-md dark:bg-background/80">
          <CardHeader className="space-y-1 text-center">
            <LoginHeader />
          </CardHeader>
          <CardContent>
            <LoginForm onSuccess={() => navigate('/admin')} />
          </CardContent>
          <CardFooter className="flex justify-center text-center">
            <LoginFooter />
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
