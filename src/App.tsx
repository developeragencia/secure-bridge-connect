
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';

// Loading component
import IndexLoading from '@/components/IndexLoading';
import AdminLoading from '@/components/admin/AdminLoading';
import LoadingScreen from '@/components/LoadingScreen';

// Lazy loaded pages with proper loading components
const Index = lazy(() => import('@/pages/Index'));
const Admin = lazy(() => import('@/pages/Admin'));
const Login = lazy(() => import('@/pages/Login'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const ClientDetailPage = lazy(() => import('@/pages/admin/ClientDetailPage'));
const AuditoriaPage = lazy(() => import('@/pages/admin/AuditoriaPage'));
const DocumentationPage = lazy(() => import('@/pages/admin/DocumentationPage'));
const OpportunitiesPage = lazy(() => import('@/pages/admin/OpportunitiesPage'));

// Layout providers
import { ThemeProvider } from '@/components/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <Router>
        <Routes>
          {/* Home route shows the Index component */}
          <Route path="/" element={
            <Suspense fallback={<IndexLoading />}>
              <Index />
            </Suspense>
          } />
          
          {/* Admin Panel Routes */}
          <Route path="/admin" element={
            <Suspense fallback={<AdminLoading />}>
              <Admin />
            </Suspense>
          } />
          <Route path="/admin/:tab" element={
            <Suspense fallback={<AdminLoading />}>
              <Admin />
            </Suspense>
          } />
          <Route path="/admin/client/:clientId" element={
            <Suspense fallback={<AdminLoading />}>
              <ClientDetailPage />
            </Suspense>
          } />
          <Route path="/admin/auditorias" element={
            <Suspense fallback={<AdminLoading />}>
              <AuditoriaPage />
            </Suspense>
          } />
          <Route path="/admin/opportunities" element={
            <Suspense fallback={<AdminLoading />}>
              <OpportunitiesPage />
            </Suspense>
          } />
          <Route path="/admin/documentation" element={
            <Suspense fallback={<AdminLoading />}>
              <DocumentationPage />
            </Suspense>
          } />
          
          {/* Auth Routes */}
          <Route path="/login" element={
            <Suspense fallback={<IndexLoading />}>
              <Login />
            </Suspense>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={
            <Suspense fallback={<IndexLoading />}>
              <NotFound />
            </Suspense>
          } />
        </Routes>
      </Router>
      
      {/* Toast notifications */}
      <Toaster />
      <SonnerToaster position="top-right" />
    </ThemeProvider>
  );
}

export default App;
