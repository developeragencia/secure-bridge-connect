
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import ImportSettingsForm from './ImportSettingsForm';
import { motion } from 'framer-motion';

const SettingsTabContent = () => {
  return (
    <TabsContent value="settings" className="space-y-4 pt-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        className="card-shimmer"
      >
        <ImportSettingsForm />
      </motion.div>
    </TabsContent>
  );
};

export default SettingsTabContent;
