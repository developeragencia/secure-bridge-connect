
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileType, CheckCircle2, FileX } from "lucide-react";

const RecentImportsCard = () => {
  return (
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
  );
};

export default RecentImportsCard;
