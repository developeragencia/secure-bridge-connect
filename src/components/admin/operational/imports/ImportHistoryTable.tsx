
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ImportHistoryTable = () => {
  return (
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
  );
};

export default ImportHistoryTable;
