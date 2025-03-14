
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";

interface CreditSearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const CreditSearch: React.FC<CreditSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Buscar Créditos Identificados</CardTitle>
        <CardDescription>
          Pesquise por fornecedor, CNPJ ou número de identificação.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Buscar crédito..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            <Button>Buscar</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditSearch;
