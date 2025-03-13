
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileType, Database, CheckCircle2, FileX, FileText, FileImage } from "lucide-react";

const OperationalImportsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Importação de Dados Operacionais</h2>
          <p className="text-muted-foreground">
            Importe dados de sistemas externos para processamento operacional.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Importar Arquivo
        </Button>
      </div>

      <Tabs defaultValue="files" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="files">Arquivos</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="files" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Formatos Suportados</CardTitle>
              <CardDescription>
                Selecione o tipo de arquivo que deseja importar para o sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-24 flex flex-col justify-center items-center gap-2 border-dashed">
                <FileType className="h-8 w-8 text-muted-foreground" />
                <span>XML</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col justify-center items-center gap-2 border-dashed">
                <FileType className="h-8 w-8 text-muted-foreground" />
                <span>CSV</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col justify-center items-center gap-2 border-dashed">
                <Database className="h-8 w-8 text-muted-foreground" />
                <span>JSON</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col justify-center items-center gap-2 border-dashed">
                <FileText className="h-8 w-8 text-muted-foreground" />
                <span>PDF</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col justify-center items-center gap-2 border-dashed">
                <FileText className="h-8 w-8 text-muted-foreground" />
                <span>Word</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col justify-center items-center gap-2 border-dashed">
                <FileImage className="h-8 w-8 text-muted-foreground" />
                <span>Outros</span>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Importações Recentes</CardTitle>
              <CardDescription>
                Lista dos últimos arquivos importados para o sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileType className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">dados_fiscais_2023.xml</p>
                      <p className="text-sm text-muted-foreground">Importado em: 22/04/2023 às 14:30</p>
                    </div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileType className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">clientes_ativos.csv</p>
                      <p className="text-sm text-muted-foreground">Importado em: 21/04/2023 às 09:15</p>
                    </div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileType className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">notas_fiscais_2022.xml</p>
                      <p className="text-sm text-muted-foreground">Importado em: 20/04/2023 às 16:45</p>
                    </div>
                  </div>
                  <FileX className="h-5 w-5 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Importações</CardTitle>
              <CardDescription>
                Visualize todas as importações realizadas no sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted p-3 text-sm font-medium">
                  <div>Arquivo</div>
                  <div>Tipo</div>
                  <div>Data</div>
                  <div>Usuário</div>
                  <div>Status</div>
                </div>
                <div className="divide-y">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="grid grid-cols-5 p-3 text-sm">
                      <div>dados_operacionais_{i}.xml</div>
                      <div>XML</div>
                      <div>{`${i+20}/04/2023`}</div>
                      <div>Administrador</div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                        Concluído
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Importação</CardTitle>
              <CardDescription>
                Personalize o processo de importação de dados operacionais.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Diretório Padrão</label>
                  <Input placeholder="/imports/operational" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Formato Padrão</label>
                  <Input placeholder="XML" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Validação Automática</label>
                  <select className="w-full p-2 rounded-md border">
                    <option>Ativada</option>
                    <option>Desativada</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Agendamento</label>
                  <select className="w-full p-2 rounded-md border">
                    <option>Manual</option>
                    <option>Diário</option>
                    <option>Semanal</option>
                    <option>Mensal</option>
                  </select>
                </div>
              </div>
              
              <Button className="w-full md:w-auto">Salvar Configurações</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationalImportsPanel;
