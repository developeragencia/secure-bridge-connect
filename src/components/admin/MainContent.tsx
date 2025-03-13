
import React from 'react';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import SiteEditor from './SiteEditor';
import AdminReports from './AdminReports';
import AdminSettings from './AdminSettings';
import UserProfilePermissions from './user-profiles/UserProfilePermissions';
import TwoFactorAuthPanel from './security/TwoFactorAuthPanel';
import SessionExpirationPanel from './security/SessionExpirationPanel';
import AccessProtectionContent from './security/AccessProtectionContent';
import AuditTrailsPanel from './security/AuditTrailsPanel';
import { motion } from 'framer-motion';

// Tax Credits Components
import TaxCreditManagement from './tax-credits/TaxCreditManagement';
import ClientManagement from './tax-credits/ClientManagement';
import RecoveryManagement from './tax-credits/RecoveryManagement';
import DataImports from './tax-credits/DataImports';
import DataProcessing from './tax-credits/DataProcessing';
import AuditManagement from './tax-credits/AuditManagement';
import IRRFCalculations from './tax-credits/IRRFCalculations';
import TaxCreditCalculator from './tax-credits/TaxCreditCalculator';
import CreditIdentification from './tax-credits/CreditIdentification';
import FiscalReports from './tax-credits/FiscalReports';
import CommercialProposals from './tax-credits/CommercialProposals';

// Tax Reports Components
import DetailedReportsPanel from './tax-reports/DetailedReportsPanel';
import InteractiveDashboardPanel from './tax-reports/InteractiveDashboardPanel';
import RetentionReceiptsPanel from './tax-reports/RetentionReceiptsPanel';

// Extra Tab Content for any other tabs that are not yet implemented
import ExtraTabContent from './ExtraTabContent';

interface MainContentProps {
  activeTab: string;
  user: any;
}

const MainContent = ({ activeTab, user }: MainContentProps) => {
  const containerVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 10,
      transition: {
        duration: 0.3
      }
    }
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      // Main Section
      case 'dashboard':
        return <AdminDashboard user={user} />;
      case 'users':
        return <AdminUsers user={user} />;
      case 'profile':
        return <UserProfilePermissions user={user} />;
      case 'notifications':
        return <ExtraTabContent title="Notificações" description="Gerenciamento de notificações do sistema" />;
      
      // Clients Section
      case 'clients':
        return <ClientManagement />;
      
      // Tax Credits Section
      case 'tax_credits':
        return <TaxCreditManagement />;
      case 'recovery':
        return <RecoveryManagement />;
      case 'credit_identification':
        return <CreditIdentification />;
      case 'data_processing':
        return <DataProcessing />;
      case 'audits':
        return <AuditManagement />;
      case 'calculations':
        return <IRRFCalculations />;
      case 'tax_calculator':
        return <TaxCreditCalculator />;
      case 'imports':
        return <DataImports />;
      case 'fiscal_reports':
        return <FiscalReports />;
      case 'proposals':
        return <CommercialProposals />;
      
      // Tax Reports Section
      case 'detailed_reports':
        return <DetailedReportsPanel />;
      case 'interactive_dashboard':
        return <InteractiveDashboardPanel />;
      case 'retention_receipts':
        return <RetentionReceiptsPanel />;
      
      // Security Section
      case 'two_factor_auth':
        return <TwoFactorAuthPanel />;
      case 'session_expiration':
        return <SessionExpirationPanel />;
      case 'access_protection':
        return <AccessProtectionContent />;
      case 'audit_trails':
        return <AuditTrailsPanel />;
      
      // Content Section
      case 'site':
        return <SiteEditor user={user} />;
      case 'content_reports':
        return <AdminReports user={user} />;
      
      // System Section
      case 'settings':
        return <AdminSettings user={user} />;
      case 'security':
      case 'billing':
      case 'support':
        return <ExtraTabContent 
          title={activeTab === 'security' ? 'Segurança' : activeTab === 'billing' ? 'Faturamento' : 'Suporte'} 
          description={`Gerenciamento de ${activeTab === 'security' ? 'segurança' : activeTab === 'billing' ? 'faturamento' : 'suporte'} do sistema`} 
        />;
      
      default:
        return <AdminDashboard user={user} />;
    }
  };

  return (
    <motion.main 
      className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background"
      key={activeTab}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="container mx-auto max-w-7xl">
        {renderContent()}
      </div>
    </motion.main>
  );
};

export default MainContent;
