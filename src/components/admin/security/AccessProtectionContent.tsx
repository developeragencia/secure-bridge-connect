
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, Fingerprint, Lock, Save, Shield, Users } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

const AccessProtectionContent: React.FC = () => {
  const { toast } = useToast();
  const [isIPRestrictionEnabled, setIsIPRestrictionEnabled] = useState(false);
  const [isAdvancedEnabled, setIsAdvancedEnabled] = useState(true);
  const [isConfigSaving, setIsConfigSaving] = useState(false);

  const handleSaveConfig = () => {
    setIsConfigSaving(true);
    
    // Simulate saving configuration
    setTimeout(() => {
      setIsConfigSaving(false);
      toast({
        title: "Configurações salvas",
        description: "As configurações de proteção de acesso foram atualizadas com sucesso.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">Proteção de Acessos</h1>
          <p className="text-muted-foreground">Configure proteções avançadas para garantir a segurança do sistema</p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Proteção Avançada Ativa</AlertTitle>
        <AlertDescription>
          O sistema está utilizando proteções avançadas contra tentativas de acesso não autorizado.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="ip-restrictions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ip-restrictions" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Restrições de IP</span>
          </TabsTrigger>
          <TabsTrigger value="login-protection" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Proteção de Login</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Permissões</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ip-restrictions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Restrições de IP</CardTitle>
                  <CardDescription>Limite o acesso ao sistema por endereços IP específicos</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="ip-restriction" className="font-medium">
                    {isIPRestrictionEnabled ? 'Ativado' : 'Desativado'}
                  </Label>
                  <Switch 
                    id="ip-restriction" 
                    checked={isIPRestrictionEnabled} 
                    onCheckedChange={setIsIPRestrictionEnabled} 
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isIPRestrictionEnabled ? (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="ip-list">Lista de IPs permitidos</Label>
                      <textarea 
                        id="ip-list" 
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-32 mt-1"
                        placeholder="200.168.1.1&#10;200.168.1.2&#10;200.168.1.3"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="ip-range">Faixas de IP permitidas</Label>
                      <textarea 
                        id="ip-range" 
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-32 mt-1"
                        placeholder="192.168.1.0/24&#10;10.0.0.0/16"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Política para IPs não listados</Label>
                    <Select defaultValue="block">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione uma política" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="block">Bloquear todos</SelectItem>
                        <SelectItem value="allow">Permitir todos</SelectItem>
                        <SelectItem value="2fa">Exigir 2FA adicional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="p-4 border border-dashed rounded-md text-center text-muted-foreground">
                  <p>As restrições de IP estão desativadas. Ative-as para aumentar a segurança.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Acesso Recente por IP</CardTitle>
              <CardDescription>Últimos acessos registrados no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>IP</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { ip: "189.28.242.105", location: "São Paulo, BR", user: "admin@sistemasclaudio.com", time: "Hoje, 10:45", status: "Sucesso" },
                    { ip: "200.168.1.15", location: "Rio de Janeiro, BR", user: "manager@sistemasclaudio.com", time: "Hoje, 09:12", status: "Sucesso" },
                    { ip: "45.233.100.98", location: "Belo Horizonte, BR", user: "financeiro@sistemasclaudio.com", time: "Ontem, 16:30", status: "Sucesso" },
                    { ip: "104.28.97.175", location: "Fortaleza, BR", user: "carlos@cliente.com", time: "20/10/2023, 14:22", status: "Bloqueado" }
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono">{row.ip}</TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{row.user}</TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell className={row.status === "Bloqueado" ? "text-destructive" : "text-green-600"}>
                        {row.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="login-protection" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Proteção Avançada de Login</CardTitle>
                  <CardDescription>Configurações para detectar e prevenir tentativas de acesso suspeitas</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="advanced-protection" className="font-medium">
                    {isAdvancedEnabled ? 'Ativado' : 'Desativado'}
                  </Label>
                  <Switch 
                    id="advanced-protection" 
                    checked={isAdvancedEnabled} 
                    onCheckedChange={setIsAdvancedEnabled} 
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="max-attempts">Máximo de tentativas de login</Label>
                  <Select defaultValue="5">
                    <SelectTrigger id="max-attempts" className="mt-1">
                      <SelectValue placeholder="Selecione o limite" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 tentativas</SelectItem>
                      <SelectItem value="5">5 tentativas</SelectItem>
                      <SelectItem value="10">10 tentativas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="lockout-time">Tempo de bloqueio</Label>
                  <Select defaultValue="15">
                    <SelectTrigger id="lockout-time" className="mt-1">
                      <SelectValue placeholder="Selecione o tempo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutos</SelectItem>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="captcha" defaultChecked />
                <Label htmlFor="captcha" className="font-medium">
                  Habilitar CAPTCHA após tentativas falhas
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="notify-admin" defaultChecked />
                <Label htmlFor="notify-admin" className="font-medium">
                  Notificar administrador sobre tentativas suspeitas
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="progressive-delay" defaultChecked />
                <Label htmlFor="progressive-delay" className="font-medium">
                  Aplicar atraso progressivo em tentativas sucessivas
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="device-verification" defaultChecked />
                <Label htmlFor="device-verification" className="font-medium">
                  Verificação adicional para dispositivos não reconhecidos
                </Label>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tentativas de Acesso Bloqueadas</CardTitle>
              <CardDescription>Últimas tentativas de acesso que foram bloqueadas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { user: "carlos@cliente.com", ip: "104.28.97.175", time: "20/10/2023, 14:22", reason: "Excesso de tentativas" },
                    { user: "financeiro@sistemasclaudio.com", ip: "77.12.86.19", time: "18/10/2023, 09:56", reason: "IP suspeito" },
                    { user: "admin@sistemasclaudio.com", ip: "203.0.113.1", time: "15/10/2023, 22:30", reason: "Horário incomum" }
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.user}</TableCell>
                      <TableCell className="font-mono">{row.ip}</TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>{row.reason}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Desbloquear</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Permissões</CardTitle>
              <CardDescription>Defina quais grupos de usuários têm acesso a quais recursos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recurso</TableHead>
                    <TableHead>Administradores</TableHead>
                    <TableHead>Gerentes</TableHead>
                    <TableHead>Consultores</TableHead>
                    <TableHead>Clientes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { resource: "Gestão de Clientes", permissions: { admin: true, manager: true, consultant: false, client: false } },
                    { resource: "Créditos Tributários", permissions: { admin: true, manager: true, consultant: true, client: true } },
                    { resource: "Configurações de Segurança", permissions: { admin: true, manager: false, consultant: false, client: false } },
                    { resource: "Relatórios Fiscais", permissions: { admin: true, manager: true, consultant: true, client: false } },
                    { resource: "Importação de Dados", permissions: { admin: true, manager: true, consultant: false, client: false } }
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.resource}</TableCell>
                      <TableCell>
                        <Switch checked={row.permissions.admin} disabled />
                      </TableCell>
                      <TableCell>
                        <Switch checked={row.permissions.manager} />
                      </TableCell>
                      <TableCell>
                        <Switch checked={row.permissions.consultant} />
                      </TableCell>
                      <TableCell>
                        <Switch checked={row.permissions.client} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Redefinir Padrões</Button>
              <Button onClick={handleSaveConfig} disabled={isConfigSaving}>
                {isConfigSaving ? (
                  <>Salvando...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Configurações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccessProtectionContent;
