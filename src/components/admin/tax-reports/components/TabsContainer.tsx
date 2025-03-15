
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabsContainerProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  children: React.ReactNode;
}

const TabsContainer: React.FC<TabsContainerProps> = ({
  activeTab,
  setActiveTab,
  children
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="simulation">Simulação</TabsTrigger>
        <TabsTrigger value="per_dcomp">PER/DCOMP</TabsTrigger>
        <TabsTrigger value="judicial">Decisões Judiciais</TabsTrigger>
      </TabsList>
      
      {children}
    </Tabs>
  );
};

export default TabsContainer;
