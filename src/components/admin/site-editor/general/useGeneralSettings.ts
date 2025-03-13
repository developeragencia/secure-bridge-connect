
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const useGeneralSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Site info state
  const [siteName, setSiteName] = useState('Sistemas Claudio Figueiredo');
  const [siteDescription, setSiteDescription] = useState('Desenvolvimento de Sistemas e Websites');
  
  // Logo settings state
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

  return {
    // Site info
    siteName,
    setSiteName,
    siteDescription,
    setSiteDescription,
    
    // Logo settings
    logoType,
    setLogoType,
    logoPreview,
    setLogoPreview,
    logoAnimation,
    setLogoAnimation,
    
    // Actions
    isLoading,
    handleSaveGeneral,
  };
};
