
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const LoginFooter: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center gap-4 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.7 }}
    >
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full text-xs sm:text-sm hover:bg-background/80"
        asChild
      >
        <Link to="/">
          <Home className="h-4 w-4 mr-2" />
          Voltar para Home
        </Link>
      </Button>
      <p className="text-[10px] sm:text-xs text-muted-foreground">
        Sistema Administrativo © {new Date().getFullYear()} Claudio Figueiredo | 
        Desenvolvido por <a href="https://alexdesenvolvedor.com.br" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Alex Developer
        </a>
      </p>
    </motion.div>
  );
};

export default LoginFooter;
