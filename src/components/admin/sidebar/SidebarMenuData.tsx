
import { 
  Home, Users, Settings, FileText, Shield, Bell, CreditCard, 
  HelpCircle, User, DatabaseIcon, FileCheck, ChevronDown, 
  FileSearch, ListChecks, BarChart, File, Paintbrush, Newspaper
} from 'lucide-react';

export type MenuItem = {
  id: string;
  label: string;
  icon: JSX.Element;
  path?: string;
  submenu?: MenuItem[];
  isExpanded?: boolean;
};

export const adminMenuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home className="h-4 w-4" />,
    path: '/admin',
  },
  {
    id: 'users',
    label: 'Usuários',
    icon: <Users className="h-4 w-4" />,
    path: '/admin/users',
  },
  {
    id: 'tax_credits',
    label: 'Créditos Tributários',
    icon: <DatabaseIcon className="h-4 w-4" />,
    submenu: [
      {
        id: 'clients',
        label: 'Clientes',
        icon: <Users className="h-4 w-4" />,
        path: '/admin/clients',
      },
      {
        id: 'recovery',
        label: 'Recuperação',
        icon: <FileCheck className="h-4 w-4" />,
        path: '/admin/recovery',
      },
      {
        id: 'credit_identification',
        label: 'Identificação de Créditos',
        icon: <FileSearch className="h-4 w-4" />,
        path: '/admin/credit-identification',
      },
      {
        id: 'data_processing',
        label: 'Processamento de Dados',
        icon: <ListChecks className="h-4 w-4" />,
        path: '/admin/data-processing',
      },
      {
        id: 'audits',
        label: 'Auditorias',
        icon: <Shield className="h-4 w-4" />,
        path: '/admin/audits',
      },
      {
        id: 'calculations',
        label: 'Cálculos IRRF',
        icon: <BarChart className="h-4 w-4" />,
        path: '/admin/calculations',
      },
      {
        id: 'tax_calculator',
        label: 'Calculadora Fiscal',
        icon: <FileCheck className="h-4 w-4" />,
        path: '/admin/tax-calculator',
      },
      {
        id: 'imports',
        label: 'Importações',
        icon: <File className="h-4 w-4" />,
        path: '/admin/imports',
      },
      {
        id: 'fiscal_reports',
        label: 'Relatórios Fiscais',
        icon: <FileText className="h-4 w-4" />,
        path: '/admin/fiscal-reports',
      },
      {
        id: 'proposals',
        label: 'Propostas Comerciais',
        icon: <FileText className="h-4 w-4" />,
        path: '/admin/proposals',
      },
    ]
  },
  {
    id: 'reports',
    label: 'Relatórios',
    icon: <FileText className="h-4 w-4" />,
    submenu: [
      {
        id: 'detailed_reports',
        label: 'Relatórios Detalhados',
        icon: <FileText className="h-4 w-4" />,
        path: '/admin/detailed-reports',
      },
      {
        id: 'interactive_dashboard',
        label: 'Dashboard Interativo',
        icon: <BarChart className="h-4 w-4" />,
        path: '/admin/interactive-dashboard',
      },
      {
        id: 'retention_receipts',
        label: 'Comprovantes de Retenção',
        icon: <FileCheck className="h-4 w-4" />,
        path: '/admin/retention-receipts',
      },
    ]
  },
  {
    id: 'operational',
    label: 'Operacional',
    icon: <DatabaseIcon className="h-4 w-4" />,
    submenu: [
      {
        id: 'operational_imports',
        label: 'Importações',
        icon: <File className="h-4 w-4" />,
        path: '/admin/operational-imports',
      },
      {
        id: 'operational_recovery',
        label: 'Recuperação',
        icon: <FileCheck className="h-4 w-4" />,
        path: '/admin/operational-recovery',
      },
      {
        id: 'operational_credit_identification',
        label: 'Identificação de Créditos',
        icon: <FileSearch className="h-4 w-4" />,
        path: '/admin/operational-credit-identification',
      },
      {
        id: 'operational_dashboard',
        label: 'Dashboard',
        icon: <BarChart className="h-4 w-4" />,
        path: '/admin/operational-dashboard',
      },
      {
        id: 'operational_receipts',
        label: 'Comprovantes',
        icon: <FileCheck className="h-4 w-4" />,
        path: '/admin/operational-receipts',
      },
      {
        id: 'operational_audits',
        label: 'Auditorias',
        icon: <Shield className="h-4 w-4" />,
        path: '/admin/operational-audits',
      },
    ]
  },
  {
    id: 'security',
    label: 'Segurança',
    icon: <Shield className="h-4 w-4" />,
    submenu: [
      {
        id: 'two_factor_auth',
        label: 'Autenticação de Dois Fatores',
        icon: <Shield className="h-4 w-4" />,
        path: '/admin/two-factor-auth',
      },
      {
        id: 'session_expiration',
        label: 'Expiração de Sessão',
        icon: <Shield className="h-4 w-4" />,
        path: '/admin/session-expiration',
      },
      {
        id: 'access_protection',
        label: 'Proteção de Acesso',
        icon: <Shield className="h-4 w-4" />,
        path: '/admin/access-protection',
      },
      {
        id: 'audit_trails',
        label: 'Trilhas de Auditoria',
        icon: <FileText className="h-4 w-4" />,
        path: '/admin/audit-trails',
      },
    ]
  },
  {
    id: 'site',
    label: 'Editor do Site',
    icon: <Paintbrush className="h-4 w-4" />,
    path: '/admin/site',
  },
  {
    id: 'content_reports',
    label: 'Relatórios de Conteúdo',
    icon: <Newspaper className="h-4 w-4" />,
    path: '/admin/content-reports',
  },
  {
    id: 'admin_profile',
    label: 'Meu Perfil',
    icon: <User className="h-4 w-4" />,
    path: '/admin/profile',
  },
  {
    id: 'settings',
    label: 'Configurações',
    icon: <Settings className="h-4 w-4" />,
    path: '/admin/settings',
  },
  {
    id: 'notifications',
    label: 'Notificações',
    icon: <Bell className="h-4 w-4" />,
    path: '/admin/notifications',
  },
  {
    id: 'billing',
    label: 'Faturamento',
    icon: <CreditCard className="h-4 w-4" />,
    path: '/admin/billing',
  },
  {
    id: 'support',
    label: 'Suporte',
    icon: <HelpCircle className="h-4 w-4" />,
    path: '/admin/support',
  },
];
