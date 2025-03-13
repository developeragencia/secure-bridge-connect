
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CreditCard,
  Download,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  PlusCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

const BillingContent: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Mock invoices data
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      number: 'INV-2023-001',
      date: '2023-08-01',
      dueDate: '2023-08-15',
      amount: 1250.00,
      status: 'paid',
      description: 'Assinatura Mensal - Agosto/2023'
    },
    {
      id: '2',
      number: 'INV-2023-002',
      date: '2023-09-01',
      dueDate: '2023-09-15',
      amount: 1250.00,
      status: 'pending',
      description: 'Assinatura Mensal - Setembro/2023'
    },
    {
      id: '3',
      number: 'INV-2023-003',
      date: '2023-07-01',
      dueDate: '2023-07-15',
      amount: 1250.00,
      status: 'paid',
      description: 'Assinatura Mensal - Julho/2023'
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Download iniciado",
      description: "O download da fatura foi iniciado.",
    });
  };

  const handlePay = (invoiceId: string) => {
    setInvoices(prev => prev.map(invoice => 
      invoice.id === invoiceId ? { ...invoice, status: 'paid' as const } : invoice
    ));
    
    toast({
      title: "Pagamento processado",
      description: "O pagamento foi processado com sucesso.",
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Faturas atualizadas",
        description: "A lista de faturas foi atualizada com sucesso.",
      });
    }, 1000);
  };

  const getStatusComponent = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500/20 text-green-700 hover:bg-green-500/30">Pago</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500/20 text-amber-700 hover:bg-amber-500/30">Pendente</Badge>;
      case 'overdue':
        return <Badge className="bg-red-500/20 text-red-700 hover:bg-red-500/30">Vencido</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Faturamento</h1>
          <p className="text-muted-foreground">
            Gerencie suas faturas e pagamentos
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={handleRefresh}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <Button className="w-full" variant="outline">
              <PlusCircle className="h-4 w-4 mr-2" />
              Alterar Plano
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Próximo Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="text-xl font-bold">15 de Setembro, 2023</h3>
              <p className="text-sm text-muted-foreground">Assinatura Mensal</p>
            </div>
            <div className="flex items-center mt-2">
              <Clock className="h-5 w-5 text-amber-500 mr-2" />
              <p className="text-sm">10 dias restantes</p>
            </div>
            <p className="text-2xl font-bold text-primary mt-4">
              {formatCurrency(1250.00)}
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Pagar Agora
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <CreditCard className="mr-2 h-5 w-5 text-primary" />
              Método de Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <div className="h-10 w-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md mr-3 flex items-center justify-center text-white font-bold">
                VISA
              </div>
              <div>
                <p className="font-medium">Visa terminando em 4242</p>
                <p className="text-sm text-muted-foreground">Expira em 12/2025</p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Faturamento automático ativado
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              Atualizar Método
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Faturas</CardTitle>
          <CardDescription>
            Visualize e baixe seus comprovantes de pagamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium">Número</th>
                  <th className="py-3 px-4 text-left font-medium">Data</th>
                  <th className="py-3 px-4 text-left font-medium">Vencimento</th>
                  <th className="py-3 px-4 text-left font-medium">Descrição</th>
                  <th className="py-3 px-4 text-left font-medium">Valor</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                  <th className="py-3 px-4 text-right font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{invoice.number}</td>
                    <td className="py-3 px-4">{new Date(invoice.date).toLocaleDateString('pt-BR')}</td>
                    <td className="py-3 px-4">{new Date(invoice.dueDate).toLocaleDateString('pt-BR')}</td>
                    <td className="py-3 px-4">{invoice.description}</td>
                    <td className="py-3 px-4 font-medium">{formatCurrency(invoice.amount)}</td>
                    <td className="py-3 px-4">
                      {getStatusComponent(invoice.status)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                          title="Baixar fatura"
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Baixar</span>
                        </Button>
                        {invoice.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => handlePay(invoice.id)}
                          >
                            Pagar
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingContent;
