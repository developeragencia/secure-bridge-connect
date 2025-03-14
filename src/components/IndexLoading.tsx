
import React from 'react';
import { motion } from 'framer-motion';

const IndexLoading: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="relative mb-4">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
        </div>
        <p className="text-lg text-muted-foreground">Carregando...</p>
      </motion.div>
    </div>
  );
};

export default IndexLoading;
