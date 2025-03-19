
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, CheckCircle, PlusCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import BillingPlans from './BillingPlans';

export const CurrentPlan: React.FC = () => {
  const { toast } = useToast();
  const [showPlansSheet, setShowPlansSheet] = React.useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const handleChangePlan = () => {
    setShowPlansSheet(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <CreditCard className="mr-2 h-5 w-5 text-primary" />
            Plano Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-xl font-bold">Plano Empresarial</h3>
            <p className="text-sm text-muted-foreground">Faturamento mensal</p>
          </div>
          <p className="text-3xl font-bold text-primary mb-2">
            {formatCurrency(1250.00)}<span className="text-sm text-muted-foreground">/mês</span>
          </p>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              Acesso a todos os recursos
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              Suporte prioritário
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              Até 10 usuários
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline" onClick={handleChangePlan}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Alterar Plano
          </Button>
        </CardFooter>
      </Card>

      <Sheet open={showPlansSheet} onOpenChange={setShowPlansSheet}>
        <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Escolha seu plano</SheetTitle>
            <SheetDescription>
              Compare os planos disponíveis e escolha o que melhor atende suas necessidades.
            </SheetDescription>
          </SheetHeader>
          <BillingPlans />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CurrentPlan;
