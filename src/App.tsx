
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';

// Pages
import Index from '@/pages/Index';
import Admin from '@/pages/Admin';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import ClientDetailPage from '@/pages/admin/ClientDetailPage';
import AuditoriaPage from '@/pages/admin/AuditoriaPage';

// Layout providers
import { ThemeProvider } from '@/components/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <Router>
        <Routes>
          {/* Home route shows the Index component */}
          <Route path="/" element={<Index />} />
          
          {/* Admin Panel Routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:tab" element={<Admin />} />
          <Route path="/admin/client/:clientId" element={<ClientDetailPage />} />
          <Route path="/admin/auditorias" element={<AuditoriaPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      
      {/* Toast notifications */}
      <Toaster />
      <SonnerToaster position="top-right" />
    </ThemeProvider>
  );
}

export default App;
