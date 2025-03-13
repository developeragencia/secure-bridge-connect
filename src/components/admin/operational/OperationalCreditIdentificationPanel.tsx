
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, TrendingUp, AlertCircle, Search, ArrowRight, Clock, FileCheck } from "lucide-react";

const OperationalCreditIdentificationPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Identificação Operacional de Créditos</h2>
          <p className="text-muted-foreground">
            Identificação automatizada de oportunidades de créditos operacionais.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Histórico
          </Button>
          <Button className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Nova Busca
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-100 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <span>Oportunidades Identificadas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <p className="text-sm text-muted-foreground">Nos últimos 30 dias</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border-green-100 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <span>Valor Potencial</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ 1.28M</div>
            <p className="text-sm text-muted-foreground">Estimativa de recuperação</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 border-amber-100 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <span>Taxa de Conversão</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">68%</div>
            <p className="text-sm text-muted-foreground">Oportunidades confirmadas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
          <TabsTrigger value="analysis">Análise</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
        </TabsList>
        
        <TabsContent value="opportunities" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Oportunidades Recentes</CardTitle>
                <Button variant="outline" size="sm">
                  Filtrar
                </Button>
              </div>
              <CardDescription>
                Lista de oportunidades de créditos identificadas recentemente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3 md:mb-0">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Cliente {i}</p>
                          <Badge variant={i % 2 === 0 ? "default" : "outline"}>
                            {i % 2 === 0 ? "Alta prioridade" : "Média prioridade"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Crédito Operacional Identificado: R$ {(i * 24860).toLocaleString('pt-BR')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Analisar</Button>
                      <Button size="sm">
                        Processar
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">Carregar Mais</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Identificação</CardTitle>
              <CardDescription>
                Status e progresso das análises em andamento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Cliente A - Análise ICMS</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Cliente B - Análise IRPJ</span>
                    <span className="text-sm text-muted-foreground">62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Cliente C - Análise PIS/COFINS</span>
                    <span className="text-sm text-muted-foreground">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Cliente D - Análise CSLL</span>
                    <span className="text-sm text-muted-foreground">38%</span>
                  </div>
                  <Progress value={38} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendências de Identificação</CardTitle>
              <CardDescription>
                Análise histórica e previsão de oportunidades.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg border border-dashed">
                <div className="text-center">
                  <FileCheck className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium">Tendências e Projeções</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">
                    Visualize dados históricos e projeções futuras de oportunidades de créditos operacionais.
                  </p>
                  <Button className="mt-4">Carregar Dados</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationalCreditIdentificationPanel;
