
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, FileText, ArrowRight, Play, BarChart4, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface OpportunityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: any | null;
}

const OpportunityDetailsModal: React.FC<OpportunityDetailsModalProps> = ({ 
  isOpen, 
  onClose,
  opportunity 
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (!opportunity) return null;
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'disponível':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'em análise':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'aprovado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStartRecovery = () => {
    toast({
      title: "Processo iniciado",
      description: `Processo de recuperação para ${opportunity.title} iniciado com sucesso.`,
    });
    onClose();
    navigate('/admin/tax_credits');
  };

  const handleDownloadReport = () => {
    toast({
      title: "Relatório baixado",
      description: `O relatório de ${opportunity.title} foi baixado com sucesso.`,
    });
  };

  const handleViewSimulation = () => {
    toast({
      title: "Simulação",
      description: `Visualizando simulação para ${opportunity.title}.`,
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-start">
              <DialogTitle className="text-xl">{opportunity.title}</DialogTitle>
              <Badge variant="outline" className={getStatusColor(opportunity.status)}>
                {opportunity.status}
              </Badge>
            </div>
            <DialogDescription>
              Cliente: {opportunity.client} • Identificado em: {opportunity.date}
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="simulation">Simulação</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Resumo da Oportunidade</CardTitle>
                <CardDescription>
                  Informações principais sobre o crédito identificado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-0.5">Valor potencial</p>
                    <p className="text-lg font-bold">{opportunity.value}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-0.5">Confiança</p>
                    <div className="flex items-center space-x-1">
                      <span className={`text-lg font-semibold ${
                        opportunity.confidence >= 90 
                          ? 'text-green-600' 
                          : opportunity.confidence >= 80 
                            ? 'text-amber-600' 
                            : 'text-gray-600'
                      }`}>{opportunity.confidence}%</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-0.5">Cliente</p>
                    <p className="font-medium">{opportunity.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-0.5">Identificado em</p>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{opportunity.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <p className="text-sm text-muted-foreground mb-1.5">Descrição da oportunidade</p>
                  <p>
                    Esta oportunidade de crédito foi identificada através de análise automatizada
                    dos documentos fiscais do cliente. O sistema detectou uma possível
                    inconsistência que pode resultar em crédito tributário significativo.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 pt-2 justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={handleDownloadReport}
                >
                  <Download className="h-4 w-4" />
                  Baixar relatório
                </Button>
                <Button 
                  size="sm" 
                  className="gap-1"
                  onClick={handleStartRecovery}
                >
                  <Play className="h-4 w-4" />
                  Iniciar recuperação
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Próximos passos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full p-1 mt-0.5">
                      <FileText className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="font-medium">Analisar documentação fiscal</p>
                      <p className="text-sm text-muted-foreground">Revisar as notas fiscais e declarações relacionadas</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-amber-100 text-amber-800 rounded-full p-1 mt-0.5">
                      <BarChart4 className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="font-medium">Validar cálculos</p>
                      <p className="text-sm text-muted-foreground">Confirmar os valores e períodos calculados pelo sistema</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-green-100 text-green-800 rounded-full p-1 mt-0.5">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="font-medium">Iniciar processo de recuperação</p>
                      <p className="text-sm text-muted-foreground">Começar os procedimentos para recuperação do crédito</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Detalhes do Crédito</CardTitle>
                <CardDescription>
                  Informações detalhadas sobre a origem e natureza do crédito
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tipo de crédito</p>
                      <p className="font-medium">{opportunity.title.split(' sobre ')[0]}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Base legal</p>
                      <p className="font-medium">Art. 195, I, "b" da CF/88</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Período aplicável</p>
                      <p className="font-medium">Últimos 5 anos</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Prazo de prescrição</p>
                      <p className="font-medium">Dez/2025</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    <p className="text-sm text-muted-foreground mb-1">Documentos necessários</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Notas fiscais de entrada e saída</li>
                      <li>DCTFs dos últimos 5 anos</li>
                      <li>ECF/ECD do período</li>
                      <li>Comprovantes de recolhimento</li>
                    </ul>
                  </div>
                  
                  <div className="border-t pt-3">
                    <p className="text-sm text-muted-foreground mb-1">Observações</p>
                    <p>
                      Este crédito é baseado na identificação de valores recolhidos indevidamente
                      na forma de PIS/COFINS sobre insumos. A jurisprudência recente favorece 
                      a tese de recuperação destes valores.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="simulation">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Simulação de Recuperação</CardTitle>
                <CardDescription>
                  Projeção estimada de valores e prazos para recuperação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Valor principal</p>
                      <p className="text-lg font-bold">{opportunity.value}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Juros e correção estimados</p>
                      <p className="text-lg font-bold">R$ 87.453,22</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total potencial</p>
                      <p className="text-lg font-bold text-green-600">R$ 433.132,12</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tempo estimado de recuperação</p>
                      <p className="font-medium">6-8 meses</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted rounded-md p-3 border">
                    <p className="font-medium mb-2">Condições para recuperação:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Processo administrativo com compensação via PER/DCOMP</li>
                      <li>Possibilidade de habilitação em 3-4 meses</li>
                      <li>Recuperação ocorre via compensação com tributos futuros</li>
                      <li>Taxa de êxito estimada: 92%</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 pt-2 justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={handleViewSimulation}
                >
                  <BarChart4 className="h-4 w-4" />
                  Ver simulação detalhada
                </Button>
                <Button 
                  size="sm" 
                  className="gap-1"
                  onClick={handleStartRecovery}
                >
                  <Play className="h-4 w-4" />
                  Iniciar recuperação
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4 flex items-center justify-between sm:justify-between flex-row">
          <Button variant="outline" onClick={onClose}>Fechar</Button>
          <Button onClick={handleStartRecovery}>
            <Play className="mr-2 h-4 w-4" /> 
            Iniciar Recuperação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OpportunityDetailsModal;
