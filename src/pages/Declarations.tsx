
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActiveClientHeader from '@/components/ActiveClientHeader';
import { Button } from '@/components/ui/button';
import { FileText, ArrowLeft } from 'lucide-react';

const Declarations = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <ActiveClientHeader />
      <div className="container mx-auto p-4 sm:p-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="h-8 w-8 mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Declarações</h1>
          </div>
        </div>
        
        <div className="bg-muted/40 rounded-lg border border-border p-8 text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Declarações Fiscais</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Aqui você pode visualizar e gerenciar declarações fiscais pendentes e enviadas.
          </p>
          <Button>Gerenciar Declarações</Button>
        </div>
      </div>
    </div>
  );
};

export default Declarations;
