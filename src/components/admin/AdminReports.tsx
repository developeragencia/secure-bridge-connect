import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, BarChart4, FileSpreadsheet, Calendar, Filter } from 'lucide-react';

const reports = [
  { id: 1, name: 'Relatório Financeiro - Mensal', date: '01/08/2023', downloads: 128, type: 'Financeiro' },
  { id: 2, name: 'Relatório de Usuários - Trimestral', date: '15/07/2023', downloads: 85, type: 'Usuários' },
  { id: 3, name: 'Relatório de Vendas - Anual', date: '10/06/2023', downloads: 243, type: 'Vendas' },
  { id: 4, name: 'Relatório de Desempenho - Q2 2023', date: '02/05/2023', downloads: 67, type: 'Desempenho' },
  { id: 5, name: 'Relatório Fiscal - Julho 2023', date: '01/08/2023', downloads: 112, type: 'Fiscal' },
];

const AdminReports = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <div className="flex items-center gap-2">
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Gerar Relatório
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
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
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Baixar
                        </Button>
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
