
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  BarChart3, FileText, FileDown, Printer, Calendar, FilterX, BarChart2, Share2, 
  Mail, FileSpreadsheet, FilePdf 
} from 'lucide-react';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FiscalReports: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const mockData = [
    { month: 'Jan', recoveredAmount: 12000, pendingAmount: 5000 },
    { month: 'Fev', recoveredAmount: 15000, pendingAmount: 8000 },
    { month: 'Mar', recoveredAmount: 18000, pendingAmount: 7000 },
    { month: 'Abr', recoveredAmount: 22000, pendingAmount: 9000 },
    { month: 'Mai', recoveredAmount: 25000, pendingAmount: 11000 },
    { month: 'Jun', recoveredAmount: 32000, pendingAmount: 13000 },
  ];

  const handleGenerateReport = () => {
    toast.success('Relatório gerado com sucesso', {
      description: 'O download do relatório começará em breve'
    });
  };

  const handlePrintReport = () => {
    toast.info('Enviando para impressão', {
      description: 'Preparando documento para impressão'
    });
  };

  const handleEmailReport = () => {
    toast.success('Relatório enviado por e-mail', {
      description: 'O destinatário receberá em breve'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Relatórios Fiscais</h1>
          <p className="text-muted-foreground">
            Geração de relatórios e dossiês tributários
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Modelos
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Agendar
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="generator">Gerador de Relatórios</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard Fiscal</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Gerar Relatório</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="report-type">Tipo de Relatório</Label>
                    <select 
                      id="report-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="summary">Resumo de Créditos</option>
                      <option value="compensation">Compensação Tributária</option>
                      <option value="retention">Retenções IRRF</option>
                      <option value="audit">Auditoria Fiscal</option>
                      <option value="dossier">Dossiê Tributário</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente</Label>
                    <select 
                      id="client"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Selecione um cliente</option>
                      <option value="1">Prefeitura Municipal de São Paulo</option>
                      <option value="2">Secretaria Estadual de Educação</option>
                      <option value="3">Hospital Municipal Dr. João Silva</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Data Inicial</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="end-date">Data Final</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="format">Formato de Saída</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <FilePdf className="h-4 w-4" /> PDF
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" /> Excel
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" /> CSV
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 flex flex-wrap gap-2">
                  <Button onClick={handleGenerateReport} className="flex items-center gap-2">
                    <FileDown className="h-4 w-4" />
                    Gerar e Baixar
                  </Button>
                  <Button variant="outline" onClick={handlePrintReport} className="flex items-center gap-2">
                    <Printer className="h-4 w-4" />
                    Imprimir
                  </Button>
                  <Button variant="outline" onClick={handleEmailReport} className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Enviar por E-mail
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Dashboard Fiscal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="font-medium">Evolução de Créditos Recuperados</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <FilterX className="h-3.5 w-3.5 mr-1" /> Filtros
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <BarChart2 className="h-3.5 w-3.5 mr-1" /> Métricas
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <Share2 className="h-3.5 w-3.5 mr-1" /> Compartilhar
                    </Button>
                  </div>
                </div>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={mockData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="recoveredAmount" name="Créditos Recuperados" fill="#22c55e" />
                      <Bar dataKey="pendingAmount" name="Créditos Pendentes" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Recuperado</h4>
                    <p className="text-2xl font-bold">R$ 124.000,00</p>
                    <p className="text-xs text-green-600 mt-1">↑ 15% em relação ao período anterior</p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Média Mensal</h4>
                    <p className="text-2xl font-bold">R$ 20.666,67</p>
                    <p className="text-xs text-green-600 mt-1">↑ 8% em relação ao período anterior</p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Projeção Anual</h4>
                    <p className="text-2xl font-bold">R$ 248.000,00</p>
                    <p className="text-xs text-amber-600 mt-1">→ Baseado no desempenho atual</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Histórico de Relatórios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted border-b">
                      <th className="px-4 py-3 text-left font-medium">Relatório</th>
                      <th className="px-4 py-3 text-left font-medium">Cliente</th>
                      <th className="px-4 py-3 text-left font-medium">Data</th>
                      <th className="px-4 py-3 text-left font-medium">Formato</th>
                      <th className="px-4 py-3 text-left font-medium">Gerado por</th>
                      <th className="px-4 py-3 text-left font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3">Resumo de Créditos</td>
                      <td className="px-4 py-3">Prefeitura Municipal</td>
                      <td className="px-4 py-3">15/06/2023</td>
                      <td className="px-4 py-3">PDF</td>
                      <td className="px-4 py-3">Carlos Silva</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FileDown className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Auditoria Fiscal</td>
                      <td className="px-4 py-3">Secretaria Estadual</td>
                      <td className="px-4 py-3">10/06/2023</td>
                      <td className="px-4 py-3">Excel</td>
                      <td className="px-4 py-3">Maria Oliveira</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FileDown className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Compensação Tributária</td>
                      <td className="px-4 py-3">Hospital Municipal</td>
                      <td className="px-4 py-3">05/06/2023</td>
                      <td className="px-4 py-3">PDF</td>
                      <td className="px-4 py-3">João Pereira</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FileDown className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FiscalReports;
