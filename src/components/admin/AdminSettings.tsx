import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Check, AlarmClock, Globe, Shield, Bell, Key, Mail, Building, User, PenLine } from 'lucide-react';
import { DollarSign, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSettings = ({ user }: { user?: any }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('Sistemas Claudio Figueiredo');
  const [adminEmail, setAdminEmail] = useState(user?.email || 'admin@sistemasclaudio.com');
  const [siteUrl, setSiteUrl] = useState('https://sistemasclaudio.com');
  const [darkMode, setDarkMode] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const handleSaveGeneral = () => {
    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Configurações salvas",
        description: "As configurações gerais foram atualizadas com sucesso.",
        variant: "default",
      });
    }, 1000);
  };

  const handleUpdatePassword = async () => {
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setPasswordError('As senhas não coincidem');
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    setPasswordError('');
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi atualizada com sucesso.",
        variant: "default",
      });
      
      // Clear the form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar senha",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotifications = () => {
    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Preferências atualizadas",
        description: "Suas preferências de notificação foram salvas.",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas preferências e configurações do sistema</p>
      </motion.div>
      
      <Tabs defaultValue="general" className="w-full">
        <motion.div variants={itemVariants}>
          <TabsList className="grid grid-cols-3 sm:w-auto w-full max-w-md mb-6">
            <TabsTrigger value="general" className="flex items-center justify-center">
              <PenLine className="h-4 w-4 mr-2 hidden sm:inline-block" />
              <span>Geral</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center justify-center">
              <Shield className="h-4 w-4 mr-2 hidden sm:inline-block" />
              <span>Segurança</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center justify-center">
              <Bell className="h-4 w-4 mr-2 hidden sm:inline-block" />
              <span>Notificações</span>
            </TabsTrigger>
          </TabsList>
        </motion.div>
        
        <TabsContent value="general" className="mt-0">
          <motion.div variants={itemVariants}>
            <Card className="border-primary/5">
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>
                  Gerencie as configurações gerais do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-primary" />
                    <Label htmlFor="company-name">Nome da Empresa</Label>
                  </div>
                  <Input 
                    id="company-name" 
                    value={companyName} 
                    onChange={(e) => setCompanyName(e.target.value)} 
                    className="border-primary/20 focus-visible:ring-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <Label htmlFor="admin-email">Email do Administrador</Label>
                  </div>
                  <Input 
                    id="admin-email" 
                    value={adminEmail} 
                    onChange={(e) => setAdminEmail(e.target.value)} 
                    className="border-primary/20 focus-visible:ring-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <Label htmlFor="site-url">URL do Site</Label>
                  </div>
                  <Input 
                    id="site-url" 
                    value={siteUrl} 
                    onChange={(e) => setSiteUrl(e.target.value)} 
                    className="border-primary/20 focus-visible:ring-primary"
                  />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode" className="text-base">Modo Escuro</Label>
                    <p className="text-sm text-muted-foreground">
                      Ativar tema escuro para todo o painel
                    </p>
                  </div>
                  <Switch 
                    id="dark-mode" 
                    checked={darkMode} 
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveGeneral} 
                  disabled={isLoading}
                  className="relative overflow-hidden group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <div className="relative z-10 flex items-center">
                        <Check className="mr-2 h-4 w-4" />
                        Salvar Alterações
                      </div>
                      <span className="absolute inset-0 h-full w-0 bg-primary/20 group-hover:w-full transition-all duration-300 ease-in-out -z-0"></span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="security" className="mt-0">
          <motion.div variants={itemVariants}>
            <Card className="border-primary/5">
              <CardHeader>
                <CardTitle>Configurações de Segurança</CardTitle>
                <CardDescription>
                  Gerencie as configurações de segurança do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-primary" />
                    <Label htmlFor="current-password">Senha Atual</Label>
                  </div>
                  <Input 
                    id="current-password" 
                    type="password" 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="border-primary/20 focus-visible:ring-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-primary" />
                    <Label htmlFor="new-password">Nova Senha</Label>
                  </div>
                  <Input 
                    id="new-password" 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border-primary/20 focus-visible:ring-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-primary" />
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  </div>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-primary/20 focus-visible:ring-primary"
                  />
                </div>
                
                {passwordError && (
                  <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
                    {passwordError}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor" className="text-base">Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-muted-foreground">
                      Ativar autenticação de dois fatores para maior segurança
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleUpdatePassword} 
                  disabled={isLoading}
                  className="relative overflow-hidden group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Atualizando...
                    </>
                  ) : (
                    <>
                      <div className="relative z-10 flex items-center">
                        <Key className="mr-2 h-4 w-4" />
                        Atualizar Senha
                      </div>
                      <span className="absolute inset-0 h-full w-0 bg-primary/20 group-hover:w-full transition-all duration-300 ease-in-out -z-0"></span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-0">
          <motion.div variants={itemVariants}>
            <Card className="border-primary/5">
              <CardHeader>
                <CardTitle>Configurações de Notificações</CardTitle>
                <CardDescription>
                  Gerencie suas preferências de notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: "new-users", title: "Novos Usuários", desc: "Receber notificações sobre novos usuários cadastrados", icon: <User className="h-4 w-4 text-primary" /> },
                  { id: "financial", title: "Atividades Financeiras", desc: "Receber notificações sobre transações financeiras", icon: <DollarSign className="h-4 w-4 text-primary" /> },
                  { id: "reports", title: "Relatórios", desc: "Receber notificações sobre novos relatórios gerados", icon: <FileText className="h-4 w-4 text-primary" /> },
                  { id: "system", title: "Atualizações do Sistema", desc: "Receber notificações sobre atualizações do sistema", icon: <Globe className="h-4 w-4 text-primary" /> },
                  { id: "events", title: "Eventos", desc: "Receber notificações sobre eventos agendados", icon: <AlarmClock className="h-4 w-4 text-primary" /> }
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between px-2 py-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5">{item.icon}</div>
                      <div className="space-y-0.5">
                        <Label htmlFor={`notification-${item.id}`} className="text-base font-medium cursor-pointer">
                          {item.title}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <Switch 
                      id={`notification-${item.id}`} 
                      defaultChecked={item.id !== "events"} 
                    />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveNotifications} 
                  disabled={isLoading}
                  className="relative overflow-hidden group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <div className="relative z-10 flex items-center">
                        <Check className="mr-2 h-4 w-4" />
                        Salvar Preferências
                      </div>
                      <span className="absolute inset-0 h-full w-0 bg-primary/20 group-hover:w-full transition-all duration-300 ease-in-out -z-0"></span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AdminSettings;
