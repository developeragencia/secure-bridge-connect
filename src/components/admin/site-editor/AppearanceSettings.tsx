
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Check, Image } from 'lucide-react';

const AppearanceSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#1EAEDB');
  const [logoUrl, setLogoUrl] = useState('/favicon.svg');
  const [faviconUrl, setFaviconUrl] = useState('/favicon.ico');

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

  return (
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
  );
};

export default AppearanceSettings;
