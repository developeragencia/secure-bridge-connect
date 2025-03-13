
import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginLoadingState: React.FC = () => {
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
};

export default LoginLoadingState;
