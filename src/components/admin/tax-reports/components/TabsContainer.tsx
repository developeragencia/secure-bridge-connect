
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

interface TabsContainerProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  fiscalContent: React.ReactNode;
}

const TabsContainer: React.FC<TabsContainerProps> = ({ activeTab, setActiveTab, fiscalContent }) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 w-full max-w-md">
        <TabsTrigger value="fiscal">Fiscal</TabsTrigger>
        <TabsTrigger value="tributario">Tributário</TabsTrigger>
        <TabsTrigger value="contabil">Contábil</TabsTrigger>
      </TabsList>
      
      <TabsContent value="fiscal" className="mt-4 space-y-4">
        {fiscalContent}
      </TabsContent>
      
      <TabsContent value="tributario" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Selecione os parâmetros para gerar relatórios tributários.</p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="contabil" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Selecione os parâmetros para gerar relatórios contábeis.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabsContainer;
