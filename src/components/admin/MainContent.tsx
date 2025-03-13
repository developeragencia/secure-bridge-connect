
import React from 'react';
import { motion } from 'framer-motion';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminReports from '@/components/admin/AdminReports';
import AdminSettings from '@/components/admin/AdminSettings';
import SiteEditor from '@/components/admin/SiteEditor';
import AdminTabHeader from '@/components/admin/AdminTabHeader';
import ExtraTabContent from '@/components/admin/ExtraTabContent';

interface MainContentProps {
  activeTab: string;
  user: any;
}

const MainContent = ({ activeTab, user }: MainContentProps) => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.main 
      className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 bg-background"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <div className="max-w-7xl mx-auto">
        <AdminTabHeader activeTab={activeTab} />
        
        <motion.div variants={childVariants}>
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'users' && <AdminUsers />}
          {activeTab === 'reports' && <AdminReports />}
          {activeTab === 'site' && <SiteEditor />}
          {activeTab === 'settings' && <AdminSettings user={user} />}
          <ExtraTabContent activeTab={activeTab} />
        </motion.div>
      </div>
    </motion.main>
  );
};

export default MainContent;
