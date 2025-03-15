
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLoading from '../components/admin/AdminLoading';
import AdminLayout from '../components/admin/AdminLayout';
import TaxCreditManagement from '../components/admin/tax-credits/TaxCreditManagement';
import OperationalCreditIdentificationPanel from '../components/admin/tax-credits/components/OperationalCreditIdentificationPanel';
import OperationalImportsPanel from '../components/admin/operational/OperationalImportsPanel';
import DataFilterPanel from '../components/admin/imports/DataFilterPanel';
import SelicCorrectionPanel from '../components/admin/tax-credits/calculations/SelicCorrectionPanel';
import SelicIntegrationPanel from '../components/admin/tax-credits/calculations/selic-correction/SelicIntegrationPanel';

// Lazy-loaded components
const AdminUsers = lazy(() => import('../components/admin/AdminUsers'));
const AdminDashboard = lazy(() => import('../components/admin/AdminDashboard'));
const SiteEditor = lazy(() => import('../components/admin/SiteEditor'));
const AdminSettings = lazy(() => import('../components/admin/AdminSettings'));

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={
          <Suspense fallback={<AdminLoading />}>
            <AdminDashboard />
          </Suspense>
        } />
        <Route path="users" element={
          <Suspense fallback={<AdminLoading />}>
            <AdminUsers />
          </Suspense>
        } />
        <Route path="site" element={
          <Suspense fallback={<AdminLoading />}>
            <SiteEditor />
          </Suspense>
        } />
        <Route path="settings" element={
          <Suspense fallback={<AdminLoading />}>
            <AdminSettings />
          </Suspense>
        } />
        <Route path="tax_credits" element={<TaxCreditManagement />} />
        <Route path="credit_identification" element={<OperationalCreditIdentificationPanel />} />
        <Route path="operational_imports" element={<OperationalImportsPanel />} />
        <Route path="imports/filter" element={<DataFilterPanel />} />
        <Route path="calculations/selic" element={<SelicCorrectionPanel />} />
        <Route path="calculations/selic-integration" element={<SelicIntegrationPanel />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
