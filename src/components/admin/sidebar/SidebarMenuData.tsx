
import React from 'react';
import {
  Users, BarChart3, FileText, Settings, 
  Globe, ShieldAlert, CreditCard, HelpCircle,
  Receipt, Building, FileSearch, Landmark,
  UserCircle
} from 'lucide-react';
import { SidebarSection } from '@/types/admin-sidebar';

export const getMenuSections = (): SidebarSection[] => {
  return [
    {
      id: 'main',
      title: 'Principal',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-4 w-4" /> },
        { id: 'users', label: 'Usuários', icon: <Users className="h-4 w-4" /> },
        { id: 'profile', label: 'Meu Perfil', icon: <UserCircle className="h-4 w-4" /> }
      ]
    },
    {
      id: 'tax_credits',
      title: 'Créditos Tributários',
      items: [
        { id: 'tax_credits', label: 'Gestão de Créditos', icon: <Receipt className="h-4 w-4" /> },
        { id: 'clients', label: 'Clientes', icon: <Building className="h-4 w-4" /> },
        { id: 'audits', label: 'Auditorias', icon: <FileSearch className="h-4 w-4" /> },
        { id: 'recovery', label: 'Recuperação', icon: <Landmark className="h-4 w-4" /> }
      ]
    },
    {
      id: 'content',
      title: 'Conteúdo',
      items: [
        { id: 'site', label: 'Editor do Site', icon: <Globe className="h-4 w-4" /> },
        { id: 'reports', label: 'Relatórios', icon: <FileText className="h-4 w-4" /> }
      ]
    },
    {
      id: 'system',
      title: 'Sistema',
      items: [
        { id: 'settings', label: 'Configurações', icon: <Settings className="h-4 w-4" /> },
        { id: 'security', label: 'Segurança', icon: <ShieldAlert className="h-4 w-4" /> },
        { id: 'billing', label: 'Faturamento', icon: <CreditCard className="h-4 w-4" /> },
        { id: 'support', label: 'Suporte', icon: <HelpCircle className="h-4 w-4" /> }
      ]
    }
  ];
};
