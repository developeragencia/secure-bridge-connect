
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const AdminSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Configurações salvas",
        description: "As alterações foram salvas com sucesso.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Gerenciar as configurações gerais do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nome da Empresa</Label>
                <Input id="company-name" defaultValue="Sistemas Claudio Figueiredo" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email do Administrador</Label>
                <Input id="admin-email" defaultValue="admin@sistemasclaudio.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-url">URL do Site</Label>
                <Input id="site-url" defaultValue="https://sistemasclaudio.com" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Modo Escuro</Label>
                  <p className="text-sm text-muted-foreground">
                    Ativar tema escuro para todo o painel
                  </p>
                </div>
                <Switch id="dark-mode" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar Alterações"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>
                Gerenciar as configurações de segurança do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input id="confirm-password" type="password" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">
                    Ativar autenticação de dois fatores para maior segurança
                  </p>
                </div>
                <Switch id="two-factor" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Atualizar Senha"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>
                Gerenciar suas preferências de notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Novos Usuários", "Atividades Financeiras", "Relatórios", "Atualizações do Sistema", "Eventos"].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={`notification-${item.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receber notificações sobre {item.toLowerCase()}
                    </p>
                  </div>
                  <Switch id={`notification-${item.toLowerCase().replace(/\s+/g, '-')}`} defaultChecked={item !== "Eventos"} />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar Preferências"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
