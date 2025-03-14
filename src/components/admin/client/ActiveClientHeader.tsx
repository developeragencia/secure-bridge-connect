
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveClient } from '@/hooks/useActiveClient';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, User, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ActiveClientHeader = () => {
  const { activeClient, clearActiveClient } = useActiveClient();
  const navigate = useNavigate();
  
  if (!activeClient) return null;
  
  const handleViewClient = () => {
    navigate(`/admin/client/${activeClient.id}`);
  };
  
  return (
    <AnimatePresence>
      {activeClient && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-primary/10 border border-primary/20 rounded-md px-4 py-2 flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-primary text-primary-foreground">
              <Building className="h-3 w-3 mr-1" />
              Cliente Ativo
            </Badge>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold">{activeClient.name}</span>
              <span className="text-sm text-muted-foreground">({activeClient.cnpj})</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleViewClient} className="h-8">
              <User className="h-3.5 w-3.5 mr-1.5" />
              Ver Cliente
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={clearActiveClient}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActiveClientHeader;
