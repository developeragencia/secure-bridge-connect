
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatedLogo } from '@/components/AnimatedLogo';
import { 
  Users, BarChart3, FileText, Settings, LogOut, 
  Home, DollarSign, Calendar, BarChart4, Wallet
} from 'lucide-react';

// Admin components
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminReports from '@/components/admin/AdminReports';
import AdminSettings from '@/components/admin/AdminSettings';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        navigate('/login');
        return;
      }
      
      setUser(data.session.user);
      setLoading(false);
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate('/login');
        } else if (session) {
          setUser(session.user);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Sessão encerrada",
      description: "Você foi desconectado com sucesso.",
    });
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="bg-card shadow-sm z-10">
        <div className="container flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <AnimatedLogo size="sm" showText={true} />
            <h1 className="text-lg font-semibold">Painel Administrativo</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {user?.email || 'admin@sistemasclaudio.com'}
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar hidden md:block border-r border-border">
          <nav className="p-4 space-y-2">
            <Button 
              variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('dashboard')}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button 
              variant={activeTab === 'users' ? 'secondary' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('users')}
            >
              <Users className="mr-2 h-4 w-4" />
              Usuários
            </Button>
            <Button 
              variant={activeTab === 'reports' ? 'secondary' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('reports')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Relatórios
            </Button>
            <Button 
              variant={activeTab === 'settings' ? 'secondary' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Button>
          </nav>
        </aside>
        
        {/* Mobile Tab Selector */}
        <div className="md:hidden w-full border-b border-border">
          <TabsList className="w-full justify-start p-1">
            <TabsTrigger value="dashboard" onClick={() => setActiveTab('dashboard')}>
              <BarChart3 className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="users" onClick={() => setActiveTab('users')}>
              <Users className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="reports" onClick={() => setActiveTab('reports')}>
              <FileText className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="settings" onClick={() => setActiveTab('settings')}>
              <Settings className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'users' && <AdminUsers />}
          {activeTab === 'reports' && <AdminReports />}
          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
};

export default Admin;
