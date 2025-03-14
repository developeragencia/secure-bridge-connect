
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LoginLoadingState: React.FC = () => {
  const [loadingTime, setLoadingTime] = useState(0);
  const navigate = useNavigate();
  
  // If loading takes too long, provide a way to continue
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleRedirect = () => {
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10 dark:from-background dark:to-background/80">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </motion.div>
      
      {loadingTime > 3 && ( // Reduced from 5 to 3 seconds for faster feedback
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground mb-2">O carregamento está demorando mais do que o esperado.</p>
          <button 
            onClick={handleRedirect}
            className="text-primary hover:underline focus:outline-none"
          >
            Clique aqui para ir para a página de login
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default React.memo(LoginLoadingState);
