
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  FileCheck, Search, FileText, CheckCheck, 
  List, FilterX, RefreshCw, Settings, 
  AlertCircle, CheckCircle, Clock, Calendar 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const CreditIdentification: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [monthsToAnalyze, setMonthsToAnalyze] = useState(60);
  const [automaticClassification, setAutomaticClassification] = useState(true);
  const [applyRules, setApplyRules] = useState(true);
  
  const handleStartAnalysis = () => {
    if (isAnalyzing) return;
    
    toast.info('Iniciando análise automática', {
      description: `Analisando pagamentos dos últimos ${monthsToAnalyze} meses`
    });
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          toast.success('Análise concluída', {
            description: 'Identificados 127 potenciais créditos tributários'
          });
          return 100;
        }
        return prev + 5;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Identificação Automática de Créditos</h1>
          <p className="text-muted-foreground">
            Sistema inteligente de identificação de oportunidades de créditos tributários
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
          <Button className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Ver Créditos
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="analysis">Análise Automática</TabsTrigger>
          <TabsTrigger value="rules">Regras de Classificação</TabsTrigger>
          <TabsTrigger value="history">Histórico de Análises</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Configuração da Análise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="months">Período de Análise (meses)</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="months" 
                        type="number" 
                        value={monthsToAnalyze} 
                        onChange={(e) => setMonthsToAnalyze(Number(e.target.value))}
                        min={1}
                        max={60}
                        className="w-24"
                      />
                      <span className="text-sm text-muted-foreground">Máximo: 60 meses</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente</Label>
                    <select 
                      id="client"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Todos os clientes</option>
                      <option value="1">Prefeitura Municipal de São Paulo</option>
                      <option value="2">Secretaria Estadual de Educação</option>
                      <option value="3">Hospital Municipal Dr. João Silva</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="automatic-classification">Classificação Automática</Label>
                      <p className="text-xs text-muted-foreground">
                        Classificar fornecedores conforme hipóteses de retenção
                      </p>
                    </div>
                    <Switch 
                      id="automatic-classification" 
                      checked={automaticClassification}
                      onCheckedChange={setAutomaticClassification}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="apply-rules">Aplicação de Regras</Label>
                      <p className="text-xs text-muted-foreground">
                        Aplicar regras conforme Manual de Retenções IRPJ
                      </p>
                    </div>
                    <Switch 
                      id="apply-rules" 
                      checked={applyRules}
                      onCheckedChange={setApplyRules}
                    />
                  </div>
                </div>
                
                {isAnalyzing && (
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between items-center">
                      <Label>Análise em andamento...</Label>
                      <span className="text-sm">{analysisProgress}%</span>
                    </div>
                    <Progress value={analysisProgress} />
                  </div>
                )}
                
                <Button 
                  className="w-full mt-4" 
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analisando...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Iniciar Análise Automática
                    </>
                  )}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="border rounded-md p-4 flex flex-col items-center text-center">
                  <Calendar className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Análise dos Últimos 60 Meses</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Verificação de todos os pagamentos do período
                  </p>
                </div>
                
                <div className="border rounded-md p-4 flex flex-col items-center text-center">
                  <List className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Aplicação de Regras</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Conforme Manual de Retenções IRPJ
                  </p>
                </div>
                
                <div className="border rounded-md p-4 flex flex-col items-center text-center">
                  <CheckCheck className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Classificação Automática</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    De fornecedores por retenção ou dispensa
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Resultado da Última Análise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Créditos Identificados</p>
                      <p className="text-2xl font-bold">127</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Documentos Analisados</p>
                      <p className="text-2xl font-bold">1.462</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tempo de Análise</p>
                      <p className="text-2xl font-bold">3:42</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Requer Verificação</p>
                      <p className="text-2xl font-bold">23</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Regras de Classificação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Configure as regras de análise e classificação aplicadas na identificação automática de créditos tributários.
                </p>
                
                <div className="border rounded-md divide-y">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Serviços de limpeza, conservação ou vigilância</h3>
                      <p className="text-sm text-muted-foreground">
                        Retenção obrigatória de IRPJ (1%), CSLL (1%), COFINS (3%) e PIS (0,65%)
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Serviços profissionais</h3>
                      <p className="text-sm text-muted-foreground">
                        Retenção obrigatória de IRPJ, conforme tabela progressiva
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Fornecimento de bens</h3>
                      <p className="text-sm text-muted-foreground">
                        Dispensa de retenção na fonte
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Pagamentos a optantes pelo Simples Nacional</h3>
                      <p className="text-sm text-muted-foreground">
                        Dispensa de retenção mediante declaração
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Pagamentos de valor inferior a R$ 666,00</h3>
                      <p className="text-sm text-muted-foreground">
                        Dispensa de retenção conforme limite estabelecido
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
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
              <CardTitle className="text-lg font-medium">Histórico de Análises</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted border-b">
                      <th className="px-4 py-3 text-left font-medium">Data</th>
                      <th className="px-4 py-3 text-left font-medium">Cliente</th>
                      <th className="px-4 py-3 text-left font-medium">Período Analisado</th>
                      <th className="px-4 py-3 text-left font-medium">Créditos Identificados</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3">15/05/2023</td>
                      <td className="px-4 py-3">Prefeitura Municipal de São Paulo</td>
                      <td className="px-4 py-3">60 meses</td>
                      <td className="px-4 py-3">127</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-green-500/20 text-green-700 dark:text-green-300">Concluído</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm">Ver Detalhes</Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">10/05/2023</td>
                      <td className="px-4 py-3">Secretaria Estadual de Educação</td>
                      <td className="px-4 py-3">36 meses</td>
                      <td className="px-4 py-3">82</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-green-500/20 text-green-700 dark:text-green-300">Concluído</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm">Ver Detalhes</Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">05/05/2023</td>
                      <td className="px-4 py-3">Hospital Municipal Dr. João Silva</td>
                      <td className="px-4 py-3">24 meses</td>
                      <td className="px-4 py-3">43</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-green-500/20 text-green-700 dark:text-green-300">Concluído</Badge>
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

export default CreditIdentification;
