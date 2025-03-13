
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ImportSettingsForm = () => {
  const [directory, setDirectory] = React.useState("/imports/operational");
  const [defaultFormat, setDefaultFormat] = React.useState("XML");
  const [validation, setValidation] = React.useState("Ativada");
  const [schedule, setSchedule] = React.useState("Manual");
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de importação foram salvas com sucesso.",
      variant: "success"
    });
  };

  return (
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
            <Input 
              placeholder="/imports/operational" 
              value={directory}
              onChange={(e) => setDirectory(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Formato Padrão</label>
            <Input 
              placeholder="XML" 
              value={defaultFormat}
              onChange={(e) => setDefaultFormat(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Validação Automática</label>
            <select 
              className="w-full p-2 rounded-md border"
              value={validation}
              onChange={(e) => setValidation(e.target.value)}
            >
              <option>Ativada</option>
              <option>Desativada</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Agendamento</label>
            <select 
              className="w-full p-2 rounded-md border"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
            >
              <option>Manual</option>
              <option>Diário</option>
              <option>Semanal</option>
              <option>Mensal</option>
            </select>
          </div>
        </div>
        
        <Button 
          className="w-full md:w-auto flex items-center gap-2" 
          onClick={handleSaveSettings}
        >
          <Save className="h-4 w-4" />
          Salvar Configurações
        </Button>
      </CardContent>
    </Card>
  );
};

export default ImportSettingsForm;
