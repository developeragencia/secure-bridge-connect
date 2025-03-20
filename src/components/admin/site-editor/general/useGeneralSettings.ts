
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useGeneralSettings = () => {
  const [siteName, setSiteName] = useState('Crédito Fiscal Pro');
  const [siteDescription, setSiteDescription] = useState('Plataforma de gestão de créditos tributários');
  const [logoType, setLogoType] = useState<'static' | 'animated'>('static');
  const [logoPreview, setLogoPreview] = useState<string>('/placeholder.svg');
  const [logoAnimation, setLogoAnimation] = useState<string>('fade');
  const [isLoading, setIsLoading] = useState(false);

  // Load settings from Supabase
  const loadSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('type', 'general')
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.error('Error loading general settings:', error);
        return;
      }
      
      if (data && data.settings) {
        const settings = data.settings || {};
        setSiteName(settings.siteName || 'Crédito Fiscal Pro');
        setSiteDescription(settings.siteDescription || 'Plataforma de gestão de créditos tributários');
        setLogoType(settings.logoType || 'static');
        setLogoPreview(settings.logoPreview || '/placeholder.svg');
        setLogoAnimation(settings.logoAnimation || 'fade');
      }
    } catch (error) {
      console.error('Error in loadSettings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Load settings on component mount
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Save general settings
  const handleSaveGeneral = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const settings = {
        siteName,
        siteDescription,
        logoType,
        logoPreview,
        logoAnimation,
      };
      
      // First check if the entry exists
      const { data, error: checkError } = await supabase
        .from('site_settings')
        .select('id')
        .eq('type', 'general')
        .single();
        
      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking general settings:', checkError);
        throw checkError;
      }
      
      if (data) {
        // Update existing settings
        const { error } = await supabase
          .from('site_settings')
          .update({ 
            settings, 
            updated_at: new Date().toISOString() 
          })
          .eq('id', data.id);
          
        if (error) {
          console.error('Error updating general settings:', error);
          throw error;
        }
      } else {
        // Insert new settings
        const { error } = await supabase
          .from('site_settings')
          .insert([{ 
            type: 'general', 
            settings, 
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);
          
        if (error) {
          console.error('Error inserting general settings:', error);
          throw error;
        }
      }
      
      toast.success('Configurações salvas', {
        description: 'As configurações gerais foram salvas com sucesso',
      });
    } catch (error) {
      console.error('Error in handleSaveGeneral:', error);
      toast.error('Erro ao salvar configurações', {
        description: 'Não foi possível salvar as configurações gerais',
      });
    } finally {
      setIsLoading(false);
    }
  }, [siteName, siteDescription, logoType, logoPreview, logoAnimation]);

  return {
    siteName,
    setSiteName,
    siteDescription,
    setSiteDescription,
    logoType,
    setLogoType,
    logoPreview,
    setLogoPreview,
    logoAnimation,
    setLogoAnimation,
    isLoading,
    handleSaveGeneral,
  };
};
