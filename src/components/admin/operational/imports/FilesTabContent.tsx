
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import ImportFormatsCard from './ImportFormatsCard';
import RecentImportsCard from './RecentImportsCard';
import { motion } from 'framer-motion';

interface FilesTabContentProps {
  onFormatClick: (format: string) => void;
}

const FilesTabContent = ({ onFormatClick }: FilesTabContentProps) => {
  return (
    <TabsContent value="files" className="space-y-4 pt-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <ImportFormatsCard onFormatClick={onFormatClick} />
        </motion.div>
        
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <RecentImportsCard />
        </motion.div>
      </motion.div>
    </TabsContent>
  );
};

export default FilesTabContent;
