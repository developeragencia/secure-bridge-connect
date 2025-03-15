
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

interface LoadingScreenProps {
  message?: string;
  variant?: 'default' | 'admin' | 'auth';
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Carregando...", 
  variant = 'default' 
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <div className="mb-6">
          <AnimatedLogo size="lg" loading={true} />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-4"
        >
          <div className="relative mb-2">
            <div className="w-20 h-1.5 bg-primary/20 rounded-full mx-auto overflow-hidden">
              <motion.div 
                className="h-full bg-primary rounded-full"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.2, 
                  ease: "linear"
                }}
              />
            </div>
          </div>
          <p className="text-base text-muted-foreground text-center font-medium">{message}</p>
          
          {variant === 'admin' && (
            <p className="mt-1 text-sm text-muted-foreground/70 text-center">
              Área Administrativa
            </p>
          )}
          
          {variant === 'auth' && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-4 text-sm text-primary/80 text-center cursor-pointer hover:underline"
              onClick={() => window.location.href = '/login'}
            >
              Clique aqui se a página não carregar
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default React.memo(LoadingScreen);
