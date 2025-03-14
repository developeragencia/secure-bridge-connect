
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ButtonEffect from '@/components/admin/common/ButtonEffect';
import { Plus, Upload, Calculator } from 'lucide-react';

interface IRRFHeaderProps {
  activeClient?: { name: string } | null;
  onNewRecovery: () => void;
  onImportData: () => void;
  onRunCalculation: () => void;
}

const IRRFHeader: React.FC<IRRFHeaderProps> = ({
  activeClient,
  onNewRecovery,
  onImportData,
  onRunCalculation
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Recuperação IRRF/PJ</h1>
          <p className="text-muted-foreground">
            Automatização de recuperação de créditos tributários IRRF para Pessoas Jurídicas
          </p>
        </div>
        
        <div className="flex gap-2">
          <ButtonEffect
            onClick={onNewRecovery}
            icon={<Plus className="h-4 w-4" />}
            label="Novo Processo"
            tooltip="Iniciar novo processo de recuperação"
          />
          
          <ButtonEffect
            onClick={onImportData}
            icon={<Upload className="h-4 w-4" />}
            label="Importar Dados"
            tooltip="Importar dados para análise"
            variant="outline"
          />
          
          <ButtonEffect
            onClick={onRunCalculation}
            icon={<Calculator className="h-4 w-4" />}
            label="Executar Cálculos"
            tooltip="Executar cálculos para processos pendentes"
            variant="outline"
          />
        </div>
      </div>
      
      {!activeClient && (
        <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800 dark:text-amber-400">Cliente não selecionado</h3>
                <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
                  Selecione um cliente ativo na barra superior para vincular as ações neste módulo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default IRRFHeader;
