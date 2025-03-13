
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  Database, UploadCloud, Filter, ArrowDown, CheckCheck, 
  RefreshCw, Settings, ArrowDownUp, FileX, Play,
  Cog, List, AlertCircle, CheckCircle, Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const DataProcessing: React.FC = () => {
  const [activeQueue, setActiveQueue] = useState([
    {
      id: 'job-1',
      fileName: 'pagamentos-semestre1-2023.csv',
      status: 'processing',
      progress: 75,
      client: 'Prefeitura Municipal de São Paulo',
      started: '10:45',
      recordCount: 12540
    },
    {
      id: 'job-2',
      fileName: 'retenções-2022.xlsx',
      status: 'queued',
      progress: 0,
      client: 'Secretaria Estadual de Educação',
      started: '-',
      recordCount: 8760
    }
  ]);
  
  const [completedJobs, setCompletedJobs] = useState([
    {
      id: 'job-3',
      fileName: 'fornecedores-ativos.csv',
      status: 'completed',
      client: 'Hospital Municipal Dr. João Silva',
      started: '09:30',
      completed: '09:35',
      recordCount: 543
    },
    {
      id: 'job-4',
      fileName: 'pagamentos-2021.xlsx',
      status: 'completed',
      client: 'Prefeitura Municipal de São Paulo',
      started: '08:15',
      completed: '08:45',
      recordCount: 15280
    }
  ]);
  
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleProcessStart = () => {
    if (!selectedFile) {
      toast.error('Selecione um arquivo para processar');
      return;
    }
    
    toast.info('Iniciando processamento', {
      description: `Arquivo ${selectedFile.name} adicionado à fila`
    });
    
    setIsImporting(true);
    setImportProgress(0);
    
    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          
          // Add to queue
          setActiveQueue(prevQueue => [
            {
              id: `job-${Date.now()}`,
              fileName: selectedFile.name,
              status: 'queued',
              progress: 0,
              client: 'Prefeitura Municipal de São Paulo',
              started: '-',
              recordCount: Math.floor(Math.random() * 10000) + 1000
            },
            ...prevQueue
          ]);
          
          toast.success('Processamento iniciado', {
            description: `${selectedFile.name} foi adicionado à fila de processamento`
          });
          
          // Reset selected file
          setSelectedFile(null);
          
          return 0;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-300">Concluído</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-300">Processando</Badge>;
      case 'queued':
        return <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300">Na Fila</Badge>;
      case 'error':
        return <Badge className="bg-red-500/20 text-red-700 dark:text-red-300">Erro</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };
  
  const handleCancelJob = (jobId: string) => {
    setActiveQueue(prevQueue => prevQueue.filter(job => job.id !== jobId));
    toast.success('Processamento cancelado', {
      description: 'O arquivo foi removido da fila de processamento'
    });
  };
  
  const handleStartJob = (jobId: string) => {
    setActiveQueue(prevQueue => 
      prevQueue.map(job => 
        job.id === jobId 
          ? {...job, status: 'processing', started: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
          : job
      )
    );
    toast.info('Processamento iniciado', {
      description: 'O arquivo está sendo processado'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Processamento Inteligente de Dados</h1>
          <p className="text-muted-foreground">
            Importação e processamento assíncrono de dados tributários
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
          <Button className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Dados Processados
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="import" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="import">Importação</TabsTrigger>
          <TabsTrigger value="queue">Fila de Processamento</TabsTrigger>
          <TabsTrigger value="filters">Filtros</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="import" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Importação de Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="import-type">Tipo de Dados</Label>
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
                      accept=".csv,.xlsx,.xls,.xml,.json,.pdf"
                    />
                    <Button 
                      onClick={handleProcessStart} 
                      disabled={!selectedFile || isImporting}
                      className="whitespace-nowrap"
                    >
                      <UploadCloud className="h-4 w-4 mr-2" />
                      Processar
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Formatos aceitos: CSV, Excel, XML, JSON, PDF
                  </p>
                </div>
                
                {isImporting && (
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-center">
                      <Label>Preparando arquivo para processamento...</Label>
                      <span className="text-sm">{importProgress}%</span>
                    </div>
                    <Progress value={importProgress} />
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="border rounded-md p-4 flex flex-col items-center text-center">
                  <UploadCloud className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Importação Flexível</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Suporte a múltiplos formatos de arquivo
                  </p>
                </div>
                
                <div className="border rounded-md p-4 flex flex-col items-center text-center">
                  <Cog className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Processamento Inteligente</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Aprendizado de padrões para importações futuras
                  </p>
                </div>
                
                <div className="border rounded-md p-4 flex flex-col items-center text-center">
                  <ArrowDownUp className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Rollback Automático</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Evita erros e duplicidades na importação
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="queue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Fila de Processamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Acompanhe o status dos processamentos em andamento e na fila.
                </p>
                
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted border-b">
                        <th className="px-4 py-3 text-left font-medium">Arquivo</th>
                        <th className="px-4 py-3 text-left font-medium">Cliente</th>
                        <th className="px-4 py-3 text-left font-medium">Início</th>
                        <th className="px-4 py-3 text-left font-medium">Registros</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                        <th className="px-4 py-3 text-left font-medium">Progresso</th>
                        <th className="px-4 py-3 text-left font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeQueue.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">
                            Nenhum processamento na fila
                          </td>
                        </tr>
                      ) : (
                        activeQueue.map(job => (
                          <tr key={job.id} className="border-b">
                            <td className="px-4 py-3">{job.fileName}</td>
                            <td className="px-4 py-3">{job.client}</td>
                            <td className="px-4 py-3">{job.started}</td>
                            <td className="px-4 py-3">{job.recordCount.toLocaleString()}</td>
                            <td className="px-4 py-3">{getStatusBadge(job.status)}</td>
                            <td className="px-4 py-3 w-32">
                              {job.status === 'processing' && (
                                <Progress value={job.progress} className="h-2" />
                              )}
                              {job.status === 'queued' && (
                                <span className="text-xs text-muted-foreground">Aguardando</span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                {job.status === 'queued' && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => handleStartJob(job.id)}
                                  >
                                    <Play className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => handleCancelJob(job.id)}
                                >
                                  <FileX className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Processamentos Concluídos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted border-b">
                      <th className="px-4 py-3 text-left font-medium">Arquivo</th>
                      <th className="px-4 py-3 text-left font-medium">Cliente</th>
                      <th className="px-4 py-3 text-left font-medium">Início</th>
                      <th className="px-4 py-3 text-left font-medium">Conclusão</th>
                      <th className="px-4 py-3 text-left font-medium">Registros</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedJobs.map(job => (
                      <tr key={job.id} className="border-b">
                        <td className="px-4 py-3">{job.fileName}</td>
                        <td className="px-4 py-3">{job.client}</td>
                        <td className="px-4 py-3">{job.started}</td>
                        <td className="px-4 py-3">{job.completed}</td>
                        <td className="px-4 py-3">{job.recordCount.toLocaleString()}</td>
                        <td className="px-4 py-3">{getStatusBadge(job.status)}</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm">Ver Detalhes</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="filters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Filtros Progressivos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Configure os filtros progressivos aplicados durante o processamento de dados.
                </p>
                
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Filtro 1: Refinamento Inicial</h3>
                    </div>
                    <div className="border-l-2 border-primary/20 pl-6 ml-2 space-y-4">
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Identificação de Dados Relevantes</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Validação de formato de documento fiscal</span>
                            <input type="checkbox" className="h-4 w-4" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Verificação de datas válidas</span>
                            <input type="checkbox" className="h-4 w-4" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Normalização de valores monetários</span>
                            <input type="checkbox" className="h-4 w-4" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Detecção de operações tributáveis</span>
                            <input type="checkbox" className="h-4 w-4" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <ArrowDown className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Filtro 2: Classificação de Dados</h3>
                    </div>
                    <div className="border-l-2 border-primary/20 pl-6 ml-2 space-y-4">
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Aplicação de Regras Tributárias</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Classificação por tipo de serviço/produto</span>
                            <input type="checkbox" className="h-4 w-4" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Identificação de retenções aplicáveis</span>
                            <input type="checkbox" className="h-4 w-4" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Verificação de limites de dispensa</span>
                            <input type="checkbox" className="h-4 w-4" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Cálculo de valores retidos x devidos</span>
                            <input type="checkbox" className="h-4 w-4" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Redefinir Padrões</Button>
                  <Button>Salvar Alterações</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Histórico de Processamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted border-b">
                      <th className="px-4 py-3 text-left font-medium">Data</th>
                      <th className="px-4 py-3 text-left font-medium">Arquivo</th>
                      <th className="px-4 py-3 text-left font-medium">Cliente</th>
                      <th className="px-4 py-3 text-left font-medium">Registros</th>
                      <th className="px-4 py-3 text-left font-medium">Duração</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3">15/05/2023</td>
                      <td className="px-4 py-3">pagamentos-2022-completo.csv</td>
                      <td className="px-4 py-3">Prefeitura Municipal de São Paulo</td>
                      <td className="px-4 py-3">15.280</td>
                      <td className="px-4 py-3">45m 12s</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-green-500/20 text-green-700 dark:text-green-300">Concluído</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm">Ver Detalhes</Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">10/05/2023</td>
                      <td className="px-4 py-3">fornecedores.xlsx</td>
                      <td className="px-4 py-3">Secretaria Estadual de Educação</td>
                      <td className="px-4 py-3">543</td>
                      <td className="px-4 py-3">3m 25s</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-green-500/20 text-green-700 dark:text-green-300">Concluído</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm">Ver Detalhes</Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">05/05/2023</td>
                      <td className="px-4 py-3">retenções-2021.pdf</td>
                      <td className="px-4 py-3">Hospital Municipal Dr. João Silva</td>
                      <td className="px-4 py-3">1.245</td>
                      <td className="px-4 py-3">12m 37s</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-red-500/20 text-red-700 dark:text-red-300">Erro</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm">Ver Detalhes</Button>
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

export default DataProcessing;
