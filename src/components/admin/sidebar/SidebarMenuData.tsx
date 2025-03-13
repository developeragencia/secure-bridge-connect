
import React from 'react';
import {
  Users, BarChart3, FileText, Settings, 
  Globe, ShieldAlert, CreditCard, HelpCircle,
  Building, UserCircle, Receipt, FileBarChart2, Landmark,
  PercentCircle, FileSpreadsheet, FileStack, ClipboardList,
  Calculator
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
      id: 'clients',
      title: 'Clientes',
      items: [
        { id: 'clients', label: 'Gestão de Clientes', icon: <Building className="h-4 w-4" /> }
      ]
    },
    {
      id: 'tax_credits',
      title: 'Créditos Tributários',
      items: [
        { id: 'tax_credits', label: 'Gestão de Créditos', icon: <Receipt className="h-4 w-4" /> },
        { id: 'recovery', label: 'Recuperação', icon: <Landmark className="h-4 w-4" /> },
        { id: 'audits', label: 'Auditorias', icon: <FileBarChart2 className="h-4 w-4" /> },
        { id: 'calculations', label: 'Cálculos IRRF', icon: <PercentCircle className="h-4 w-4" /> },
        { id: 'tax_calculator', label: 'Calculadora de Crédito', icon: <Calculator className="h-4 w-4" /> },
        { id: 'imports', label: 'Importação de Dados', icon: <FileSpreadsheet className="h-4 w-4" /> },
        { id: 'reports', label: 'Relatórios Fiscais', icon: <FileStack className="h-4 w-4" /> },
        { id: 'proposals', label: 'Propostas Comerciais', icon: <ClipboardList className="h-4 w-4" /> }
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
