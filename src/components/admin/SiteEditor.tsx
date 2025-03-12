
import React, { useState } from 'react';
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
  Mail, Building, CheckCircle
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
  const [featuresList, setFeaturesList] = useState([
    'Desenvolvimento Web',
    'Aplicativos Mobile',
    'Sistemas Personalizados',
    'Integrações com APIs',
    'Consultoria em TI',
    'Suporte Técnico'
  ]);
  
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Editor do Site</h1>
      <p className="text-muted-foreground">Personalize a aparência e o conteúdo do seu site</p>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
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
      </Tabs>
    </div>
  );
};

export default SiteEditor;
