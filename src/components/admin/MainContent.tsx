
import React from 'react';
import { motion } from 'framer-motion';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminReports from '@/components/admin/AdminReports';
import AdminSettings from '@/components/admin/AdminSettings';
import SiteEditor from '@/components/admin/SiteEditor';
import AdminTabHeader from '@/components/admin/AdminTabHeader';
import ExtraTabContent from '@/components/admin/ExtraTabContent';
import ClientsManagement from '@/components/admin/clients/ClientsManagement';
import AdminUserProfile from '@/components/admin/AdminUserProfile';
import ActiveClientHeader from '@/components/admin/ActiveClientHeader';
import { useActiveClient } from '@/hooks/useActiveClient';
import TaxCreditManagement from '@/components/admin/tax-credits/TaxCreditManagement';
import RecoveryManagement from '@/components/admin/tax-credits/RecoveryManagement';
import AuditManagement from '@/components/admin/tax-credits/AuditManagement';
import IRRFCalculations from '@/components/admin/tax-credits/IRRFCalculations';
import DataImports from '@/components/admin/tax-credits/DataImports';
import FiscalReports from '@/components/admin/tax-credits/FiscalReports';
import CommercialProposals from '@/components/admin/tax-credits/CommercialProposals';
import TaxCreditCalculator from '@/components/admin/tax-credits/TaxCreditCalculator';
import CreditIdentification from '@/components/admin/tax-credits/CreditIdentification';
import DataProcessing from '@/components/admin/tax-credits/DataProcessing';
import DetailedReportsPanel from '@/components/admin/tax-reports/DetailedReportsPanel';
import InteractiveDashboardPanel from '@/components/admin/tax-reports/InteractiveDashboardPanel';
import RetentionReceiptsPanel from '@/components/admin/tax-reports/RetentionReceiptsPanel';
import { useNavigate } from 'react-router-dom';

interface MainContentProps {
  activeTab: string;
  user: any;
}

const MainContent = ({ activeTab, user }: MainContentProps) => {
  const { activeClient } = useActiveClient();
  const navigate = useNavigate();
  
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

  // Handle notifications tab by redirecting to the notifications page
  React.useEffect(() => {
    if (activeTab === 'notifications') {
      navigate('/notifications');
    }
  }, [activeTab, navigate]);

  // Check if we're on a client detail view
  const isClientDetail = activeTab.startsWith('client-');
  const clientId = isClientDetail ? activeTab.replace('client-', '') : '';

  // Debugging - log the active tab to help identify issues
  console.log("Active Tab:", activeTab);

  return (
    <motion.main 
      className="flex-1 overflow-auto bg-background"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      {activeClient && <ActiveClientHeader />}
      
      <div className="p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <AdminTabHeader activeTab={activeTab} />
          
          <motion.div 
            variants={childVariants}
            className="mt-4"
          >
            {/* Original tabs */}
            {activeTab === 'dashboard' && <AdminDashboard />}
            {activeTab === 'users' && <AdminUsers />}
            {activeTab === 'reports' && <AdminReports />}
            {activeTab === 'site' && <SiteEditor />}
            {activeTab === 'settings' && <AdminSettings user={user} />}
            {activeTab === 'profile' && <AdminUserProfile user={user} />}
            
            {/* Client Management tab */}
            {activeTab === 'clients' && <ClientsManagement />}
            
            {/* Tax Credit Management tabs */}
            {activeTab === 'tax_credits' && <TaxCreditManagement />}
            {activeTab === 'recovery' && <RecoveryManagement />}
            {activeTab === 'audits' && <AuditManagement />}
            {activeTab === 'calculations' && <IRRFCalculations />}
            {activeTab === 'tax_calculator' && <TaxCreditCalculator />}
            {activeTab === 'imports' && <DataImports />}
            {activeTab === 'content_reports' && <AdminReports />}
            {activeTab === 'fiscal_reports' && <FiscalReports />}
            {activeTab === 'proposals' && <CommercialProposals />}
            
            {/* New tabs */}
            {activeTab === 'credit_identification' && <CreditIdentification />}
            {activeTab === 'data_processing' && <DataProcessing />}
            
            {/* Tax Reports tabs */}
            {activeTab === 'detailed_reports' && <DetailedReportsPanel />}
            {activeTab === 'interactive_dashboard' && <InteractiveDashboardPanel />}
            {activeTab === 'retention_receipts' && <RetentionReceiptsPanel />}
            
            {/* Extra tabs */}
            <ExtraTabContent activeTab={activeTab} />
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

export default MainContent;
