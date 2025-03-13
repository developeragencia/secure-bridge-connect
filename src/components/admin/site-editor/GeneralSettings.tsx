
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Check } from 'lucide-react';

const GeneralSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [siteName, setSiteName] = useState('Sistemas Claudio Figueiredo');
  const [siteDescription, setSiteDescription] = useState('Desenvolvimento de Sistemas e Websites');

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

  return (
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
  );
};

export default GeneralSettings;
