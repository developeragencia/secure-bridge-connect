import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center">
          <ShieldOff className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Acesso Não Autorizado
          </h1>
          <p className="text-muted-foreground mb-6">
            Você não tem permissão para acessar esta página.
            Entre em contato com o administrador se acredita que isso é um erro.
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Ir para a página inicial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized; 