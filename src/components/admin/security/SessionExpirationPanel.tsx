
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, LogOut, RefreshCw, TimerReset } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

const SessionExpirationPanel: React.FC = () => {
  const { toast } = useToast();
  const [autoLogoutEnabled, setAutoLogoutEnabled] = useState(true);
  const [inactivityTimeout, setInactivityTimeout] = useState(30);
  const [maxSessionDuration, setMaxSessionDuration] = useState(8);
  const [remoteLogoutStrategy, setRemoteLogoutStrategy] = useState('instant');
  const [isConfigSaving, setIsConfigSaving] = useState(false);

  const handleSaveConfig = () => {
    setIsConfigSaving(true);
    
    // Simulate saving configuration
    setTimeout(() => {
      setIsConfigSaving(false);
      toast({
        title: "Configurações salvas",
        description: "As configurações de expiração de sessão foram atualizadas.",
      });
    }, 1500);
  };

  const handleTestLogout = () => {
    toast({
      title: "Teste de logout",
      description: "Uma sessão do seu teste será encerrada em 5 segundos.",
    });
    
    setTimeout(() => {
      toast({
        title: "Sessão de teste encerrada",
        description: "O teste de logout remoto foi concluído com sucesso.",
      });
    }, 5000);
  };

  const handleForceLogoutAll = () => {
    toast({
      title: "Todas as sessões encerradas",
      description: "Todos os usuários terão que fazer login novamente.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Expiração de Sessão</h2>
          <p className="text-muted-foreground">Configure o comportamento e tempo de expiração das sessões</p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="auto-logout" className="font-medium">
            {autoLogoutEnabled ? 'Ativado' : 'Desativado'}
          </Label>
          <Switch 
            id="auto-logout" 
            checked={autoLogoutEnabled} 
            onCheckedChange={setAutoLogoutEnabled} 
          />
        </div>
      </div>

      <Alert>
        <Clock className="h-4 w-4" />
        <AlertTitle>Configuração de Sessão Ativa</AlertTitle>
        <AlertDescription>
          {autoLogoutEnabled ? 
            "As sessões irão expirar automaticamente após o período de inatividade configurado." :
            "As sessões não expirarão automaticamente. Isto pode representar um risco de segurança."}
        </AlertDescription>
      </Alert>

      {autoLogoutEnabled && (
        <Card>
          <CardHeader>
            <CardTitle>Timeout por Inatividade</CardTitle>
            <CardDescription>Encerra a sessão após um período de inatividade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="inactivity-timeout">Tempo de inatividade (minutos)</Label>
                  <span className="text-sm font-medium">{inactivityTimeout} min</span>
                </div>
                <Slider 
                  id="inactivity-timeout"
                  min={5}
                  max={60}
                  step={5}
                  value={[inactivityTimeout]}
                  onValueChange={(value) => setInactivityTimeout(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 min</span>
                  <span>60 min</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {autoLogoutEnabled && (
        <Card>
          <CardHeader>
            <CardTitle>Tempo Máximo de Sessão</CardTitle>
            <CardDescription>Define por quanto tempo uma sessão pode permanecer ativa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="max-session">Duração máxima (horas)</Label>
                  <span className="text-sm font-medium">{maxSessionDuration} horas</span>
                </div>
                <Slider 
                  id="max-session"
                  min={1}
                  max={24}
                  step={1}
                  value={[maxSessionDuration]}
                  onValueChange={(value) => setMaxSessionDuration(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 hora</span>
                  <span>24 horas</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Logout Remoto</CardTitle>
          <CardDescription>Configure como os administradores podem encerrar sessões remotamente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="logout-strategy">Estratégia de Logout</Label>
                <Select value={remoteLogoutStrategy} onValueChange={setRemoteLogoutStrategy}>
                  <SelectTrigger id="logout-strategy">
                    <SelectValue placeholder="Selecione uma estratégia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instant">Imediato</SelectItem>
                    <SelectItem value="next-request">Na próxima requisição</SelectItem>
                    <SelectItem value="graceful">Com período de carência (5 min)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <Button variant="outline" onClick={handleTestLogout}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Testar Logout Remoto
              </Button>
              <Button variant="destructive" onClick={handleForceLogoutAll}>
                <LogOut className="mr-2 h-4 w-4" />
                Forçar Logout de Todos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Agendamento de Expiração</CardTitle>
          <CardDescription>Configure horários específicos para expiração automática das sessões</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch id="weekend-logout" />
                <Label htmlFor="weekend-logout">
                  Logout automático nos finais de semana
                </Label>
              </div>
              <Select defaultValue="19">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="17">17:00</SelectItem>
                  <SelectItem value="18">18:00</SelectItem>
                  <SelectItem value="19">19:00</SelectItem>
                  <SelectItem value="20">20:00</SelectItem>
                  <SelectItem value="21">21:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch id="daily-logout" defaultChecked />
                <Label htmlFor="daily-logout">
                  Logout diário no horário
                </Label>
              </div>
              <Select defaultValue="22">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="22">22:00</SelectItem>
                  <SelectItem value="23">23:00</SelectItem>
                  <SelectItem value="0">00:00</SelectItem>
                  <SelectItem value="1">01:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Redefinir Padrões</Button>
          <Button onClick={handleSaveConfig} disabled={isConfigSaving}>
            {isConfigSaving ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SessionExpirationPanel;
