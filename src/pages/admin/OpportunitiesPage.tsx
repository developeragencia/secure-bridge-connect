
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, Search, RefreshCw, BarChart4, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

import OpportunitiesTabContent from '@/components/admin/tax-credits/components/OpportunitiesTabContent';
import ButtonEffect from '@/components/admin/common/ButtonEffect';

const OpportunitiesPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const handleRefresh = () => {
    toast({
      title: "Atualizado",
      description: "Lista de oportunidades atualizada com sucesso.",
    });
  };
  
  const handleNewOpportunity = () => {
    toast({
      title: "Nova oportunidade",
      description: "Criando nova oportunidade de crédito",
    });
  };
  
  const handleExportData = () => {
    toast({
      title: "Exportar dados",
      description: "Iniciando exportação dos dados",
    });
  };
  
  const handleGenerateReport = () => {
    toast({
      title: "Relatório",
      description: "Gerando relatório das oportunidades",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Oportunidades de Crédito</h2>
          <p className="text-muted-foreground">
            Gerencie as oportunidades de crédito identificadas para seus clientes.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <ButtonEffect
            onClick={handleRefresh}
            icon={<RefreshCw className="h-4 w-4" />}
            variant="outline"
            tooltip="Atualizar lista"
          />
          <ButtonEffect
            onClick={handleNewOpportunity}
            icon={<Plus className="h-4 w-4 mr-2" />}
            label="Nova Oportunidade"
            tooltip="Criar nova oportunidade"
          />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total de Oportunidades</CardTitle>
            <CardDescription>Todas as oportunidades identificadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">24</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                +3 esta semana
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Valor Total Potencial</CardTitle>
            <CardDescription>Valor total das oportunidades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">R$ 1.578.234,56</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                +R$ 234.567,00
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Taxa de Conversão</CardTitle>
            <CardDescription>Oportunidades aprovadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">73%</span>
              <Badge variant="outline" className="bg-amber-50 text-amber-700">
                +5% este mês
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar oportunidades..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" size="sm" className="h-9" onClick={handleGenerateReport}>
            <BarChart4 className="mr-2 h-4 w-4" />
            Relatório
          </Button>
          <Button variant="outline" size="sm" className="h-9" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4 w-full sm:w-auto">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="available">Disponíveis</TabsTrigger>
          <TabsTrigger value="analysis">Em Análise</TabsTrigger>
          <TabsTrigger value="approved">Aprovadas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <OpportunitiesTabContent />
        </TabsContent>
        
        <TabsContent value="available">
          <OpportunitiesTabContent />
        </TabsContent>
        
        <TabsContent value="analysis">
          <OpportunitiesTabContent />
        </TabsContent>
        
        <TabsContent value="approved">
          <OpportunitiesTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OpportunitiesPage;
