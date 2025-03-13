
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginHeader: React.FC = () => {
  return (
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
  );
};

export default LoginHeader;
