
import React from 'react';
import { motion } from 'framer-motion';
import { PanelTop } from 'lucide-react';

const AdminLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
            <div className="relative z-10 h-16 w-16 rounded-full bg-primary flex items-center justify-center">
              <PanelTop className="h-8 w-8 text-white" />
            </div>
          </div>
          <p className="text-lg text-muted-foreground animate-pulse">Carregando painel administrativo...</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoading;
