
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import TaxCalculationForm from './calculations/TaxCalculationForm';
import SelicCorrectionPanel from './calculations/SelicCorrectionPanel';
import AuditTrailPanel from './calculations/AuditTrailPanel';
import SupplierCnaeTable from './calculations/SupplierCnaeTable';
import ComparisonAnalysis from './calculations/ComparisonAnalysis';

const IRRFCalculations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('calculation');
  
  const { classes: cardClasses } = useAnimationOnScroll<HTMLDivElement>({
    threshold: 0.1,
    transitionType: 'fade-in',
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Cálculo de Retenções IRRF</h1>
        <p className="text-muted-foreground">
          Calcule, corrija e audite retenções com base no CNAE dos fornecedores
        </p>
      </div>

      <Tabs defaultValue="calculation" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="calculation">Cálculo Automático</TabsTrigger>
          <TabsTrigger value="comparison">Comparação de Valores</TabsTrigger>
          <TabsTrigger value="selic">Correção Monetária</TabsTrigger>
          <TabsTrigger value="audit">Histórico de Auditoria</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculation" className="space-y-6">
          <Card className={cardClasses}>
            <CardHeader>
              <CardTitle>Cálculo Automático de Retenções</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TaxCalculationForm />
              <SupplierCnaeTable />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-6">
          <Card className={cardClasses}>
            <CardHeader>
              <CardTitle>Comparação de Valores Retidos vs. Devidos</CardTitle>
            </CardHeader>
            <CardContent>
              <ComparisonAnalysis />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="selic" className="space-y-6">
          <Card className={cardClasses}>
            <CardHeader>
              <CardTitle>Correção Monetária pela Taxa Selic</CardTitle>
            </CardHeader>
            <CardContent>
              <SelicCorrectionPanel />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audit" className="space-y-6">
          <Card className={cardClasses}>
            <CardHeader>
              <CardTitle>Histórico Detalhado de Auditoria</CardTitle>
            </CardHeader>
            <CardContent>
              <AuditTrailPanel />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IRRFCalculations;
