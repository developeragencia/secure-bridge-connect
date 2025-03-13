
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Filter, FileText, Printer } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DetailedReportsPanel: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('fiscal');
  const [reportPeriod, setReportPeriod] = useState('last-month');
  const [reportType, setReportType] = useState('complete');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Relatório gerado com sucesso",
        description: "Seu relatório está pronto para download.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Relatórios Detalhados</h2>
          <p className="text-muted-foreground">Gere relatórios personalizados para tributação e auditoria fiscal</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtros Avançados
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="fiscal">Fiscal</TabsTrigger>
          <TabsTrigger value="tributario">Tributário</TabsTrigger>
          <TabsTrigger value="contabil">Contábil</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fiscal" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Parâmetros do Relatório Fiscal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="report-period">Período</Label>
                  <Select value={reportPeriod} onValueChange={setReportPeriod}>
                    <SelectTrigger id="report-period">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-month">Mês Atual</SelectItem>
                      <SelectItem value="last-month">Mês Anterior</SelectItem>
                      <SelectItem value="current-quarter">Trimestre Atual</SelectItem>
                      <SelectItem value="last-quarter">Trimestre Anterior</SelectItem>
                      <SelectItem value="current-year">Ano Atual</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="report-type">Tipo de Relatório</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="complete">Completo</SelectItem>
                      <SelectItem value="summary">Resumido</SelectItem>
                      <SelectItem value="analysis">Análise Comparativa</SelectItem>
                      <SelectItem value="discrepancies">Divergências</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {reportPeriod === 'custom' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="date-start">Data Inicial</Label>
                      <Input type="date" id="date-start" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-end">Data Final</Label>
                      <Input type="date" id="date-end" />
                    </div>
                  </>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="company-filter">Empresa</Label>
                  <Select>
                    <SelectTrigger id="company-filter">
                      <SelectValue placeholder="Todas as empresas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as empresas</SelectItem>
                      <SelectItem value="company-1">Empresa A</SelectItem>
                      <SelectItem value="company-2">Empresa B</SelectItem>
                      <SelectItem value="company-3">Empresa C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tax-filter">Tributos</Label>
                  <Select>
                    <SelectTrigger id="tax-filter">
                      <SelectValue placeholder="Todos os tributos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os tributos</SelectItem>
                      <SelectItem value="irrf">IRRF</SelectItem>
                      <SelectItem value="pis">PIS</SelectItem>
                      <SelectItem value="cofins">COFINS</SelectItem>
                      <SelectItem value="csll">CSLL</SelectItem>
                      <SelectItem value="inss">INSS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Limpar Filtros</Button>
                <Button 
                  onClick={handleGenerateReport} 
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>Gerando...</>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Gerar Relatório
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Relatório Fiscal {item}</p>
                      <p className="text-sm text-muted-foreground">Gerado em {new Date().toLocaleDateString()}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tributario" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Selecione os parâmetros para gerar relatórios tributários.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contabil" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Selecione os parâmetros para gerar relatórios contábeis.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DetailedReportsPanel;
