import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container py-8 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <NotificationCenter />
    </div>
  );
};

export default Layout; 