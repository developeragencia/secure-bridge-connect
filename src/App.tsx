import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
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

// Lazy load admin pages
const UserProfilePage = lazy(() => import('./pages/admin/UserProfile'));
const NotificationsPage = lazy(() => import('./pages/admin/NotificationsPage'));
const ClientsPage = lazy(() => import('./pages/admin/ClientsPage'));
const ClientDetailPage = lazy(() => import('./pages/admin/ClientDetailPage'));

// Create QueryClient with proper configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const MaintenanceRouteGuard = ({ element }: { element: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkMaintenanceAndAuth = async () => {
      try {
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
      } catch (error) {
        console.error("Maintenance check error:", error);
      } finally {
        setLoading(false);
      }
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
      try {
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
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setAuthenticated(true);
        } else if (event === 'SIGNED_OUT') {
          setAuthenticated(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
    </div>;
  }

  return authenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const [domainError, setDomainError] = useState(false);
  
  useEffect(() => {
    const hostname = window.location.hostname;
    console.log("Current hostname:", hostname);
    
    const isValidDomain = 
      hostname === 'sistemasclaudiofigueiredo.com.br' || 
      hostname === 'www.sistemasclaudiofigueiredo.com.br' ||
      hostname === 'localhost' || 
      hostname.includes('192.168.') ||
      hostname.includes('127.0.0.1') ||
      hostname.endsWith('.vercel.app');
      
    if (!isValidDomain) {
      console.warn(`Running on potentially invalid domain: ${hostname}`);
    }
  }, []);
  
  const renderLoading = () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
    </div>
  );
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/login" element={<Login />} />
            
            <Route 
              path="/admin/profile" 
              element={
                <ProtectedRoute 
                  element={
                    <Suspense fallback={renderLoading()}>
                      <UserProfilePage />
                    </Suspense>
                  } 
                />
              } 
            />
            <Route 
              path="/admin/notifications" 
              element={
                <ProtectedRoute 
                  element={
                    <Suspense fallback={renderLoading()}>
                      <NotificationsPage />
                    </Suspense>
                  } 
                />
              } 
            />
            <Route 
              path="/admin/clients" 
              element={
                <ProtectedRoute 
                  element={
                    <Suspense fallback={renderLoading()}>
                      <ClientsPage />
                    </Suspense>
                  } 
                />
              } 
            />
            <Route 
              path="/admin/client/:clientId" 
              element={
                <ProtectedRoute 
                  element={
                    <Suspense fallback={renderLoading()}>
                      <ClientDetailPage />
                    </Suspense>
                  } 
                />
              } 
            />
            <Route path="/admin/*" element={<ProtectedRoute element={<Admin />} />} />
            
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
};

export default App;
