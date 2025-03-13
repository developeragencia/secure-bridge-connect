import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FileText, Download, Filter, Search, RefreshCw,
  FileUp, FilePlus2, Settings
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const FiscalReports = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Relatórios Fiscais</CardTitle>
              <CardDescription>
                Visualize e gerencie os relatórios fiscais da sua empresa
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button>
                <FilePlus2 className="mr-2 h-4 w-4" />
                Gerar Relatório
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Buscar relatório..."
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p>Em breve: Tabela de relatórios fiscais</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button variant="ghost">
            <FileText className="mr-2 h-4 w-4" />
            Exportar tudo
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Baixar relatório
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FiscalReports;
