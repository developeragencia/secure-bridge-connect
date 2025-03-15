import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Calculator,
  Download,
  FileSpreadsheet,
  FileText,
  BarChart,
  Calendar as CalendarIcon,
  Scale,
  CheckSquare,
  RefreshCw,
  FileBarChart,
  Filter,
  File
} from 'lucide-react';
import TabsContainer from './components/TabsContainer';
import ReportsHeader from './components/ReportsHeader';

const TaxCompensationReportsPanel: React.FC = () => {
  const [creditValue, setCreditValue] = useState<string>('0');
  const [simulationDate, setSimulationDate] = useState<Date | undefined>(new Date());
  const [includeSelicCorrection, setIncludeSelicCorrection] = useState<boolean>(true);
  const [reportType, setReportType] = useState<string>('per_dcomp');
  const [activeTab, setActiveTab] = useState<string>('simulation');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleGenerate = () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    toast("Gerando relatório", {
      description: "O relatório está sendo gerado. Aguarde um momento...",
    });
    
    setTimeout(() => {
      setIsGenerating(false);
      toast("Relatório gerado", {
        description: "O relatório foi gerado com sucesso e está disponível para download.",
      });
    }, 2000);
  };

  const handleExport = (format: string) => {
    toast("Exportando relatório", {
      description: `Exportando relatório no formato ${format.toUpperCase()}.`,
    });
  };

  const handleSimulateSelic = () => {
    const value = parseFloat(creditValue.replace(/\./g, '').replace(',', '.'));
    
    if (isNaN(value) || value <= 0) {
      toast("Valor inválido", {
        description: "Por favor, insira um valor válido para simulação.",
      });
      return;
    }
    
    toast("Simulação realizada", {
      description: `Valor corrigido pela SELIC: R$ ${(value * 1.0825).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} (taxa de 8,25% aplicada)`,
    });
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const number = parseInt(numericValue, 10) / 100;
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditValue(formatCurrency(e.target.value));
  };

  const simulationContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Simulação de Compensação Tributária</CardTitle>
          <CardDescription>
            Simule valores de compensação com correção monetária pela taxa SELIC
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="credit-value">Valor do Crédito (R$)</Label>
              <Input
                id="credit-value"
                placeholder="0,00"
                value={creditValue}
                onChange={handleValueChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date-select">Data de Referência</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    id="date-select"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {simulationDate ? format(simulationDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={simulationDate}
                    onSelect={(date) => {
                      setSimulationDate(date);
                      setIsCalendarOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="selic-correction"
              checked={includeSelicCorrection}
              onCheckedChange={setIncludeSelicCorrection}
            />
            <Label htmlFor="selic-correction">Incluir correção pela SELIC</Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="report-type">Tipo de Relatório</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger id="report-type">
                <SelectValue placeholder="Selecione o tipo de relatório" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="per_dcomp">PER/DCOMP</SelectItem>
                <SelectItem value="judicial">Decisão Judicial</SelectItem>
                <SelectItem value="administrative">Processo Administrativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-4">
            <Button onClick={handleSimulateSelic}>
              <Calculator className="mr-2 h-4 w-4" />
              Simular Correção SELIC
            </Button>
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <FileBarChart className="mr-2 h-4 w-4" />
                  Gerar Relatório
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Últimas Simulações</CardTitle>
          <CardDescription>
            Histórico das simulações realizadas recentemente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-3 text-left font-medium">Data</th>
                  <th className="p-3 text-left font-medium">Valor Original</th>
                  <th className="p-3 text-left font-medium">Valor Corrigido</th>
                  <th className="p-3 text-left font-medium">Taxa SELIC</th>
                  <th className="p-3 text-left font-medium">Tipo</th>
                  <th className="p-3 text-left font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t hover:bg-muted/50">
                  <td className="p-3">15/03/2023</td>
                  <td className="p-3">R$ 50.000,00</td>
                  <td className="p-3">R$ 54.125,00</td>
                  <td className="p-3">8,25%</td>
                  <td className="p-3">PER/DCOMP</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <FilePdf className="h-4 w-4" />
                        <span className="sr-only">PDF</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileSpreadsheet className="h-4 w-4" />
                        <span className="sr-only">Excel</span>
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-t hover:bg-muted/50">
                  <td className="p-3">10/02/2023</td>
                  <td className="p-3">R$ 75.000,00</td>
                  <td className="p-3">R$ 80.887,50</td>
                  <td className="p-3">7,85%</td>
                  <td className="p-3">Decisão Judicial</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <FilePdf className="h-4 w-4" />
                        <span className="sr-only">PDF</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileSpreadsheet className="h-4 w-4" />
                        <span className="sr-only">Excel</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const perDcompContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios PER/DCOMP</CardTitle>
          <CardDescription>
            Relatórios específicos para PER/DCOMP conforme requisitos da Receita Federal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-3 text-left font-medium">Nome do Relatório</th>
                    <th className="p-3 text-left font-medium">Criado em</th>
                    <th className="p-3 text-left font-medium">Tipo</th>
                    <th className="p-3 text-left font-medium">Exportar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t hover:bg-muted/50">
                    <td className="p-3">Relatório PER/DCOMP - 1º Trimestre 2023</td>
                    <td className="p-3">15/03/2023</td>
                    <td className="p-3">PER/DCOMP</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                          <File className="mr-2 h-4 w-4" />
                          PDF
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
                          <FileSpreadsheet className="mr-2 h-4 w-4" />
                          Excel
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-t hover:bg-muted/50">
                    <td className="p-3">Relatório PER/DCOMP - 4º Trimestre 2022</td>
                    <td className="p-3">10/01/2023</td>
                    <td className="p-3">PER/DCOMP</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                          <File className="mr-2 h-4 w-4" />
                          PDF
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
                          <FileSpreadsheet className="mr-2 h-4 w-4" />
                          Excel
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Gerar Novo Relatório PER/DCOMP
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const judicialContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios para Decisões Judiciais</CardTitle>
          <CardDescription>
            Relatórios específicos para processos judiciais relacionados à compensação tributária
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-3 text-left font-medium">Nome do Relatório</th>
                    <th className="p-3 text-left font-medium">Processo</th>
                    <th className="p-3 text-left font-medium">Criado em</th>
                    <th className="p-3 text-left font-medium">Exportar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t hover:bg-muted/50">
                    <td className="p-3">Relatório Judicial - Compensação CSLL</td>
                    <td className="p-3">1234567-89.2023.8.26.0100</td>
                    <td className="p-3">25/04/2023</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                          <File className="mr-2 h-4 w-4" />
                          PDF
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
                          <FileSpreadsheet className="mr-2 h-4 w-4" />
                          Excel
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-t hover:bg-muted/50">
                    <td className="p-3">Relatório Judicial - Compensação PIS/COFINS</td>
                    <td className="p-3">9876543-21.2022.8.26.0100</td>
                    <td className="p-3">18/02/2023</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                          <File className="mr-2 h-4 w-4" />
                          PDF
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
                          <FileSpreadsheet className="mr-2 h-4 w-4" />
                          Excel
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Scale className="mr-2 h-4 w-4" />
                  Gerar Novo Relatório Judicial
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const handleRefresh = () => {
    toast("Atualizando dados", {
      description: "Os dados estão sendo atualizados"
    });
  };

  const handleFilter = () => {
    toast("Filtros", {
      description: "Abrindo painel de filtros"
    });
  };

  return (
    <div className="space-y-6">
      <ReportsHeader
        onExport={handleExport}
        onFilter={handleFilter}
        onGenerateReport={handleGenerate}
        onRefresh={handleRefresh}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="simulation">Simulação</TabsTrigger>
          <TabsTrigger value="per_dcomp">PER/DCOMP</TabsTrigger>
          <TabsTrigger value="judicial">Decisões Judiciais</TabsTrigger>
        </TabsList>
        
        <TabsContent value="simulation" className="space-y-4 pt-4">
          {simulationContent}
        </TabsContent>
        
        <TabsContent value="per_dcomp" className="space-y-4 pt-4">
          {perDcompContent}
        </TabsContent>
        
        <TabsContent value="judicial" className="space-y-4 pt-4">
          {judicialContent}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxCompensationReportsPanel;
