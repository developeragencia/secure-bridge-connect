
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import ImportHistoryTable from './ImportHistoryTable';

const HistoryTabContent = () => {
  return (
    <TabsContent value="history" className="space-y-4 pt-4">
      <ImportHistoryTable />
    </TabsContent>
  );
};

export default HistoryTabContent;
