
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import MenuGrid from './MenuGrid';
import { MenuItem } from './MenuGrid';

interface DashboardSectionProps {
  title: string;
  icon: React.ReactNode;
  items: MenuItem[];
  delay?: number;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ 
  title, 
  icon, 
  items,
  delay = 0
}) => {
  return (
    <div className="mt-8">
      <motion.h2 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: delay, duration: 0.3 }}
        className="text-xl font-semibold mb-2 flex items-center"
      >
        {icon}
        {title}
      </motion.h2>
      <MenuGrid items={items} />
    </div>
  );
};

export default DashboardSection;
