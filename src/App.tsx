
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';

// Loading component
import AdminLoading from '@/components/admin/AdminLoading';

// Lazy loaded pages
const Index = lazy(() => import('@/pages/Index'));
const Admin = lazy(() => import('@/pages/Admin'));
const Login = lazy(() => import('@/pages/Login'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const ClientDetailPage = lazy(() => import('@/pages/admin/ClientDetailPage'));
const AuditoriaPage = lazy(() => import('@/pages/admin/AuditoriaPage'));
const DocumentationPage = lazy(() => import('@/pages/admin/DocumentationPage'));

// Layout providers
import { ThemeProvider } from '@/components/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <Router>
        <Suspense fallback={<AdminLoading />}>
          <Routes>
            {/* Home route shows the Index component */}
            <Route path="/" element={<Index />} />
            
            {/* Admin Panel Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/:tab" element={<Admin />} />
            <Route path="/admin/client/:clientId" element={<ClientDetailPage />} />
            <Route path="/admin/auditorias" element={<AuditoriaPage />} />
            <Route path="/admin/documentation" element={<DocumentationPage />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
      
      {/* Toast notifications */}
      <Toaster />
      <SonnerToaster position="top-right" />
    </ThemeProvider>
  );
}

export default App;
