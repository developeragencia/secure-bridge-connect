
import React from 'react';
import {
  BarChart3, Users, UserCircle, Bell, Building, Receipt, Landmark, FileCheck, Database,
  FileBarChart2, PercentCircle, Calculator, FileSpreadsheet, FileStack, ClipboardList,
  FileText, Layout, ReceiptText, Key, Clock, Shield, ClipboardListIcon, Globe, Settings,
  ShieldAlert, CreditCard, HelpCircle, RefreshCw, Lightbulb, Activity
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface TabConfig {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const tabConfigurations: Record<string, TabConfig> = {
  // Main section
  dashboard: {
    title: 'Painel Principal',
    description: 'Visão geral do sistema de recuperação de créditos tributários',
    icon: BarChart3
  },
  users: {
    title: 'Gestão de Usuários',
    description: 'Gerenciamento de usuários e permissões do sistema',
    icon: Users
  },
  profile: {
    title: 'Meu Perfil',
    description: 'Configurações e preferências da sua conta',
    icon: UserCircle
  },
  notifications: {
    title: 'Notificações',
    description: 'Central de notificações e alertas do sistema',
    icon: Bell
  },

  // Clients section
  clients: {
    title: 'Gestão de Clientes',
    description: 'Gerenciamento de cadastros e informações de clientes',
    icon: Building
  },

  // Tax Credits section
  tax_credits: {
    title: 'Gestão de Créditos',
    description: 'Gerenciamento de créditos tributários',
    icon: Receipt
  },
  recovery: {
    title: 'Gestão de Recuperação',
    description: 'Acompanhe processos de recuperação de créditos',
    icon: RefreshCw
  },
  credit_identification: {
    title: 'Identificação de Créditos',
    description: 'Identificação automática de oportunidades de créditos',
    icon: Lightbulb
  },
  data_processing: {
    title: 'Processamento de Dados',
    description: 'Processamento de documentos fiscais e cálculos',
    icon: Database
  },
  audits: {
    title: 'Gestão de Auditorias',
    description: 'Gerenciamento de auditorias tributárias',
    icon: FileCheck
  },
  calculations: {
    title: 'Cálculos IRRF',
    description: 'Ferramentas para cálculos de IRRF e planejamento tributário',
    icon: PercentCircle
  },
  tax_calculator: {
    title: 'Calculadora de Crédito',
    description: 'Calculadora para simulação de créditos tributários',
    icon: Calculator
  },
  imports: {
    title: 'Importação de Dados',
    description: 'Importação de dados de sistemas externos',
    icon: Database
  },
  fiscal_reports: {
    title: 'Relatórios Fiscais',
    description: 'Geração de relatórios fiscais e tributários',
    icon: FileStack
  },
  proposals: {
    title: 'Propostas Comerciais',
    description: 'Gestão de propostas e contratos',
    icon: ClipboardList
  },

  // Tax Reports section
  detailed_reports: {
    title: 'Relatórios Detalhados',
    description: 'Relatórios completos de operações tributárias',
    icon: FileText
  },
  interactive_dashboard: {
    title: 'Dashboard Interativo',
    description: 'Visualizações e análises interativas de dados',
    icon: Activity
  },
  retention_receipts: {
    title: 'Comprovantes de Retenção',
    description: 'Gestão de comprovantes de retenção de tributos',
    icon: ReceiptText
  },

  // Security section
  two_factor_auth: {
    title: 'Autenticação 2FA',
    description: 'Configurações de autenticação de dois fatores',
    icon: Key
  },
  session_expiration: {
    title: 'Expiração de Sessão',
    description: 'Configurações de tempo de expiração de sessões',
    icon: Clock
  },
  access_protection: {
    title: 'Proteção de Acessos',
    description: 'Políticas de segurança para proteção de acessos',
    icon: Shield
  },
  audit_trails: {
    title: 'Trilhas de Auditoria',
    description: 'Registros de acesso e atividades no sistema',
    icon: ClipboardListIcon
  },

  // Content section
  site: {
    title: 'Editor do Site',
    description: 'Gerenciamento de conteúdo do site público',
    icon: Globe
  },
  content_reports: {
    title: 'Relatórios de Conteúdo',
    description: 'Análises de desempenho do conteúdo',
    icon: FileBarChart2
  },

  // System section
  settings: {
    title: 'Configurações',
    description: 'Preferências e configurações do sistema',
    icon: Settings
  },
  security: {
    title: 'Segurança',
    description: 'Configurações de segurança do sistema',
    icon: ShieldAlert
  },
  billing: {
    title: 'Faturamento',
    description: 'Gerenciamento de cobranças e pagamentos',
    icon: CreditCard
  },
  support: {
    title: 'Suporte',
    description: 'Central de ajuda e suporte técnico',
    icon: HelpCircle
  }
};

export const getTabConfig = (tabId: string): TabConfig => {
  return tabConfigurations[tabId] || {
    title: 'Módulo',
    description: 'Funcionalidade do sistema',
    icon: Settings
  };
};
