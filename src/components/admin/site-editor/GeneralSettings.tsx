
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Loader2, Check, Upload, AlertTriangle, 
  Image as ImageIcon, RefreshCw, Trash2 
} from 'lucide-react';
import AnimatedLogo from '@/components/AnimatedLogo';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const GeneralSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [siteName, setSiteName] = useState('Sistemas Claudio Figueiredo');
  const [siteDescription, setSiteDescription] = useState('Desenvolvimento de Sistemas e Websites');
  const [logoType, setLogoType] = useState('animated');
  const [logoPreview, setLogoPreview] = useState('/favicon.svg');
  const [logoAnimation, setLogoAnimation] = useState('fade');

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Erro no upload",
        description: "Por favor, selecione apenas arquivos de imagem (JPG, PNG, SVG).",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é de 2MB.",
        variant: "destructive",
      });
      return;
    }
    
    // Create object URL for preview
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
    
    toast({
      title: "Logo carregado",
      description: `Arquivo "${file.name}" foi carregado com sucesso.`,
    });
  };

  const handleRemoveLogo = () => {
    setLogoPreview('/favicon.svg');
    
    toast({
      title: "Logo removido",
      description: "O logo foi redefinido para o padrão.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações Gerais</CardTitle>
        <CardDescription>
          Gerencie as configurações gerais do seu site
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="site-name">Nome do Site</Label>
          <Input 
            id="site-name" 
            value={siteName} 
            onChange={(e) => setSiteName(e.target.value)} 
          />
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="site-description">Descrição do Site</Label>
          <Textarea 
            id="site-description" 
            value={siteDescription} 
            onChange={(e) => setSiteDescription(e.target.value)} 
            rows={3}
          />
        </div>
        
        <div className="space-y-3">
          <Label>Tipo de Logo</Label>
          <Select
            value={logoType}
            onValueChange={setLogoType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de logo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="static">Estático (imagem)</SelectItem>
              <SelectItem value="animated">Animado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {logoType === 'static' ? (
          <div className="space-y-3">
            <Label>Logo do Site</Label>
            <div className="border-2 border-dashed border-border rounded-md p-6 space-y-4">
              <div className="flex flex-col items-center justify-center gap-3">
                {logoPreview ? (
                  <div className="relative w-48 h-24 flex items-center justify-center">
                    <img 
                      src={logoPreview} 
                      alt="Preview do logo" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-md bg-primary/10 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-primary/40" />
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex gap-1 items-center"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                    <input
                      id="logo-upload"
                      type="file"
                      accept=".jpg,.jpeg,.png,.svg,.webp,.gif"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </Button>
                  
                  {logoPreview && logoPreview !== '/favicon.svg' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex gap-1 items-center text-destructive"
                      onClick={handleRemoveLogo}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remover</span>
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground text-center">
                <p>Formatos suportados: JPG, PNG, SVG, WEBP, GIF</p>
                <p>Tamanho máximo: 2MB</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Label>Logo Animado</Label>
            <div className="border rounded-md p-6 bg-card space-y-4">
              <div className="flex flex-col items-center justify-center">
                <AnimatedLogo size="lg" />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="logo-animation">Estilo de Animação</Label>
                <Select
                  value={logoAnimation}
                  onValueChange={setLogoAnimation}
                >
                  <SelectTrigger id="logo-animation">
                    <SelectValue placeholder="Selecione o estilo de animação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fade">Fade</SelectItem>
                    <SelectItem value="rotate">Rotação</SelectItem>
                    <SelectItem value="pulse">Pulsar</SelectItem>
                    <SelectItem value="bounce">Saltar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-3 pt-3">
          <h3 className="text-base font-medium">Seções do Site</h3>
          
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
          
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5">
              <Label htmlFor="enable-features" className="text-base">Habilitar Funcionalidades</Label>
              <p className="text-sm text-muted-foreground">
                Exibir seção de funcionalidades no site
              </p>
            </div>
            <Switch id="enable-features" defaultChecked />
          </div>
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
  );
};

export default GeneralSettings;
