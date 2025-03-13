
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Info, Key, QrCode, Shield, Smartphone } from 'lucide-react';

const TwoFactorAuthPanel: React.FC = () => {
  const { toast } = useToast();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [setupStep, setSetupStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [recoveryCodesCopied, setRecoveryCodesCopied] = useState(false);
  
  const mockRecoveryCodes = [
    'A1B2C3D4E5F6',
    'G7H8I9J0K1L2',
    'M3N4O5P6Q7R8',
    'S9T0U1V2W3X4',
    'Y5Z6A7B8C9D0'
  ];

  const handleToggle2FA = () => {
    if (!is2FAEnabled) {
      // When enabling 2FA
      setSetupStep(1);
    } else {
      // When disabling 2FA
      toast({
        title: "Autenticação de dois fatores desativada",
        description: "A autenticação de dois fatores foi desativada com sucesso.",
      });
    }
    setIs2FAEnabled(!is2FAEnabled);
  };

  const handleGenerateQR = () => {
    setSetupStep(2);
    toast({
      title: "QR Code gerado",
      description: "Escaneie o QR Code com seu aplicativo autenticador.",
    });
  };

  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Código inválido",
        description: "O código deve ter 6 dígitos.",
        variant: "destructive"
      });
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      setSetupStep(3);
      toast({
        title: "Código verificado com sucesso",
        description: "A autenticação de dois fatores foi configurada.",
      });
    }, 1500);
  };

  const handleCopyRecoveryCodes = () => {
    navigator.clipboard.writeText(mockRecoveryCodes.join('\n'));
    setRecoveryCodesCopied(true);
    toast({
      title: "Códigos de recuperação copiados",
      description: "Guarde-os em um local seguro.",
    });
  };

  const handleFinishSetup = () => {
    toast({
      title: "Configuração concluída",
      description: "A autenticação de dois fatores está ativada em sua conta.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Autenticação de Dois Fatores</h2>
          <p className="text-muted-foreground">Configure uma camada extra de segurança para sua conta</p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="enable-2fa" className="font-medium">
            {is2FAEnabled ? 'Ativada' : 'Desativada'}
          </Label>
          <Switch 
            id="enable-2fa" 
            checked={is2FAEnabled} 
            onCheckedChange={handleToggle2FA} 
          />
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Proteção adicional</AlertTitle>
        <AlertDescription>
          A autenticação de dois fatores adiciona uma camada extra de segurança à sua conta, exigindo 
          um código exclusivo do seu aplicativo autenticador além da sua senha.
        </AlertDescription>
      </Alert>

      {is2FAEnabled && (
        <Card>
          <CardHeader>
            <CardTitle>Configuração de Autenticação de Dois Fatores</CardTitle>
            <CardDescription>Siga os passos abaixo para configurar a autenticação de dois fatores em sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                  setupStep >= 1 ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground text-muted-foreground'
                }`}>
                  1
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">Baixe um aplicativo autenticador</h4>
                  <p className="text-sm text-muted-foreground">
                    Recomendamos o Google Authenticator, Microsoft Authenticator ou Authy.
                  </p>
                  {setupStep === 1 && (
                    <Button className="mt-2" onClick={handleGenerateQR}>
                      <Smartphone className="mr-2 h-4 w-4" />
                      Tenho um aplicativo instalado
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                  setupStep >= 2 ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground text-muted-foreground'
                }`}>
                  2
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">Escaneie o QR code</h4>
                  <p className="text-sm text-muted-foreground">
                    Abra seu aplicativo autenticador e escaneie o QR code abaixo.
                  </p>
                  
                  {setupStep >= 2 && (
                    <div className="mt-4 p-4 border rounded-md flex flex-col items-center">
                      <div className="bg-muted p-8 rounded-md mb-4">
                        <QrCode className="h-32 w-32" />
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        Ou insira este código manualmente no aplicativo:
                      </p>
                      <div className="flex items-center gap-2 font-mono">
                        <code className="bg-muted p-2 rounded">ABCD EFGH IJKL MNOP</code>
                        <Button variant="ghost" size="icon" onClick={() => {
                          navigator.clipboard.writeText('ABCD EFGH IJKL MNOP');
                          toast({
                            title: "Código copiado",
                            description: "O código foi copiado para a área de transferência.",
                          });
                        }}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="mt-4 w-full">
                        <Label htmlFor="verification-code">Digite o código do aplicativo</Label>
                        <div className="flex gap-2 mt-1">
                          <Input 
                            id="verification-code" 
                            placeholder="123456" 
                            maxLength={6}
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                          />
                          <Button onClick={handleVerifyCode} disabled={isVerifying}>
                            {isVerifying ? 'Verificando...' : 'Verificar'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                  setupStep >= 3 ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground text-muted-foreground'
                }`}>
                  3
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">Salve os códigos de recuperação</h4>
                  <p className="text-sm text-muted-foreground">
                    Guarde estes códigos em um local seguro para recuperar o acesso à sua conta caso perca seu dispositivo.
                  </p>
                  
                  {setupStep >= 3 && (
                    <div className="mt-4 p-4 border rounded-md">
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {mockRecoveryCodes.map((code, index) => (
                          <code key={index} className="bg-muted p-2 rounded font-mono text-xs">
                            {code}
                          </code>
                        ))}
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={handleCopyRecoveryCodes}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          {recoveryCodesCopied ? 'Códigos Copiados' : 'Copiar Códigos'}
                        </Button>
                        
                        <Button onClick={handleFinishSetup}>
                          <Shield className="mr-2 h-4 w-4" />
                          Concluir Configuração
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Suas sessões ativas</CardTitle>
          <CardDescription>Dispositivos e locais onde sua conta está conectada</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { device: 'MacBook Pro', location: 'São Paulo, Brasil', lastActive: 'Agora', browser: 'Chrome' },
              { device: 'iPhone 13', location: 'São Paulo, Brasil', lastActive: '1 hora atrás', browser: 'Safari' },
              { device: 'Windows PC', location: 'Rio de Janeiro, Brasil', lastActive: '2 dias atrás', browser: 'Firefox' }
            ].map((session, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h4 className="font-medium">{session.device}</h4>
                  <p className="text-sm text-muted-foreground">{session.browser} • {session.location}</p>
                  <p className="text-xs text-muted-foreground">Ativo: {session.lastActive}</p>
                </div>
                {index === 0 ? (
                  <div className="text-sm text-green-600 font-medium">
                    Sessão atual
                  </div>
                ) : (
                  <Button variant="outline" size="sm">
                    Encerrar
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" size="sm">
            Encerrar Todas as Outras Sessões
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TwoFactorAuthPanel;
