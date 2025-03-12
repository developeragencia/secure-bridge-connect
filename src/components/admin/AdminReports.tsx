
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  FileText, 
  BarChart4, 
  FileSpreadsheet, 
  Calendar, 
  Filter,
  Printer,
  Share2
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const reports = [
  { id: 1, name: 'Relatório Financeiro - Mensal', date: '01/08/2023', downloads: 128, type: 'Financeiro' },
  { id: 2, name: 'Relatório de Usuários - Trimestral', date: '15/07/2023', downloads: 85, type: 'Usuários' },
  { id: 3, name: 'Relatório de Vendas - Anual', date: '10/06/2023', downloads: 243, type: 'Vendas' },
  { id: 4, name: 'Relatório de Desempenho - Q2 2023', date: '02/05/2023', downloads: 67, type: 'Desempenho' },
  { id: 5, name: 'Relatório Fiscal - Julho 2023', date: '01/08/2023', downloads: 112, type: 'Fiscal' },
];

const AdminReports = () => {
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);
  const [reportName, setReportName] = useState('');
  const [reportType, setReportType] = useState('Financeiro');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { toast } = useToast();

  const handleGenerateReport = () => {
    if (!reportName || !startDate || !endDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Simulate report generation
    setTimeout(() => {
      const newReport = {
        id: reports.length + 1,
        name: reportName,
        date: new Date().toLocaleDateString('pt-BR'),
        downloads: 0,
        type: reportType
      };
      
      reports.unshift(newReport);
      
      setIsGenerateReportOpen(false);
      setReportName('');
      setStartDate('');
      setEndDate('');
      
      toast({
        title: "Relatório gerado",
        description: `O relatório "${reportName}" foi gerado com sucesso.`,
      });
    }, 1500);
  };

  const handleDownloadReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      report.downloads += 1;
      toast({
        title: "Relatório baixado",
        description: `O relatório "${report.name}" foi baixado com sucesso.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <div className="flex items-center gap-2">
          <Dialog open={isGenerateReportOpen} onOpenChange={setIsGenerateReportOpen}>
            <DialogTrigger asChild>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Gerar Relatório
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Gerar Novo Relatório</DialogTitle>
                <DialogDescription>
                  Preencha as informações abaixo para gerar um novo relatório.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="report-name">Nome do Relatório</Label>
                  <Input 
                    id="report-name" 
                    placeholder="Ex: Relatório Financeiro - Agosto 2023" 
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="report-type">Tipo de Relatório</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Financeiro">Financeiro</SelectItem>
                      <SelectItem value="Usuários">Usuários</SelectItem>
                      <SelectItem value="Vendas">Vendas</SelectItem>
                      <SelectItem value="Desempenho">Desempenho</SelectItem>
                      <SelectItem value="Fiscal">Fiscal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
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
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsGenerateReportOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleGenerateReport}>
                  Gerar Relatório
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs value={selectedReportType} onValueChange={setSelectedReportType} className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="sales">Vendas</TabsTrigger>
            <TabsTrigger value="tax">Fiscal</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Relatórios</CardTitle>
              <CardDescription>
                Lista de todos os relatórios disponíveis no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            {report.type === 'Financeiro' && <BarChart4 className="h-4 w-4 text-primary" />}
                            {report.type === 'Usuários' && <FileText className="h-4 w-4 text-primary" />}
                            {report.type === 'Vendas' && <FileSpreadsheet className="h-4 w-4 text-primary" />}
                            {report.type === 'Desempenho' && <FileText className="h-4 w-4 text-primary" />}
                            {report.type === 'Fiscal' && <FileText className="h-4 w-4 text-primary" />}
                          </div>
                          <div>{report.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.downloads}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleDownloadReport(report.id)}>
                            <Download className="h-4 w-4 mr-1" />
                            Baixar
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financial" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Financeiros</CardTitle>
              <CardDescription>
                Lista de relatórios financeiros disponíveis no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-muted-foreground">
                Selecione o período para gerar relatórios financeiros.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {["users", "sales", "tax"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios de {tab === "users" ? "Usuários" : tab === "sales" ? "Vendas" : "Fiscal"}</CardTitle>
                <CardDescription>
                  Lista de relatórios de {tab === "users" ? "usuários" : tab === "sales" ? "vendas" : "fiscais"} disponíveis no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 text-muted-foreground">
                  Selecione o período para gerar relatórios de {tab === "users" ? "usuários" : tab === "sales" ? "vendas" : "fiscais"}.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminReports;
