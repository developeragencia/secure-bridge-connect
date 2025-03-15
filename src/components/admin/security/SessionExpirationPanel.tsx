
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, RefreshCw, LogOut, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const SessionExpirationPanel: React.FC = () => {
  const [expirationTime, setExpirationTime] = useState('30');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSaveSettings = () => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast("Configurações salvas", {
        description: `Tempo de expiração de sessão definido para ${expirationTime} minutos.`
      });
    }, 1000);
  };

  const handleEndAllSessions = () => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast("Sessões encerradas", {
        description: "Todas as sessões ativas foram encerradas com sucesso."
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Expiração de Sessão</h2>
        <p className="text-muted-foreground">
          Configure o tempo de expiração de sessão e gerencie sessões ativas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tempo de Expiração</CardTitle>
            <CardDescription>
              Configure quanto tempo uma sessão pode ficar inativa antes de expirar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <RadioGroup 
                value={expirationTime} 
                onValueChange={setExpirationTime}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="15" id="r1" />
                  <Label htmlFor="r1" className="font-normal">15 minutos (recomendado)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="30" id="r2" />
                  <Label htmlFor="r2" className="font-normal">30 minutos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="60" id="r3" />
                  <Label htmlFor="r3" className="font-normal">1 hora</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="240" id="r4" />
                  <Label htmlFor="r4" className="font-normal">4 horas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="480" id="r5" />
                  <Label htmlFor="r5" className="font-normal">8 horas</Label>
                </div>
              </RadioGroup>
              
              <Button onClick={handleSaveSettings} disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Clock className="mr-2 h-4 w-4" />
                    Salvar Configurações
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Sessões</CardTitle>
            <CardDescription>
              Visualize e gerencie as sessões ativas em sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <div>
                    <h4 className="font-medium">Windows 11 • Chrome</h4>
                    <p className="text-xs text-muted-foreground">
                      São Paulo, Brasil • Há 2 minutos
                    </p>
                  </div>
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                </div>
                
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <div>
                    <h4 className="font-medium">macOS • Safari</h4>
                    <p className="text-xs text-muted-foreground">
                      Rio de Janeiro, Brasil • Há 3 dias
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <LogOut className="h-3.5 w-3.5" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <div>
                    <h4 className="font-medium">iOS 16 • Mobile App</h4>
                    <p className="text-xs text-muted-foreground">
                      Brasília, Brasil • Há 1 semana
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <LogOut className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleEndAllSessions} 
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    Encerrar Todas as Outras Sessões
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SessionExpirationPanel;
