
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import ImportSettingsForm from './ImportSettingsForm';

const SettingsTabContent = () => {
  return (
    <TabsContent value="settings" className="space-y-4 pt-4">
      <ImportSettingsForm />
    </TabsContent>
  );
};

export default SettingsTabContent;
