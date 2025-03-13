
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, FileDown, RefreshCw, Settings } from 'lucide-react';
import { toast } from 'sonner';

const IRRFCalculations: React.FC = () => {
  const [calculationType, setCalculationType] = useState('services');
  const [cnae, setCnae] = useState('');
  const [baseValue, setBaseValue] = useState('');
  const [result, setResult] = useState<null | {
    rate: number;
    value: number;
    description: string;
  }>(null);
  
  const handleCalculate = () => {
    if (!baseValue || isNaN(Number(baseValue))) {
      toast.error('Valor base inválido');
      return;
    }
    
    // In real app, this would be a more complex calculation based on tax rules
    const value = Number(baseValue);
    let rate = 0;
    let description = '';
    
    if (calculationType === 'services') {
      rate = 1.5;
      description = 'Retenção padrão para serviços';
    } else if (calculationType === 'products') {
      rate = 1.0;
      description = 'Retenção padrão para produtos';
    } else {
      rate = 2.0;
      description = 'Retenção para importações';
    }
    
    setResult({
      rate,
      value: value * (rate / 100),
      description
    });
    
    toast.success('Cálculo realizado com sucesso');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Cálculos IRRF/PJ</h1>
          <p className="text-muted-foreground">
            Calculadora de valores de IRRF conforme legislação
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Exportar Tabelas
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="calculator">Calculadora IRRF</TabsTrigger>
          <TabsTrigger value="tables">Tabelas de Alíquotas</TabsTrigger>
          <TabsTrigger value="history">Histórico de Cálculos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Calculadora de IRRF</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="calculation-type">Tipo de Cálculo</Label>
                  <Select 
                    value={calculationType}
                    onValueChange={setCalculationType}
                  >
                    <SelectTrigger id="calculation-type">
                      <SelectValue placeholder="Selecione o tipo de cálculo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="services">Serviços</SelectItem>
                      <SelectItem value="products">Produtos</SelectItem>
                      <SelectItem value="imports">Importações</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cnae">CNAE (opcional)</Label>
                  <Input
                    id="cnae"
                    placeholder="Ex: 62.01-5-01"
                    value={cnae}
                    onChange={(e) => setCnae(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="base-value">Valor Base (R$)</Label>
                <Input
                  id="base-value"
                  placeholder="Digite o valor para cálculo"
                  value={baseValue}
                  onChange={(e) => setBaseValue(e.target.value)}
                  type="number"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <Button onClick={handleCalculate} className="w-full sm:w-auto flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Calcular IRRF
              </Button>
              
              {result && (
                <div className="mt-6 p-4 border rounded-md bg-secondary/30">
                  <h3 className="font-medium text-lg mb-2">Resultado:</h3>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 mt-4">
                    <div className="bg-card p-3 rounded-md text-center">
                      <p className="text-sm font-medium mb-1">Alíquota Aplicada</p>
                      <p className="text-2xl font-bold">{result.rate}%</p>
                    </div>
                    <div className="bg-card p-3 rounded-md text-center">
                      <p className="text-sm font-medium mb-1">Valor IRRF</p>
                      <p className="text-2xl font-bold">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(result.value)}
                      </p>
                    </div>
                    <div className="bg-card p-3 rounded-md text-center">
                      <p className="text-sm font-medium mb-1">Valor Líquido</p>
                      <p className="text-2xl font-bold">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(Number(baseValue) - result.value)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground text-sm">{result.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tables">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Tabelas de Alíquotas IRRF</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Consulte as tabelas de alíquotas conforme o tipo de operação e CNAE
              </p>
              
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted border-b">
                      <th className="px-4 py-3 text-left font-medium">Tipo de Operação</th>
                      <th className="px-4 py-3 text-left font-medium">CNAE</th>
                      <th className="px-4 py-3 text-left font-medium">Alíquota</th>
                      <th className="px-4 py-3 text-left font-medium">Observações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3">Serviços em Geral</td>
                      <td className="px-4 py-3">Diversos</td>
                      <td className="px-4 py-3">1,5%</td>
                      <td className="px-4 py-3">Serviços diversos</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Serviços de Tecnologia</td>
                      <td className="px-4 py-3">62.01-5-01</td>
                      <td className="px-4 py-3">1,5%</td>
                      <td className="px-4 py-3">Desenvolvimento de sistemas</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Produtos</td>
                      <td className="px-4 py-3">Diversos</td>
                      <td className="px-4 py-3">1,0%</td>
                      <td className="px-4 py-3">Venda de produtos</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3">Importações</td>
                      <td className="px-4 py-3">Diversos</td>
                      <td className="px-4 py-3">2,0%</td>
                      <td className="px-4 py-3">Serviços do exterior</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Histórico de Cálculos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Nenhum cálculo realizado recentemente.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IRRFCalculations;
