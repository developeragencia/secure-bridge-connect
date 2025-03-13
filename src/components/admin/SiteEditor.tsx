
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Loader2, Check, AlarmClock, Globe, Edit, 
  Image, FileText, Layout, Palette, Phone,
  Mail, Building, CheckCircle, Construction, 
  Wrench, AlertCircle, Timer, ShieldAlert
} from 'lucide-react';

const SiteEditor = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [siteName, setSiteName] = useState('Sistemas Claudio Figueiredo');
  const [siteDescription, setSiteDescription] = useState('Desenvolvimento de Sistemas e Websites');
  const [primaryColor, setPrimaryColor] = useState('#6E59A5');
  const [logoUrl, setLogoUrl] = useState('/favicon.svg');
  const [faviconUrl, setFaviconUrl] = useState('/favicon.ico');
  const [heroTitle, setHeroTitle] = useState('Transforme suas ideias em realidade');
  const [heroSubtitle, setHeroSubtitle] = useState('Desenvolvimento de sistemas personalizados para o seu negócio');
  const [contactEmail, setContactEmail] = useState('contato@sistemasclaudio.com');
  const [contactPhone, setContactPhone] = useState('(11) 99999-9999');
  const [contactAddress, setContactAddress] = useState('São Paulo, SP, Brasil');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('Estamos realizando manutenção em nosso sistema para melhorar sua experiência. Por favor, tente novamente mais tarde.');
  const [maintenanceEndDate, setMaintenanceEndDate] = useState(() => {
    // Default end date is 24 hours from now
    const date = new Date();
    date.setHours(date.getHours() + 24);
    return date.toISOString().slice(0, 16); // format for datetime-local input
  });
  const [featuresList, setFeaturesList] = useState([
    'Desenvolvimento Web',
    'Aplicativos Mobile',
    'Sistemas Personalizados',
    'Integrações com APIs',
    'Consultoria em TI',
    'Suporte Técnico'
  ]);
  
  // Check if maintenance mode is currently active from localStorage
  useEffect(() => {
    const savedMaintenanceMode = localStorage.getItem('maintenanceMode');
    const savedMaintenanceEndDate = localStorage.getItem('maintenanceEndDate');
    const savedMaintenanceMessage = localStorage.getItem('maintenanceMessage');
    
    if (savedMaintenanceMode === 'true') {
      setMaintenanceMode(true);
    }
    
    if (savedMaintenanceEndDate) {
      setMaintenanceEndDate(savedMaintenanceEndDate);
    }
    
    if (savedMaintenanceMessage) {
      setMaintenanceMessage(savedMaintenanceMessage);
    }
  }, []);

  const handleSaveGeneral = () => {
    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Configurações salvas",
        description: "As configurações do site foram atualizadas com sucesso.",
        variant: "default",
      });
    }, 1000);
  };

  const handleSaveAppearance = () => {
    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Aparência atualizada",
        description: "As configurações de aparência foram atualizadas com sucesso.",
        variant: "default",
      });
    }, 1000);
  };

  const handleSaveContent = () => {
    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Conteúdo atualizado",
        description: "O conteúdo do site foi atualizado com sucesso.",
        variant: "default",
      });
    }, 1000);
  };

  const handleSaveMaintenance = () => {
    setIsLoading(true);
    
    // Save maintenance settings to localStorage
    localStorage.setItem('maintenanceMode', maintenanceMode.toString());
    localStorage.setItem('maintenanceEndDate', maintenanceEndDate);
    localStorage.setItem('maintenanceMessage', maintenanceMessage);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: maintenanceMode ? "Modo de manutenção ativado" : "Modo de manutenção desativado",
        description: maintenanceMode 
          ? "O site está agora em modo de manutenção e os visitantes verão a página de manutenção." 
          : "O site está acessível normalmente para todos os visitantes.",
        variant: "default",
      });
    }, 1000);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...featuresList];
    newFeatures[index] = value;
    setFeaturesList(newFeatures);
  };

  const addFeature = () => {
    setFeaturesList([...featuresList, 'Nova funcionalidade']);
  };

  const removeFeature = (index) => {
    const newFeatures = [...featuresList];
    newFeatures.splice(index, 1);
    setFeaturesList(newFeatures);
  };

  const handleSaveContact = () => {
    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Contato atualizado",
        description: "As informações de contato foram atualizadas com sucesso.",
        variant: "default",
      });
    }, 1000);
  };

  // Calculate remaining time for maintenance
  const getMaintenanceTimeRemaining = () => {
    const endDate = new Date(maintenanceEndDate);
    const now = new Date();
    
    // If end date is in the past, return 0
    if (endDate <= now) {
      return { hours: 0, minutes: 0 };
    }
    
    const diffMs = endDate.getTime() - now.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours: diffHrs, minutes: diffMins };
  };

  const timeRemaining = getMaintenanceTimeRemaining();
  const endDateInPast = new Date(maintenanceEndDate) <= new Date();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Editor do Site</h1>
      <p className="text-muted-foreground">Personalize a aparência e o conteúdo do seu site</p>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="general">
            <Globe className="h-4 w-4 mr-2" />
            <span>Geral</span>
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" />
            <span>Aparência</span>
          </TabsTrigger>
          <TabsTrigger value="content">
            <FileText className="h-4 w-4 mr-2" />
            <span>Conteúdo</span>
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Phone className="h-4 w-4 mr-2" />
            <span>Contato</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance">
            <Construction className="h-4 w-4 mr-2" />
            <span>Manutenção</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Gerencie as configurações gerais do seu site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nome do Site</Label>
                <Input 
                  id="site-name" 
                  value={siteName} 
                  onChange={(e) => setSiteName(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-description">Descrição do Site</Label>
                <Textarea 
                  id="site-description" 
                  value={siteDescription} 
                  onChange={(e) => setSiteDescription(e.target.value)} 
                  rows={3}
                />
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-blog" className="text-base">Habilitar Blog</Label>
                  <p className="text-sm text-muted-foreground">
                    Exibir seção de blog no site
                  </p>
                </div>
                <Switch id="enable-blog" />
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-testimonials" className="text-base">Habilitar Depoimentos</Label>
                  <p className="text-sm text-muted-foreground">
                    Exibir seção de depoimentos no site
                  </p>
                </div>
                <Switch id="enable-testimonials" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSaveGeneral} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>
                Personalize a aparência do seu site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Cor Primária</Label>
                <div className="flex items-center gap-4">
                  <Input 
                    id="primary-color" 
                    type="color" 
                    value={primaryColor} 
                    onChange={(e) => setPrimaryColor(e.target.value)} 
                    className="w-24 h-10 p-1"
                  />
                  <div>
                    <span className="text-sm font-medium">Valor Hexadecimal: </span>
                    <span className="text-sm">{primaryColor}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo-url">URL do Logo</Label>
                <div className="flex gap-4">
                  <Input 
                    id="logo-url" 
                    value={logoUrl} 
                    onChange={(e) => setLogoUrl(e.target.value)} 
                  />
                  <Button variant="outline" size="icon">
                    <Image className="h-4 w-4" />
                  </Button>
                </div>
                {logoUrl && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm">Pré-visualização:</span>
                    <img src={logoUrl} alt="Logo" className="h-8" />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="favicon-url">URL do Favicon</Label>
                <div className="flex gap-4">
                  <Input 
                    id="favicon-url" 
                    value={faviconUrl} 
                    onChange={(e) => setFaviconUrl(e.target.value)} 
                  />
                  <Button variant="outline" size="icon">
                    <Image className="h-4 w-4" />
                  </Button>
                </div>
                {faviconUrl && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm">Pré-visualização:</span>
                    <img src={faviconUrl} alt="Favicon" className="h-6 w-6" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode" className="text-base">Tema Escuro</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilitar tema escuro no site
                  </p>
                </div>
                <Switch id="dark-mode" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSaveAppearance} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Salvar Aparência
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo</CardTitle>
              <CardDescription>
                Edite o conteúdo do seu site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Título do Hero</Label>
                <Input 
                  id="hero-title" 
                  value={heroTitle} 
                  onChange={(e) => setHeroTitle(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Subtítulo do Hero</Label>
                <Textarea 
                  id="hero-subtitle" 
                  value={heroSubtitle} 
                  onChange={(e) => setHeroSubtitle(e.target.value)} 
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Funcionalidades</Label>
                  <Button variant="outline" size="sm" onClick={addFeature}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
                <div className="space-y-2 mt-2">
                  {featuresList.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input 
                        value={feature} 
                        onChange={(e) => handleFeatureChange(index, e.target.value)} 
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeFeature(index)}>
                        <Layout className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSaveContent} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Salvar Conteúdo
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
              <CardDescription>
                Atualize as informações de contato exibidas no site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email de Contato</Label>
                <Input 
                  id="contact-email" 
                  type="email"
                  value={contactEmail} 
                  onChange={(e) => setContactEmail(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Telefone de Contato</Label>
                <Input 
                  id="contact-phone" 
                  value={contactPhone} 
                  onChange={(e) => setContactPhone(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-address">Endereço</Label>
                <Textarea 
                  id="contact-address" 
                  value={contactAddress} 
                  onChange={(e) => setContactAddress(e.target.value)} 
                  rows={2}
                />
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label htmlFor="show-contact-form" className="text-base">Exibir Formulário de Contato</Label>
                  <p className="text-sm text-muted-foreground">
                    Mostrar formulário de contato no site
                  </p>
                </div>
                <Switch id="show-contact-form" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label htmlFor="show-social-icons" className="text-base">Exibir Ícones Sociais</Label>
                  <p className="text-sm text-muted-foreground">
                    Mostrar ícones de redes sociais no site
                  </p>
                </div>
                <Switch id="show-social-icons" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSaveContact} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Salvar Informações
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="mt-0">
          <Card className={maintenanceMode ? "border-destructive/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]" : ""}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Construction className={`h-5 w-5 ${maintenanceMode ? "text-destructive" : "text-muted-foreground"}`} />
                <CardTitle>Modo de Manutenção</CardTitle>
              </div>
              <CardDescription>
                Ative o modo de manutenção para notificar os usuários sobre interrupções no serviço
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between bg-muted/40 p-4 rounded-lg">
                <div className="space-y-0.5 flex items-center gap-3">
                  {maintenanceMode ? (
                    <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Wrench className="h-5 w-5 text-destructive" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="maintenance-mode" className="text-base font-medium">
                      {maintenanceMode ? "Site em Manutenção" : "Site Operacional"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {maintenanceMode 
                        ? "Os visitantes serão redirecionados para a página de manutenção" 
                        : "O site está funcionando normalmente"}
                    </p>
                  </div>
                </div>
                <Switch 
                  id="maintenance-mode" 
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                  className={maintenanceMode ? "data-[state=checked]:bg-destructive" : ""}
                />
              </div>
              
              {maintenanceMode && (
                <div className="border border-destructive/20 rounded-lg p-4 bg-destructive/5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <span className="font-medium text-destructive">Atenção: Modo de manutenção ativo</span>
                  </div>
                  <p className="text-sm mb-3">
                    Quando ativado, todos os visitantes serão redirecionados para a página de manutenção. 
                    Apenas administradores terão acesso ao site completo.
                  </p>
                  
                  <div className="flex items-center gap-1.5 text-xs bg-white/80 dark:bg-black/20 px-3 py-1.5 rounded-md border border-destructive/10 text-muted-foreground">
                    <Timer className="h-3.5 w-3.5 text-destructive" />
                    <span>
                      {endDateInPast 
                        ? "Data de término no passado, atualize para um momento futuro" 
                        : `Restam aproximadamente ${timeRemaining.hours} horas e ${timeRemaining.minutes} minutos até o término programado`}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="maintenance-end">Data de Término da Manutenção</Label>
                <Input 
                  id="maintenance-end" 
                  type="datetime-local"
                  value={maintenanceEndDate}
                  onChange={(e) => setMaintenanceEndDate(e.target.value)}
                  className={endDateInPast ? "border-destructive" : ""}
                />
                {endDateInPast && (
                  <p className="text-xs text-destructive mt-1">
                    A data de término precisa ser no futuro
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maintenance-message">Mensagem de Manutenção</Label>
                <Textarea 
                  id="maintenance-message" 
                  value={maintenanceMessage}
                  onChange={(e) => setMaintenanceMessage(e.target.value)}
                  rows={3}
                  placeholder="Explique aos usuários o motivo da manutenção e quando o site retornará"
                />
              </div>
              
              <div className="space-y-2 mt-6">
                <Label className="text-base font-medium">Visualização da Mensagem</Label>
                <div className="bg-card border rounded-lg p-4 mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Site em Manutenção</h3>
                  </div>
                  <p className="text-muted-foreground">{maintenanceMessage}</p>
                </div>
              </div>
              
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSaveMaintenance} 
                disabled={isLoading}
                variant={maintenanceMode ? "destructive" : "default"}
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
                      {maintenanceMode ? (
                        <Construction className="mr-2 h-4 w-4" />
                      ) : (
                        <Check className="mr-2 h-4 w-4" />
                      )}
                      {maintenanceMode ? "Ativar Modo de Manutenção" : "Salvar Configurações"}
                    </div>
                    <span className="absolute inset-0 h-full w-0 bg-black/10 group-hover:w-full transition-all duration-300 ease-in-out -z-0"></span>
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

export default SiteEditor;
