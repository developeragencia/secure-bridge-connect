
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileType, Database, FileText, FileImage } from "lucide-react";

interface ImportFormatsCardProps {
  onFormatClick: (format: string) => void;
}

const ImportFormatsCard = ({ onFormatClick }: ImportFormatsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Formatos Suportados</CardTitle>
        <CardDescription>
          Selecione o tipo de arquivo que deseja importar para o sistema.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          variant="outline" 
          className="h-24 flex flex-col justify-center items-center gap-2 border-dashed hover:bg-muted hover:border-primary"
          onClick={() => onFormatClick('XML')}
        >
          <FileType className="h-8 w-8 text-muted-foreground" />
          <span>XML</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-24 flex flex-col justify-center items-center gap-2 border-dashed hover:bg-muted hover:border-primary"
          onClick={() => onFormatClick('CSV')}
        >
          <FileType className="h-8 w-8 text-muted-foreground" />
          <span>CSV</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-24 flex flex-col justify-center items-center gap-2 border-dashed hover:bg-muted hover:border-primary"
          onClick={() => onFormatClick('JSON')}
        >
          <Database className="h-8 w-8 text-muted-foreground" />
          <span>JSON</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-24 flex flex-col justify-center items-center gap-2 border-dashed hover:bg-muted hover:border-primary"
          onClick={() => onFormatClick('PDF')}
        >
          <FileText className="h-8 w-8 text-muted-foreground" />
          <span>PDF</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-24 flex flex-col justify-center items-center gap-2 border-dashed hover:bg-muted hover:border-primary"
          onClick={() => onFormatClick('Word')}
        >
          <FileText className="h-8 w-8 text-muted-foreground" />
          <span>Word</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-24 flex flex-col justify-center items-center gap-2 border-dashed hover:bg-muted hover:border-primary"
          onClick={() => onFormatClick('Outros')}
        >
          <FileImage className="h-8 w-8 text-muted-foreground" />
          <span>Outros</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ImportFormatsCard;
