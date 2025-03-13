
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import ImportFormatsCard from './ImportFormatsCard';
import RecentImportsCard from './RecentImportsCard';

interface FilesTabContentProps {
  onFormatClick: (format: string) => void;
}

const FilesTabContent = ({ onFormatClick }: FilesTabContentProps) => {
  return (
    <TabsContent value="files" className="space-y-4 pt-4">
      <ImportFormatsCard onFormatClick={onFormatClick} />
      <RecentImportsCard />
    </TabsContent>
  );
};

export default FilesTabContent;
