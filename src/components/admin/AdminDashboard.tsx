
import React from 'react';
import { BookOpen, HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';

import DashboardHeader from './dashboard/DashboardHeader';
import DashboardSection from './dashboard/DashboardSection';
import StatCards from './dashboard/StatCards';
import { getMainMenuItems } from './dashboard/MainMenuItems';
import { getOperationalMenuItems } from './dashboard/OperationalMenuItems';
import ActiveClientHeader from './client/ActiveClientHeader';

const AdminDashboard = () => {
  // Get menu items from the separate files
  const mainMenuItems = getMainMenuItems();
  const operationalMenuItems = getOperationalMenuItems();
  
  return (
    <div className="space-y-8">
      {/* Active Client Header */}
      <ActiveClientHeader />
      
      {/* Dashboard header */}
      <DashboardHeader />

      {/* Cards de estatísticas */}
      <StatCards />

      {/* Menu principal */}
      <DashboardSection 
        title="Módulos Principais"
        icon={<BookOpen className="mr-2 h-5 w-5 text-primary" />}
        items={mainMenuItems}
      />

      {/* Menu operacional */}
      <DashboardSection 
        title="Operacional"
        icon={<HardDrive className="mr-2 h-5 w-5 text-primary" />}
        items={operationalMenuItems}
        delay={0.2}
      />
    </div>
  );
};

export default AdminDashboard;
