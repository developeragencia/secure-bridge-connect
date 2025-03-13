
import React from 'react';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface LogoTypeSelectorProps {
  logoType: string;
  setLogoType: (value: string) => void;
}

const LogoTypeSelector = ({ logoType, setLogoType }: LogoTypeSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Tipo de Logo</Label>
      <Select
        value={logoType}
        onValueChange={setLogoType}
      >
        <SelectTrigger className="w-full bg-card border-input hover:border-primary/50 transition-colors">
          <SelectValue placeholder="Selecione o tipo de logo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="static">Estático (imagem)</SelectItem>
          <SelectItem value="animated">Animado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LogoTypeSelector;
