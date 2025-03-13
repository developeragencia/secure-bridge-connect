
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  FileUp, Cloud, Database, FileSpreadsheet, Clock, CheckCircle, 
  AlertCircle, RefreshCw, FileCog, FileX 
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const DataImports: React.FC = () => {
  const [importStatus, setImportStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importHistory] = useState([
    {
      id: 'imp-1',
      fileName: 'pagamentos-jan2023.csv',
      date: '15/01/2023',
      recordsCount: 1234,
      status: 'success',
      importType: 'Pagamentos'
    },
    {
      id: 'imp-2',
      fileName: 'fornecedores.xlsx',
      date: '10/01/2023',
      recordsCount: 543,
      status: 'success',
      importType: 'Fornecedores'
    },
    {
      id: 'imp-3',
      fileName: 'retencoes-2022.csv',
      date: '05/01/2023',
      recordsCount: 987,
      status: 'error',
      importType: 'Retenções'
    }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Selecione um arquivo para importar');
      return;
    }

    toast.info('Iniciando importação', {
      description: `Processando o arquivo ${selectedFile.name}`
    });

    setImportStatus('uploading');
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setImportStatus('processing');
          
          // Simulate processing time
          setTimeout(() => {
            setImportStatus('success');
            toast.success('Importação concluída com sucesso', {
              description: `${selectedFile.name} foi processado com sucesso`
            });
          }, 2000);
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-300">Concluído</Badge>;
      case 'error':
        return <Badge className="bg-red-500/20 text-red-700 dark:text-red-300">Erro</Badge>;
      case 'processing':
        return <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300">Processando</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Importação de Dados</h1>
          <p className="text-muted-foreground">
            Importe e processe dados fiscais de diversas fontes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileCog className="h-4 w-4" />
            Configurações
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="upload">Nova Importação</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Importar Arquivo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="import-type">Tipo de Importação</Label>
                    <select 
                      id="import-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="payments">Pagamentos</option>
                      <option value="suppliers">Fornecedores</option>
                      <option value="retention">Retenções</option>
                      <option value="contracts">Contratos</option>
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
                
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Arquivo</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                      accept=".csv,.xlsx,.xls,.xml,.json"
                    />
                    <Button 
                      onClick={handleUpload} 
                      disabled={!selectedFile || importStatus === 'uploading' || importStatus === 'processing'}
                      className="whitespace-nowrap"
                    >
                      <FileUp className="h-4 w-4 mr-2" />
                      Importar
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Formatos aceitos: CSV, Excel, XML, JSON
                  </p>
                </div>
                
                {importStatus !== 'idle' && (
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-center">
                      <Label>
                        {importStatus === 'uploading' && 'Enviando arquivo...'}
                        {importStatus === 'processing' && 'Processando dados...'}
                        {importStatus === 'success' && 'Importação concluída!'}
                        {importStatus === 'error' && 'Erro na importação'}
                      </Label>
                      <span className="text-sm">{progress}%</span>
                    </div>
                    <Progress value={progress} />
                    
                    {importStatus === 'success' && (
                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-md mt-4 text-sm">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <p>Arquivo <strong>{selectedFile?.name}</strong> importado com sucesso.</p>
                        </div>
                        <p className="ml-7 mt-1 text-muted-foreground">
                          Os dados estão sendo processados e serão disponibilizados em breve.
                        </p>
                      </div>
                    )}
                    
                    {importStatus === 'error' && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md mt-4 text-sm">
                        <div className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                          <p>Erro ao processar o arquivo <strong>{selectedFile?.name}</strong>.</p>
                        </div>
                        <p className="ml-7 mt-1 text-muted-foreground">
                          Verifique o formato do arquivo e tente novamente.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="border rounded-md p-4 flex flex-col items-center text-center">
                  <Cloud className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Importação Simples</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Carregue seus arquivos no formato padrão
                  </p>
                </div>
                
                <div className="border rounded-md p-4 flex flex-col items-center text-center">
                  <Database className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Processamento Automático</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Análise e classificação inteligente de dados
                  </p>
                </div>
                
                <div className="border rounded-md p-4 flex flex-col items-center text-center">
                  <FileSpreadsheet className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Identificação de Créditos</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Detecção automática de créditos tributários
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Histórico de Importações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted border-b">
                      <th className="px-4 py-3 text-left font-medium">Arquivo</th>
                      <th className="px-4 py-3 text-left font-medium">Tipo</th>
                      <th className="px-4 py-3 text-left font-medium">Data</th>
                      <th className="px-4 py-3 text-left font-medium">Registros</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {importHistory.map(item => (
                      <tr key={item.id} className="border-b">
                        <td className="px-4 py-3">{item.fileName}</td>
                        <td className="px-4 py-3">{item.importType}</td>
                        <td className="px-4 py-3">{item.date}</td>
                        <td className="px-4 py-3">{item.recordsCount}</td>
                        <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Clock className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FileX className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Templates de Importação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Baixe os modelos de planilhas para importação de dados
              </p>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="border rounded-md p-4 flex flex-col justify-between">
                  <div>
                    <FileSpreadsheet className="h-8 w-8 mb-2 text-green-600" />
                    <h3 className="font-medium">Template de Pagamentos</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Modelo para importação de pagamentos a fornecedores
                    </p>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    Baixar Template
                  </Button>
                </div>
                
                <div className="border rounded-md p-4 flex flex-col justify-between">
                  <div>
                    <FileSpreadsheet className="h-8 w-8 mb-2 text-blue-600" />
                    <h3 className="font-medium">Template de Fornecedores</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Modelo para importação de cadastro de fornecedores
                    </p>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    Baixar Template
                  </Button>
                </div>
                
                <div className="border rounded-md p-4 flex flex-col justify-between">
                  <div>
                    <FileSpreadsheet className="h-8 w-8 mb-2 text-amber-600" />
                    <h3 className="font-medium">Template de Retenções</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Modelo para importação de retenções fiscais
                    </p>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    Baixar Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataImports;
