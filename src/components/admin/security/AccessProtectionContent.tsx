
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { Shield, ShieldAlert, LogIn, RefreshCw, Lock, UserX, Globe, AlertCircle, Clock, KeyRound } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const AccessProtectionContent: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [ipBlockingEnabled, setIpBlockingEnabled] = useState(true);
  const [loginAttemptsLimit, setLoginAttemptsLimit] = useState('5');
  const [blockDuration, setBlockDuration] = useState('30');
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);
  const [geolocationProtection, setGeolocationProtection] = useState(true);
  const [allowedCountries, setAllowedCountries] = useState(['BR']);

  const handleSaveSettings = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Configurações de proteção salvas com sucesso");
    }, 1000);
  };

  const handleClearBlockedIPs = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Lista de IPs bloqueados foi limpa com sucesso");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Proteção de Acesso</h2>
        <p className="text-muted-foreground">
          Configure as proteções contra tentativas de acesso indevido e alertas de segurança
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Proteção de Acesso</CardTitle>
            <CardDescription>
              Configure limites de tentativas de login e bloqueio automático
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="ip-blocking" className="font-medium">Bloqueio de IP</Label>
                <span className="text-sm text-muted-foreground">
                  Bloqueia IPs após múltiplas tentativas de login inválidas
                </span>
              </div>
              <Switch
                id="ip-blocking"
                checked={ipBlockingEnabled}
                onCheckedChange={setIpBlockingEnabled}
              />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-attempts">Limite de tentativas de login</Label>
                <Select
                  value={loginAttemptsLimit}
                  onValueChange={setLoginAttemptsLimit}
                  disabled={!ipBlockingEnabled}
                >
                  <SelectTrigger id="login-attempts">
                    <SelectValue placeholder="Selecione um limite" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 tentativas</SelectItem>
                    <SelectItem value="5">5 tentativas</SelectItem>
                    <SelectItem value="10">10 tentativas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="block-duration">Duração do bloqueio</Label>
                <Select
                  value={blockDuration}
                  onValueChange={setBlockDuration}
                  disabled={!ipBlockingEnabled}
                >
                  <SelectTrigger id="block-duration">
                    <SelectValue placeholder="Selecione a duração" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="1440">24 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="email-alerts" className="font-medium">Alertas por E-mail</Label>
                <span className="text-sm text-muted-foreground">
                  Envia alertas por e-mail para tentativas suspeitas de login
                </span>
              </div>
              <Switch
                id="email-alerts"
                checked={emailAlertsEnabled}
                onCheckedChange={setEmailAlertsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="geolocation" className="font-medium">Proteção por Geolocalização</Label>
                <span className="text-sm text-muted-foreground">
                  Restringe acesso com base na localização geográfica
                </span>
              </div>
              <Switch
                id="geolocation"
                checked={geolocationProtection}
                onCheckedChange={setGeolocationProtection}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="allowed-countries">Países Permitidos</Label>
              <Select
                value={allowedCountries[0]}
                onValueChange={(value) => setAllowedCountries([value])}
                disabled={!geolocationProtection}
              >
                <SelectTrigger id="allowed-countries" className="w-full">
                  <SelectValue placeholder="Selecione os países" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BR">Brasil</SelectItem>
                  <SelectItem value="US">Estados Unidos</SelectItem>
                  <SelectItem value="PT">Portugal</SelectItem>
                  <SelectItem value="ALL">Todos os países</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSaveSettings} 
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Monitoramento de Atividade</CardTitle>
            <CardDescription>
              Visualize tentativas recentes de login e IPs bloqueados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Tentativas de Login Recentes</h3>
              <div className="border rounded-md overflow-hidden">
                <div className="max-h-44 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-2 text-left font-medium">Data/Hora</th>
                        <th className="p-2 text-left font-medium">IP</th>
                        <th className="p-2 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-2">29/06/2023 10:45</td>
                        <td className="p-2">187.54.120.133</td>
                        <td className="p-2">
                          <Badge variant="success" className="bg-green-500/20 text-green-700">
                            Sucesso
                          </Badge>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2">29/06/2023 09:32</td>
                        <td className="p-2">187.54.120.133</td>
                        <td className="p-2">
                          <Badge variant="success" className="bg-green-500/20 text-green-700">
                            Sucesso
                          </Badge>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2">28/06/2023 16:20</td>
                        <td className="p-2">45.178.56.98</td>
                        <td className="p-2">
                          <Badge variant="destructive" className="bg-red-500/20 text-red-700">
                            Falha
                          </Badge>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2">28/06/2023 16:18</td>
                        <td className="p-2">45.178.56.98</td>
                        <td className="p-2">
                          <Badge variant="destructive" className="bg-red-500/20 text-red-700">
                            Falha
                          </Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">IPs Atualmente Bloqueados</h3>
              <div className="border rounded-md overflow-hidden">
                <div className="max-h-44 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-2 text-left font-medium">IP</th>
                        <th className="p-2 text-left font-medium">Razão</th>
                        <th className="p-2 text-left font-medium">Bloqueado até</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-2">45.178.56.98</td>
                        <td className="p-2">Múltiplas falhas</td>
                        <td className="p-2">29/06/2023 16:50</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-2">190.23.45.67</td>
                        <td className="p-2">Acesso suspeito</td>
                        <td className="p-2">30/06/2023 08:15</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClearBlockedIPs}
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
                    <UserX className="mr-2 h-4 w-4" />
                    Limpar IPs Bloqueados
                  </>
                )}
              </Button>
            </div>
            
            <div className="rounded-md border p-4 bg-amber-500/10">
              <div className="flex space-x-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-amber-700">
                    Recomendação de Segurança
                  </p>
                  <p className="text-xs text-amber-800">
                    Habilitar a autenticação em dois fatores (2FA) aumenta significativamente a segurança da sua conta.
                  </p>
                  <p className="text-xs">
                    <Button 
                      variant="link" 
                      className="h-auto p-0 text-amber-700"
                      onClick={() => window.location.href = '/admin/two_factor_auth'}
                    >
                      Configurar 2FA
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configurações Avançadas de Segurança</CardTitle>
          <CardDescription>
            Ajustes de proteção adicionais para garantir a segurança do seu sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <Lock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="text-sm font-medium">Complexidade de Senha</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Exigir senhas complexas com caracteres especiais, números e letras maiúsculas.
                </p>
                <div className="mt-2">
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="text-sm font-medium">Expiração de Senha</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Solicitar mudança de senha a cada 90 dias para maior segurança.
                </p>
                <div className="mt-2">
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <KeyRound className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="text-sm font-medium">Acesso por IP</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Restringir o acesso administrativo a IPs específicos de confiança.
                </p>
                <div className="mt-2">
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessProtectionContent;
