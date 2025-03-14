
import React from 'react';
import { 
  Layout, Users, Settings, FileText, CreditCard, Calculator, 
  PieChart, Shield, Paintbrush, LineChart, BookOpen, Building,
  FileType, Mail, BriefcaseBusiness, Dices, Landmark, Receipt,
  ServerCog, FileDigit, FileClock
} from 'lucide-react';
import { MenuItem } from './MenuGrid';

export const getMainMenuItems = (): MenuItem[] => {
  return [
    {
      id: 'admin',
      title: 'Painel Principal',
      description: 'Visualize o painel principal do sistema',
      icon: <Layout className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 text-white',
      route: 'admin',
      highlight: true
    },
    {
      id: 'site',
      title: 'Editor do Site',
      description: 'Personalize a aparência e o conteúdo do seu site',
      icon: <Paintbrush className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 text-white',
      route: 'site',
      highlight: true
    },
    {
      id: 'clients',
      title: 'Gestão de Clientes',
      description: 'Cadastre e gerencie seus clientes',
      icon: <Building className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white',
      route: 'clients'
    },
    {
      id: 'tax_credits',
      title: 'Créditos Tributários',
      description: 'Gerencie os créditos tributários dos clientes',
      icon: <CreditCard className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 text-white',
      route: 'tax_credits'
    },
    {
      id: 'calculations',
      title: 'Cálculos IRRF',
      description: 'Realize cálculos e simulações de IRRF',
      icon: <Calculator className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 text-white',
      route: 'calculations'
    },
    {
      id: 'irrf_recovery',
      title: 'Recuperação IRRF/PJ',
      description: 'Automação de recuperação de créditos IRRF/PJ',
      icon: <Landmark className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 text-white',
      route: 'irrf_recovery',
      highlight: true
    },
    {
      id: 'detailed_reports',
      title: 'Relatórios Detalhados',
      description: 'Visualize relatórios detalhados sobre os créditos',
      icon: <LineChart className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-rose-400 via-rose-500 to-red-600 text-white',
      route: 'detailed_reports'
    },
    {
      id: 'users',
      title: 'Usuários e Permissões',
      description: 'Gerencie usuários e suas permissões no sistema',
      icon: <Users className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-fuchsia-400 via-fuchsia-500 to-purple-600 text-white',
      route: 'users'
    },
    {
      id: 'fiscal_reports',
      title: 'Relatórios Fiscais',
      description: 'Acompanhe relatórios fiscais e tributários',
      icon: <PieChart className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-pink-400 via-pink-500 to-rose-600 text-white',
      route: 'fiscal_reports'
    },
    {
      id: 'proposals',
      title: 'Propostas Comerciais',
      description: 'Crie e gerencie propostas para clientes',
      icon: <FileType className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 text-white',
      route: 'proposals'
    },
    {
      id: 'audit_management',
      title: 'Gestão de Auditorias',
      description: 'Automatize processos de auditoria fiscal',
      icon: <Shield className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-slate-400 via-slate-500 to-gray-600 text-white',
      route: 'audit_management'
    },
    {
      id: 'notifications',
      title: 'Notificações',
      description: 'Configure e gerencie notificações do sistema',
      icon: <Mail className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 text-white',
      route: 'notifications'
    },
    {
      id: 'retention_receipts',
      title: 'Comprovantes de Retenção',
      description: 'Gerencie e emita comprovantes de retenção',
      icon: <Receipt className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 text-white',
      route: 'retention_receipts'
    },
    {
      id: 'audit_automation',
      title: 'Automação de Auditoria',
      description: 'Configure processos automáticos de auditoria',
      icon: <ServerCog className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-stone-400 via-stone-500 to-neutral-600 text-white',
      route: 'audit_automation'
    }
  ];
};
