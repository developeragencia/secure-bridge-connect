
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
  );
};

export default LogoTypeSelector;
