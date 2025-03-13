
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ActiveClientHeader from '@/components/ActiveClientHeader';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';

interface CreditDetails {
  id: string;
  amount: number;
  date: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  clientName: string;
}

const CreditDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [credit, setCredit] = useState<CreditDetails | null>(null);

  useEffect(() => {
    // Simulate fetching credit details
    const fetchCreditDetails = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for the demo
        setCredit({
          id: id || '123',
          amount: 5432.10,
          date: new Date().toISOString(),
          description: 'Crédito identificado para Empresa ACME Ltda',
          status: 'approved',
          clientName: 'Empresa ACME Ltda'
        });
      } catch (error) {
        toast({
          title: "Erro ao carregar crédito",
          description: "Não foi possível carregar os detalhes do crédito.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCreditDetails();
    }
  }, [id, toast]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <ActiveClientHeader />
      <div className="container mx-auto p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Detalhes do Crédito</h1>
        </div>

        {loading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-1/3 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ) : credit ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex justify-between">
                <span>{credit.clientName}</span>
                <span className="text-primary">{formatCurrency(credit.amount)}</span>
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Data: {formatDate(credit.date)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Descrição</h3>
                <p>{credit.description}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Status</h3>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Aprovado
                </div>
              </div>
              <div className="pt-4">
                <Button onClick={() => navigate('/admin')}>
                  Voltar para Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-8">
            <p>Crédito não encontrado</p>
            <Button className="mt-4" onClick={() => navigate('/admin')}>
              Voltar para Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditDetails;
