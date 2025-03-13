
import React from 'react';
import { Database, Upload, FileSpreadsheet, DownloadCloud, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TabTitleSection from '../header/TabTitleSection';

const DataImports: React.FC = () => {
  return (
    <div className="space-y-6">
      <TabTitleSection 
        Icon={Database} 
        title="Importação de Dados" 
        description="Importe dados de sistemas externos e gerenciar o fluxo de importação de documentos fiscais."
      />

      <Tabs defaultValue="import" className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-2">
          <TabsTrigger value="import">Importar Arquivos</TabsTrigger>
          <TabsTrigger value="history">Histórico de Importações</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ImportCard 
              title="EFD Contribuições" 
              icon={<FileSpreadsheet className="h-8 w-8 text-blue-500" />}
              description="Escrituração Fiscal Digital PIS/COFINS"
            />
            <ImportCard 
              title="EFD ICMS/IPI" 
              icon={<FileSpreadsheet className="h-8 w-8 text-green-500" />}
              description="Escrituração Fiscal Digital de ICMS e IPI"
            />
            <ImportCard 
              title="SPED Contábil" 
              icon={<FileSpreadsheet className="h-8 w-8 text-purple-500" />}
              description="Sistema Público de Escrituração Digital Contábil"
            />
            <ImportCard 
              title="Notas Fiscais XML" 
              icon={<FileSpreadsheet className="h-8 w-8 text-orange-500" />}
              description="Arquivos XML de Notas Fiscais Eletrônicas"
            />
            <ImportCard 
              title="Extratos Bancários" 
              icon={<FileSpreadsheet className="h-8 w-8 text-cyan-500" />}
              description="Extratos de conta corrente e aplicações"
            />
            <ImportCard 
              title="Importação personalizada" 
              icon={<FileSpreadsheet className="h-8 w-8 text-red-500" />}
              description="Carregue dados com mapeamento personalizado"
              isCustom={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Importações</CardTitle>
              <CardDescription>Consulte o histórico de importações realizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted/50 p-3 text-sm font-medium">
                  <div>Data</div>
                  <div>Tipo</div>
                  <div>Arquivos</div>
                  <div>Status</div>
                  <div>Ações</div>
                </div>
                <ImportHistoryRow 
                  date="12/07/2023" 
                  type="EFD Contribuições" 
                  files={3} 
                  status="Concluído" 
                />
                <ImportHistoryRow 
                  date="10/07/2023" 
                  type="Notas Fiscais XML" 
                  files={48} 
                  status="Concluído" 
                />
                <ImportHistoryRow 
                  date="05/07/2023" 
                  type="SPED Contábil" 
                  files={1} 
                  status="Erro" 
                />
                <ImportHistoryRow 
                  date="01/07/2023" 
                  type="EFD ICMS/IPI" 
                  files={2} 
                  status="Concluído" 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Templates de Importação</CardTitle>
              <CardDescription>Templates para importação de dados</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TemplateCard title="Planilha de Fornecedores" description="Modelo para importação de cadastro de fornecedores" />
              <TemplateCard title="Planilha de Produtos" description="Modelo para importação de cadastro de produtos" />
              <TemplateCard title="Mapeamento de Contas" description="Modelo para mapeamento de plano de contas" />
              <TemplateCard title="Despesas Operacionais" description="Modelo para importação de despesas" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Importação</CardTitle>
              <CardDescription>Configure as opções de importação de dados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Processamento Automático</h3>
                  <p className="text-sm text-muted-foreground">Processe automaticamente arquivos após o upload</p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Ativar</Button>
                    <Button variant="outline" size="sm">Desativar</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Validação de Dados</h3>
                  <p className="text-sm text-muted-foreground">Nível de validação durante importação</p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Básica</Button>
                    <Button variant="outline" size="sm">Completa</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper component for import cards
interface ImportCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  isCustom?: boolean;
}

const ImportCard: React.FC<ImportCardProps> = ({ title, icon, description, isCustom = false }) => {
  return (
    <Card className="overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
      <CardHeader className="space-y-1 flex flex-row items-start gap-3">
        <div className="rounded-md border border-muted bg-muted/30 p-2">{icon}</div>
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="border-t bg-muted/10 px-6 py-3">
        <Button className="w-full" variant={isCustom ? "default" : "outline"}>
          <Upload className="mr-2 h-4 w-4" />
          Importar
        </Button>
      </CardFooter>
    </Card>
  );
};

// Helper component for import history rows
interface ImportHistoryRowProps {
  date: string;
  type: string;
  files: number;
  status: string;
}

const ImportHistoryRow: React.FC<ImportHistoryRowProps> = ({ date, type, files, status }) => {
  return (
    <div className="grid grid-cols-5 items-center p-3 text-sm border-t">
      <div>{date}</div>
      <div>{type}</div>
      <div>{files} arquivo{files > 1 ? 's' : ''}</div>
      <div>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          status === 'Concluído' ? 'bg-green-100 text-green-800' : 
          status === 'Erro' ? 'bg-red-100 text-red-800' : 
          'bg-yellow-100 text-yellow-800'
        }`}>
          {status}
        </span>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="icon" className="h-7 w-7">
          <DownloadCloud className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-7 w-7">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Helper component for template cards
interface TemplateCardProps {
  title: string;
  description: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ title, description }) => {
  return (
    <Card className="overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="border-t bg-muted/10 px-6 py-3">
        <Button className="w-full" variant="outline">
          <DownloadCloud className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DataImports;
