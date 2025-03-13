
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ActiveClientHeader from '@/components/ActiveClientHeader';
import { Button } from '@/components/ui/button';
import { 
  FileText, ArrowLeft, Download, Printer, 
  Edit, Clock, CheckCircle2, AlertTriangle, 
  RefreshCcw, Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import StatusBadge from '@/components/admin/tax-credits/components/StatusBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { TaxCredit } from '@/types/tax-credits';
import StatusChangeDialog from '@/components/admin/tax-credits/components/StatusChangeDialog';
import DeleteConfirmDialog from '@/components/admin/tax-credits/components/DeleteConfirmDialog';
import TaxCreditForm from '@/components/admin/tax-credits/forms/TaxCreditForm';

// Mock credit data
const MOCK_CREDIT: TaxCredit = {
  id: '1',
  clientId: '1',
  clientName: 'Empresa ABC Ltda',
  documentNumber: '12.345.678/0001-99',
  creditType: 'PIS/COFINS',
  creditAmount: 145678.90,
  originalAmount: 145678.90,
  periodStart: '2023-01-01',
  periodEnd: '2023-03-31',
  status: 'APPROVED',
  createdAt: '2023-04-15',
  updatedAt: '2023-04-20',
  notes: 'Este crédito foi identificado após análise detalhada dos documentos fiscais. A documentação foi validada pela equipe de auditoria e confirmada com base nas notas fiscais do período.'
};

// Mock history data
const MOCK_HISTORY = [
  { id: '1', date: '2023-04-10T10:30:00', action: 'Crédito identificado', user: 'João Silva', status: 'PENDING' },
  { id: '2', date: '2023-04-12T14:15:00', action: 'Documentação analisada', user: 'Maria Oliveira', status: 'ANALYZING' },
  { id: '3', date: '2023-04-15T09:45:00', action: 'Cálculos validados', user: 'Carlos Santos', status: 'ANALYZING' },
  { id: '4', date: '2023-04-20T16:20:00', action: 'Crédito aprovado', user: 'Sistema', status: 'APPROVED' },
];

// Mock documents
const MOCK_DOCUMENTS = [
  { id: '1', name: 'laudo_tecnico.pdf', size: '1.2 MB', date: '2023-04-10T10:30:00' },
  { id: '2', name: 'notas_fiscais_Q1_2023.xlsx', size: '890 KB', date: '2023-04-10T10:30:00' },
  { id: '3', name: 'relatorio_auditoria.pdf', size: '500 KB', date: '2023-04-15T09:45:00' },
];

const CreditDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [credit, setCredit] = useState<TaxCredit | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  useEffect(() => {
    const fetchCreditDetails = async () => {
      setIsLoading(true);
      try {
        // Simulação de requisição à API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Usar dados mock para o exemplo
        setCredit(MOCK_CREDIT);
        setDocuments(MOCK_DOCUMENTS);
        setHistory(MOCK_HISTORY);
      } catch (error) {
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os detalhes do crédito.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCreditDetails();
  }, [id, toast]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
  
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };
  
  const handleStatusChange = (creditId: string, newStatus: string, notes: string) => {
    toast({
      title: "Status atualizado",
      description: `O status do crédito foi alterado para ${newStatus}.`,
    });
    // Atualizar o estado local para simular a mudança
    if (credit) {
      setCredit({
        ...credit,
        status: newStatus as any,
        updatedAt: new Date().toISOString()
      });
      
      // Adicionar ao histórico
      const newEvent = {
        id: `history-${Date.now()}`,
        date: new Date().toISOString(),
        action: `Status alterado para ${newStatus}`,
        user: 'Usuário atual',
        status: newStatus,
      };
      
      setHistory([newEvent, ...history]);
    }
  };
  
  const handleDeleteCredit = (creditId: string) => {
    toast({
      title: "Crédito excluído",
      description: "O crédito tributário foi excluído com sucesso.",
      variant: "destructive",
    });
    navigate('/admin');
  };
  
  const handleEditCredit = (formData: any) => {
    toast({
      title: "Crédito atualizado",
      description: "As informações do crédito foram atualizadas com sucesso.",
    });
    
    // Atualizar o estado local para simular a edição
    if (credit) {
      setCredit({
        ...credit,
        clientName: formData.clientName,
        documentNumber: formData.documentNumber,
        creditType: formData.creditType,
        creditAmount: parseFloat(formData.creditAmount),
        periodStart: formData.periodStart.toISOString(),
        periodEnd: formData.periodEnd.toISOString(),
        status: formData.status,
        notes: formData.notes,
        updatedAt: new Date().toISOString()
      });
    }
  };
  
  const handleExportReport = () => {
    toast({
      title: "Relatório gerado",
      description: "O relatório do crédito foi gerado e está pronto para download.",
    });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ActiveClientHeader />
        <div className="container mx-auto p-4 sm:p-6 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full mb-4"></div>
            <p className="text-muted-foreground">Carregando detalhes do crédito...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!credit) {
    return (
      <div className="min-h-screen bg-background">
        <ActiveClientHeader />
        <div className="container mx-auto p-4 sm:p-6 flex items-center justify-center">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Crédito não encontrado</h2>
                <p className="text-muted-foreground mb-4">O crédito que você está procurando não existe ou foi removido.</p>
                <Button onClick={() => navigate('/admin')}>
                  Voltar para Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
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
            <h1 className="text-2xl font-bold tracking-tight">Detalhes do Crédito</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{credit.creditType} - {formatCurrency(credit.creditAmount)}</CardTitle>
                    <CardDescription>{credit.clientName}</CardDescription>
                  </div>
                  <StatusBadge status={credit.status} className="ml-2" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Cliente</p>
                    <p>{credit.clientName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Documento</p>
                    <p>{credit.documentNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Tipo de Crédito</p>
                    <p>{credit.creditType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Valor</p>
                    <p className="font-semibold">{formatCurrency(credit.creditAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Período</p>
                    <p>{formatDate(credit.periodStart)} a {formatDate(credit.periodEnd)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                    <StatusBadge status={credit.status} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Data de Criação</p>
                    <p>{formatDate(credit.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Última Atualização</p>
                    <p>{formatDate(credit.updatedAt)}</p>
                  </div>
                </div>
                
                {credit.notes && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Observações</p>
                      <p className="text-sm">{credit.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex flex-wrap justify-between border-t pt-6 gap-2">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button variant="outline" onClick={() => setIsStatusDialogOpen(true)}>
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Alterar Status
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={handleExportReport}>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Relatório
                  </Button>
                  <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <Tabs defaultValue="documents" className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="documents">Documentos</TabsTrigger>
                <TabsTrigger value="history">Histórico</TabsTrigger>
              </TabsList>
              
              <TabsContent value="documents" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Documentos</CardTitle>
                    <CardDescription>Documentos relacionados a este crédito tributário</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {documents.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">Nenhum documento disponível</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {documents.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-sm text-muted-foreground">{doc.size} • {formatDate(doc.date)}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t pt-6">
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      Adicionar Documento
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Histórico</CardTitle>
                    <CardDescription>Atividades relacionadas a este crédito tributário</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {history.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">Nenhum registro de atividade disponível</p>
                      </div>
                    ) : (
                      <div className="relative pl-6 space-y-6">
                        <div className="absolute top-0 bottom-0 left-2 border-l-2 border-dashed border-muted"></div>
                        
                        {history.map((event, index) => (
                          <div key={event.id} className="relative">
                            <div className={`absolute -left-6 top-0 w-4 h-4 rounded-full bg-background 
                              ${event.status === 'APPROVED' ? 'border-2 border-green-500' : 
                                event.status === 'REJECTED' ? 'border-2 border-destructive' : 
                                'border-2 border-primary'}`}>
                            </div>
                            <div>
                              <p className="font-medium">{event.action}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{formatDateTime(event.date)}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{event.user}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Razão Social</p>
                    <p>{credit.clientName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">CNPJ</p>
                    <p>{credit.documentNumber}</p>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" className="w-full" onClick={() => navigate(`/admin/client-${credit.clientId}`)}>
                      Ver perfil do cliente
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resumo Financeiro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Valor Original</p>
                    <p className="text-lg font-semibold">{formatCurrency(credit.originalAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Valor Atual</p>
                    <p className="text-lg font-semibold">{formatCurrency(credit.creditAmount)}</p>
                  </div>
                  <Separator className="my-2" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                    <div className="flex items-center mt-1">
                      {credit.status === 'APPROVED' ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          <span>Aprovado</span>
                        </div>
                      ) : credit.status === 'REJECTED' ? (
                        <div className="flex items-center text-red-600">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          <span>Rejeitado</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-blue-600">
                          <RefreshCcw className="h-4 w-4 mr-2" />
                          <span>Em Processamento</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Dialogs */}
      <StatusChangeDialog
        open={isStatusDialogOpen}
        onClose={() => setIsStatusDialogOpen(false)}
        credit={credit}
        onStatusChange={handleStatusChange}
      />
      
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        credit={credit}
        onConfirm={handleDeleteCredit}
      />
      
      <TaxCreditForm
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleEditCredit}
        initialData={credit}
        isEdit={true}
      />
    </div>
  );
};

export default CreditDetails;
