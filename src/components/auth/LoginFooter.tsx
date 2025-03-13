
import React from 'react';
import { motion } from 'framer-motion';

const LoginFooter: React.FC = () => {
  return (
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
  );
};

export default LoginFooter;
