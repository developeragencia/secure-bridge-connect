
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ActiveClientHeader from '@/components/ActiveClientHeader';
import { Button } from '@/components/ui/button';
import { FileText, ArrowLeft, Download, Printer, FileUp, Clock, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import StatusBadge from '@/components/admin/tax-credits/components/StatusBadge';

// Mock declaration data
const MOCK_DECLARATION = {
  id: '1',
  type: 'IRPJ',
  title: 'Declaração de Imposto de Renda Pessoa Jurídica',
  period: '2023-Q1',
  periodName: '1º Trimestre de 2023',
  dueDate: '2023-04-30',
  submissionDate: '2023-04-25',
  status: 'APPROVED', // Changed to uppercase to match StatusType
  amount: 'R$ 12.450,00',
  protocol: 'RF2023040012345678',
  fiscalYear: '2023',
  taxOffice: 'RFB - São Paulo',
  company: 'Empresa XYZ Ltda.',
  cnpj: '12.345.678/0001-90',
  submittedBy: 'João Silva',
  attachments: [
    { id: '1', name: 'declaracao_IRPJ_2023_Q1.pdf', size: '1.2 MB', date: '2023-04-25' },
    { id: '2', name: 'anexo_A_IRPJ_2023.xlsx', size: '890 KB', date: '2023-04-25' },
    { id: '3', name: 'comprovante_pagamento.pdf', size: '500 KB', date: '2023-04-25' }
  ],
  history: [
    { id: '1', date: '2023-04-25 14:30', action: 'Declaração enviada', user: 'João Silva', status: 'SUBMITTED' },
    { id: '2', date: '2023-04-26 09:15', action: 'Recibo gerado', user: 'Sistema RFB', status: 'PROCESSING' },
    { id: '3', date: '2023-04-28 11:45', action: 'Análise concluída', user: 'Sistema RFB', status: 'ANALYZING' },
    { id: '4', date: '2023-04-30 10:20', action: 'Declaração aprovada', user: 'Sistema RFB', status: 'APPROVED' }
  ]
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

const DeclarationDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // In a real application, you would fetch the declaration data based on the ID
  const declaration = MOCK_DECLARATION;
  
  if (!declaration) {
    return (
      <div className="min-h-screen bg-background">
        <ActiveClientHeader />
        <div className="container mx-auto p-4 sm:p-6 flex items-center justify-center">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Declaração não encontrada</h2>
                <p className="text-muted-foreground mb-4">A declaração que você está procurando não existe ou foi removida.</p>
                <Button onClick={() => navigate('/declarations')}>
                  Voltar para Declarações
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
            <h1 className="text-2xl font-bold tracking-tight">{declaration.title}</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Detalhes da Declaração</CardTitle>
                    <CardDescription>{declaration.type} - {declaration.periodName}</CardDescription>
                  </div>
                  <StatusBadge status={declaration.status} className="ml-2" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Período</p>
                    <p>{declaration.periodName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Ano Fiscal</p>
                    <p>{declaration.fiscalYear}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Vencimento</p>
                    <p>{formatDate(declaration.dueDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Data de Envio</p>
                    <p>{declaration.submissionDate ? formatDate(declaration.submissionDate) : '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Protocolo</p>
                    <p>{declaration.protocol}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Valor</p>
                    <p className="font-semibold">{declaration.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Unidade da RFB</p>
                    <p>{declaration.taxOffice}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Enviado por</p>
                    <p>{declaration.submittedBy}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimir
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Anexos</CardTitle>
                <CardDescription>Documentos relacionados a esta declaração</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {declaration.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{attachment.name}</p>
                          <p className="text-sm text-muted-foreground">{attachment.size} • {formatDate(attachment.date)}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button>
                  <FileUp className="h-4 w-4 mr-2" />
                  Adicionar Anexo
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Razão Social</p>
                    <p>{declaration.company}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">CNPJ</p>
                    <p>{declaration.cnpj}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Histórico</CardTitle>
                <CardDescription>Registro de atividades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 space-y-6">
                  <div className="absolute top-0 bottom-0 left-2 border-l-2 border-dashed border-muted"></div>
                  
                  {declaration.history.map((event, index) => (
                    <div key={event.id} className="relative">
                      <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-background border-2 border-primary"></div>
                      <div>
                        <p className="font-medium">{event.action}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{event.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclarationDetail;
