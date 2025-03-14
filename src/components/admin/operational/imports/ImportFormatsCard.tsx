
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileType, Database, FileText, FileImage } from "lucide-react";
import { motion } from "framer-motion";

interface ImportFormatsCardProps {
  onFormatClick: (format: string) => void;
}

const ImportFormatsCard = ({ onFormatClick }: ImportFormatsCardProps) => {
  const formatButtons = [
    { format: 'XML', icon: <FileType className="h-8 w-8" /> },
    { format: 'CSV', icon: <FileType className="h-8 w-8" /> },
    { format: 'JSON', icon: <Database className="h-8 w-8" /> },
    { format: 'PDF', icon: <FileText className="h-8 w-8" /> },
    { format: 'Word', icon: <FileText className="h-8 w-8" /> },
    { format: 'Outros', icon: <FileImage className="h-8 w-8" /> },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Formatos Suportados</CardTitle>
        <CardDescription>
          Selecione o tipo de arquivo que deseja importar para o sistema.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {formatButtons.map((item) => (
          <motion.button
            key={item.format}
            onClick={() => onFormatClick(item.format)}
            className="h-24 flex flex-col justify-center items-center gap-2 border border-dashed rounded-md 
                      hover:bg-primary/5 hover:border-primary transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={{ y: 0 }}
              whileHover={{ y: -5 }}
              className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
            >
              {item.icon}
            </motion.div>
            <span>{item.format}</span>
          </motion.button>
        ))}
      </CardContent>
    </Card>
  );
};

export default ImportFormatsCard;
