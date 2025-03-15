
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsContainerProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  fiscalContent: React.ReactNode;
  auditContent?: React.ReactNode;
  retentionContent?: React.ReactNode;
}

const TabsContainer: React.FC<TabsContainerProps> = ({
  activeTab,
  setActiveTab,
  fiscalContent,
  auditContent = <div className="py-10 text-center text-muted-foreground">Conteúdo de auditoria em desenvolvimento</div>,
  retentionContent = <div className="py-10 text-center text-muted-foreground">Conteúdo de comprovantes em desenvolvimento</div>
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="fiscal">Relatórios Fiscais</TabsTrigger>
        <TabsTrigger value="audit">Auditorias</TabsTrigger>
        <TabsTrigger value="retention">Comprovantes</TabsTrigger>
      </TabsList>
      
      <TabsContent value="fiscal" className="space-y-4 pt-4">
        {fiscalContent}
      </TabsContent>
      
      <TabsContent value="audit" className="space-y-4 pt-4">
        {auditContent}
      </TabsContent>
      
      <TabsContent value="retention" className="space-y-4 pt-4">
        {retentionContent}
      </TabsContent>
    </Tabs>
  );
};

export default TabsContainer;
