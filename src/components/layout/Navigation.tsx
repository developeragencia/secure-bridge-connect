import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '../mode-toggle';
import { UserNav } from '../user-nav';
import ActiveClientSelector from '@/components/clients/ActiveClientSelector';
import { cn } from '@/lib/utils';
import { hasAnyPermission } from '@/lib/permissions';
import { BarChart3, Building2, FileText } from 'lucide-react';

const Navigation: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center max-w-7xl mx-auto">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Secure Bridge Connect
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {hasAnyPermission(user, ['transactions.list', 'reports.view']) && (
              <Link
                to="/dashboard"
                className={cn(
                  'transition-colors hover:text-foreground/80 flex items-center gap-2',
                  isActive('/dashboard')
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            )}
            
            {hasAnyPermission(user, ['transactions.list', 'transactions.view']) && (
              <Link
                to="/transactions"
                className={cn(
                  'transition-colors hover:text-foreground/80 flex items-center gap-2',
                  isActive('/transactions')
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                <FileText className="h-4 w-4" />
                <span>Transações</span>
              </Link>
            )}
            
            {hasAnyPermission(user, ['clients.list', 'clients.view']) && (
              <Link
                to="/clients"
                className={cn(
                  'transition-colors hover:text-foreground/80 flex items-center gap-2',
                  isActive('/clients')
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                <Building2 className="h-4 w-4" />
                <span>Clientes</span>
              </Link>
            )}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {user?.role !== 'CLIENT' && (
            <div className="w-full max-w-sm">
              <ActiveClientSelector />
            </div>
          )}
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation; 