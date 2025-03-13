
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Check, Image, Upload, Trash2, RefreshCw } from 'lucide-react';

const AppearanceSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#1EAEDB');
  const [secondaryColor, setSecondaryColor] = useState('#0A95C0');
  const [accentColor, setAccentColor] = useState('#FFB800');
  const [logoUrl, setLogoUrl] = useState('/favicon.svg');
  const [faviconUrl, setFaviconUrl] = useState('/favicon.ico');
  const [headerBgColor, setHeaderBgColor] = useState('#FFFFFF');
  const [footerBgColor, setFooterBgColor] = useState('#F8FAFC');
  const [faviconPreview, setFaviconPreview] = useState('/favicon.ico');
  const [bannerPreview, setBannerPreview] = useState('');
  const [userAnimatedLogo, setUseAnimatedLogo] = useState(true);

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

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type and size
    if (!file.type.match('image.*')) {
      toast({
        title: "Erro no upload",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 1 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O favicon deve ter no máximo 1MB.",
        variant: "destructive",
      });
      return;
    }
    
    const url = URL.createObjectURL(file);
    setFaviconPreview(url);
    
    toast({
      title: "Favicon carregado",
      description: `Arquivo "${file.name}" foi carregado com sucesso.`,
    });
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type and size
    if (!file.type.match('image.*')) {
      toast({
        title: "Erro no upload",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O banner deve ter no máximo 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    const url = URL.createObjectURL(file);
    setBannerPreview(url);
    
    toast({
      title: "Banner carregado",
      description: `Arquivo "${file.name}" foi carregado com sucesso.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aparência</CardTitle>
        <CardDescription>
          Personalize a aparência do seu site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="colors">Cores</TabsTrigger>
            <TabsTrigger value="images">Imagens</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors" className="space-y-4">
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
                  <span className="text-sm font-medium">Hexadecimal: </span>
                  <span className="text-sm">{primaryColor}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondary-color">Cor Secundária</Label>
              <div className="flex items-center gap-4">
                <Input 
                  id="secondary-color" 
                  type="color" 
                  value={secondaryColor} 
                  onChange={(e) => setSecondaryColor(e.target.value)} 
                  className="w-24 h-10 p-1"
                />
                <div>
                  <span className="text-sm font-medium">Hexadecimal: </span>
                  <span className="text-sm">{secondaryColor}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accent-color">Cor de Destaque</Label>
              <div className="flex items-center gap-4">
                <Input 
                  id="accent-color" 
                  type="color" 
                  value={accentColor} 
                  onChange={(e) => setAccentColor(e.target.value)} 
                  className="w-24 h-10 p-1"
                />
                <div>
                  <span className="text-sm font-medium">Hexadecimal: </span>
                  <span className="text-sm">{accentColor}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <Label htmlFor="header-bg-color">Cor de Fundo do Cabeçalho</Label>
              <div className="flex items-center gap-4">
                <Input 
                  id="header-bg-color" 
                  type="color" 
                  value={headerBgColor} 
                  onChange={(e) => setHeaderBgColor(e.target.value)} 
                  className="w-24 h-10 p-1"
                />
                <div>
                  <span className="text-sm font-medium">Hexadecimal: </span>
                  <span className="text-sm">{headerBgColor}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="footer-bg-color">Cor de Fundo do Rodapé</Label>
              <div className="flex items-center gap-4">
                <Input 
                  id="footer-bg-color" 
                  type="color" 
                  value={footerBgColor} 
                  onChange={(e) => setFooterBgColor(e.target.value)} 
                  className="w-24 h-10 p-1"
                />
                <div>
                  <span className="text-sm font-medium">Hexadecimal: </span>
                  <span className="text-sm">{footerBgColor}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="images" className="space-y-6">
            <div className="space-y-3">
              <Label>Favicon do Site</Label>
              <div className="border-2 border-dashed border-border rounded-md p-4 space-y-3">
                <div className="flex flex-col items-center justify-center">
                  {faviconPreview && (
                    <div className="p-2 bg-gray-50 rounded-md mb-2">
                      <img src={faviconPreview} alt="Favicon" className="h-16 w-16" />
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex gap-1 items-center"
                      onClick={() => document.getElementById('favicon-upload')?.click()}
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload</span>
                      <input
                        id="favicon-upload"
                        type="file"
                        accept=".ico,.png,.svg"
                        className="hidden"
                        onChange={handleFaviconUpload}
                      />
                    </Button>
                    
                    {faviconPreview !== '/favicon.ico' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex gap-1 items-center text-destructive"
                        onClick={() => setFaviconPreview('/favicon.ico')}
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Restaurar</span>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  <p>Formatos recomendados: ICO, PNG, SVG</p>
                  <p>Tamanho ideal: 32x32 ou 64x64 pixels</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Banner Principal</Label>
              <div className="border-2 border-dashed border-border rounded-md p-4 space-y-3">
                <div className="flex flex-col items-center justify-center">
                  {bannerPreview ? (
                    <div className="w-full bg-gray-50 rounded-md mb-2 overflow-hidden">
                      <img src={bannerPreview} alt="Banner" className="max-h-48 w-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-full h-32 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                      <Image className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex gap-1 items-center"
                      onClick={() => document.getElementById('banner-upload')?.click()}
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload</span>
                      <input
                        id="banner-upload"
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp"
                        className="hidden"
                        onChange={handleBannerUpload}
                      />
                    </Button>
                    
                    {bannerPreview && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex gap-1 items-center text-destructive"
                        onClick={() => setBannerPreview('')}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Remover</span>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  <p>Formatos suportados: JPG, PNG, WEBP</p>
                  <p>Resolução recomendada: 1920x600 pixels</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="layout" className="space-y-4">
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode" className="text-base">Tema Escuro</Label>
                <p className="text-sm text-muted-foreground">
                  Habilitar tema escuro no site
                </p>
              </div>
              <Switch id="dark-mode" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label htmlFor="animated-logo" className="text-base">Logo Animado</Label>
                <p className="text-sm text-muted-foreground">
                  Usar logo com animações
                </p>
              </div>
              <Switch 
                id="animated-logo" 
                checked={userAnimatedLogo}
                onCheckedChange={setUseAnimatedLogo}
              />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label htmlFor="fixed-header" className="text-base">Cabeçalho Fixo</Label>
                <p className="text-sm text-muted-foreground">
                  Manter cabeçalho visível ao rolar a página
                </p>
              </div>
              <Switch id="fixed-header" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label htmlFor="full-width" className="text-base">Layout de Largura Total</Label>
                <p className="text-sm text-muted-foreground">
                  Usar largura máxima para o conteúdo
                </p>
              </div>
              <Switch id="full-width" />
            </div>
          </TabsContent>
        </Tabs>
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
  );
};

export default AppearanceSettings;
