
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Check, CheckCircle, Layout } from 'lucide-react';

const ContentSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [heroTitle, setHeroTitle] = useState('Transforme suas ideias em realidade');
  const [heroSubtitle, setHeroSubtitle] = useState('Desenvolvimento de sistemas personalizados para o seu negócio');
  const [featuresList, setFeaturesList] = useState([
    'Desenvolvimento Web',
    'Aplicativos Mobile',
    'Sistemas Personalizados',
    'Integrações com APIs',
    'Consultoria em TI',
    'Suporte Técnico'
  ]);

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

  return (
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
  );
};

export default ContentSettings;
