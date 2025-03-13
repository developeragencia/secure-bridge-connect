
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Calculator, FileDown, RefreshCw, Settings, CreditCard, TrendingUp, PercentCircle, FileCog } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const TaxCreditCalculator: React.FC = () => {
  const [creditType, setCreditType] = useState('pis_cofins');
  const [period, setPeriod] = useState('monthly');
  const [baseValue, setBaseValue] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [result, setResult] = useState<null | {
    credit: number;
    taxAmount: number;
    effectiveRate: number;
    description: string;
  }>(null);
  
  const handleCalculate = () => {
    if (!baseValue || isNaN(Number(baseValue))) {
      toast.error('Valor base inválido');
      return;
    }
    
    if (!taxRate || isNaN(Number(taxRate))) {
      toast.error('Alíquota inválida');
      return;
    }
    
    // Perform calculation
    const value = Number(baseValue);
    const rate = Number(taxRate);
    let creditFactor = 0;
    let description = '';
    
    switch (creditType) {
      case 'pis_cofins':
        creditFactor = 0.925;
        description = 'Crédito de PIS/COFINS calculado conforme legislação vigente';
        break;
      case 'icms':
        creditFactor = 0.85;
        description = 'Crédito de ICMS calculado conforme legislação vigente';
        break;
      case 'ipi':
        creditFactor = 0.95;
        description = 'Crédito de IPI calculado conforme legislação vigente';
        break;
      case 'inss':
        creditFactor = 0.80;
        description = 'Crédito de INSS calculado conforme legislação vigente';
        break;
      default:
        creditFactor = 1.0;
        description = 'Cálculo padrão aplicado';
    }
    
    const taxAmount = value * (rate / 100);
    const creditAmount = taxAmount * creditFactor;
    const effectiveRate = (creditAmount / value) * 100;
    
    setResult({
      credit: creditAmount,
      taxAmount,
      effectiveRate,
      description
    });
    
    toast.success('Cálculo realizado com sucesso');
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <div className="space-y-6">
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
            Calculadora de Créditos Tributários
          </h1>
          <p className="text-muted-foreground">
            Calcule créditos tributários para diferentes impostos e situações
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
      </motion.div>
      
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="calculator">Calculadora de Créditos</TabsTrigger>
          <TabsTrigger value="tables">Tabelas de Alíquotas</TabsTrigger>
          <TabsTrigger value="history">Histórico de Cálculos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Calculadora de Créditos Tributários</CardTitle>
                <CardDescription>
                  Insira os valores para calcular o crédito tributário disponível
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="credit-type">Tipo de Crédito</Label>
                    <Select 
                      value={creditType}
                      onValueChange={setCreditType}
                    >
                      <SelectTrigger id="credit-type">
                        <SelectValue placeholder="Selecione o tipo de crédito" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pis_cofins">PIS/COFINS</SelectItem>
                        <SelectItem value="icms">ICMS</SelectItem>
                        <SelectItem value="ipi">IPI</SelectItem>
                        <SelectItem value="inss">INSS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="period">Período</Label>
                    <Select
                      value={period}
                      onValueChange={setPeriod}
                    >
                      <SelectTrigger id="period">
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Mensal</SelectItem>
                        <SelectItem value="quarterly">Trimestral</SelectItem>
                        <SelectItem value="yearly">Anual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">Alíquota (%)</Label>
                    <Input
                      id="tax-rate"
                      placeholder="Digite a alíquota aplicável"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <Button onClick={handleCalculate} className="w-full sm:w-auto flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Calcular Crédito
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Guia Rápido</CardTitle>
                <CardDescription>
                  Dicas para cálculo de créditos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <CreditCard className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-medium">PIS/COFINS</h3>
                      <p className="text-sm text-muted-foreground">Alíquotas mais comuns são 3,65% (cumulativo) e 9,25% (não cumulativo)</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                      <TrendingUp className="h-5 w-5 text-green-700 dark:text-green-300" />
                    </div>
                    <div>
                      <h3 className="font-medium">ICMS</h3>
                      <p className="text-sm text-muted-foreground">Varia por estado, geralmente entre 17% e 18%</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                      <PercentCircle className="h-5 w-5 text-purple-700 dark:text-purple-300" />
                    </div>
                    <div>
                      <h3 className="font-medium">IPI</h3>
                      <p className="text-sm text-muted-foreground">Varia conforme a tabela TIPI, com alíquotas entre 0% e 30%</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full">
                      <FileCog className="h-5 w-5 text-orange-700 dark:text-orange-300" />
                    </div>
                    <div>
                      <h3 className="font-medium">INSS</h3>
                      <p className="text-sm text-muted-foreground">20% sobre a folha de pagamento e outras contribuições</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
              
          {result && (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden border-t-4 border-t-blue-500">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="text-lg font-medium">Resultado do Cálculo</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 text-center shadow-sm">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Valor do Imposto</p>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(result.taxAmount)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 text-center shadow-sm">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Crédito Tributário</p>
                      <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(result.credit)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950 p-4 text-center shadow-sm">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Taxa Efetiva</p>
                      <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                        {result.effectiveRate.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground text-sm p-2 bg-muted/30 rounded-md">{result.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>
        
        <TabsContent value="tables">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Tabelas de Alíquotas</CardTitle>
              <CardDescription>
                Consulte as tabelas de alíquotas por tipo de tributo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted border-b">
                      <th className="px-4 py-3 text-left font-medium">Tributo</th>
                      <th className="px-4 py-3 text-left font-medium">Regime</th>
                      <th className="px-4 py-3 text-left font-medium">Alíquota</th>
                      <th className="px-4 py-3 text-left font-medium">Base Legal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">PIS</td>
                      <td className="px-4 py-3">Cumulativo</td>
                      <td className="px-4 py-3">0,65%</td>
                      <td className="px-4 py-3">Lei 10.637/2002</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">COFINS</td>
                      <td className="px-4 py-3">Cumulativo</td>
                      <td className="px-4 py-3">3,0%</td>
                      <td className="px-4 py-3">Lei 10.833/2003</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">PIS</td>
                      <td className="px-4 py-3">Não Cumulativo</td>
                      <td className="px-4 py-3">1,65%</td>
                      <td className="px-4 py-3">Lei 10.637/2002</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">COFINS</td>
                      <td className="px-4 py-3">Não Cumulativo</td>
                      <td className="px-4 py-3">7,6%</td>
                      <td className="px-4 py-3">Lei 10.833/2003</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">ICMS</td>
                      <td className="px-4 py-3">SP</td>
                      <td className="px-4 py-3">18%</td>
                      <td className="px-4 py-3">Lei Est. 6.374/1989</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">IPI</td>
                      <td className="px-4 py-3">Diversos</td>
                      <td className="px-4 py-3">Variável</td>
                      <td className="px-4 py-3">TIPI</td>
                    </tr>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">INSS</td>
                      <td className="px-4 py-3">Empresa</td>
                      <td className="px-4 py-3">20%</td>
                      <td className="px-4 py-3">Lei 8.212/1991</td>
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
              <CardDescription>
                Visualize seus cálculos recentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <Calculator className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">Nenhum cálculo recente</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Seus cálculos recentes aparecerão aqui para fácil referência
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxCreditCalculator;
