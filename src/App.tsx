import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Notifications from "./pages/Notifications";
import CreditDetails from "./pages/CreditDetails";
import Declarations from "./pages/Declarations";
import DeclarationDetail from "./pages/DeclarationDetail";
import NewDeclaration from "./pages/NewDeclaration";
import AnalysisReport from "./pages/AnalysisReport";
import Maintenance from "./pages/Maintenance";
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient();

const MaintenanceRouteGuard = ({ element }: { element: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkMaintenanceAndAuth = async () => {
      const maintenanceMode = localStorage.getItem('maintenanceMode') === 'true';
      setIsMaintenanceMode(maintenanceMode);
      
      if (maintenanceMode) {
        const { data } = await supabase.auth.getSession();
        const adminAuth = localStorage.getItem('adminAuth');
        
        if (data.session || adminAuth) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
      
      setLoading(false);
    };
    
    checkMaintenanceAndAuth();
  }, []);
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
    </div>;
  }
  
  if (isMaintenanceMode && !isAdmin) {
    return <Navigate to="/maintenance" />;
  }
  
  return element;
};

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const rememberedAuth = localStorage.getItem('adminAuthRemembered');
      if (rememberedAuth) {
        try {
          const authData = JSON.parse(rememberedAuth);
          if (authData && (Date.now() - authData.timestamp) < 30 * 24 * 60 * 60 * 1000) {
            setAuthenticated(true);
            setLoading(false);
            return;
          }
        } catch (e) {
          localStorage.removeItem('adminAuthRemembered');
        }
      }

      const regularAuth = localStorage.getItem('adminAuth');
      if (regularAuth) {
        try {
          const authData = JSON.parse(regularAuth);
          if (authData && (Date.now() - authData.timestamp) < 1 * 24 * 60 * 60 * 1000) {
            setAuthenticated(true);
            setLoading(false);
            return;
          } else {
            localStorage.removeItem('adminAuth');
          }
        } catch (e) {
          localStorage.removeItem('adminAuth');
        }
      }

      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
    </div>;
  }

  return authenticated ? element : <Navigate to="/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
          <Route path="/admin/:tab" element={<ProtectedRoute element={<Admin />} />} />
          <Route path="/admin/:tab/:subRoute" element={<ProtectedRoute element={<Admin />} />} />
          <Route path="/admin/:tab/:subRoute/:id" element={<ProtectedRoute element={<Admin />} />} />
          
          <Route path="/notifications" element={<ProtectedRoute element={<Notifications />} />} />
          <Route path="/declarations" element={<ProtectedRoute element={<Declarations />} />} />
          <Route path="/declarations/new" element={<ProtectedRoute element={<NewDeclaration />} />} />
          <Route path="/declarations/:id" element={<ProtectedRoute element={<DeclarationDetail />} />} />
          <Route path="/credits/details/:id" element={<ProtectedRoute element={<CreditDetails />} />} />
          <Route path="/analysis/report/:id" element={<ProtectedRoute element={<AnalysisReport />} />} />
          
          <Route path="/" element={<MaintenanceRouteGuard element={<Index />} />} />
          
          <Route path="*" element={<MaintenanceRouteGuard element={<NotFound />} />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
