
import {
  BarChart3, Users, FileText, Settings, Globe, ShieldAlert, CreditCard, HelpCircle,
  Building, UserCircle, Receipt, FileBarChart2, Landmark, PercentCircle,
  FileSpreadsheet, FileStack, ClipboardList, Calculator, FileCheck, Database,
  FileLineChart, Layout, ReceiptText, Key, Clock, Shield, ClipboardListIcon, Bell
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

type TabConfig = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const tabConfigurations: Record<string, TabConfig> = {
  dashboard: {
    title: 'Dashboard',
    description: 'Visão geral das métricas do sistema e atividades recentes.',
    icon: BarChart3,
  },
  users: {
    title: 'Gestão de Usuários',
    description: 'Gerenciar usuários do sistema, permissões e acessos.',
    icon: Users,
  },
  reports: {
    title: 'Relatórios',
    description: 'Acesso aos relatórios gerados pelo sistema.',
    icon: FileText,
  },
  settings: {
    title: 'Configurações',
    description: 'Configurações gerais do sistema e da conta.',
    icon: Settings,
  },
  site: {
    title: 'Editor do Site',
    description: 'Editar conteúdo e aparência do site público.',
    icon: Globe,
  },
  security: {
    title: 'Segurança',
    description: 'Configurações de segurança e permissões do sistema.',
    icon: ShieldAlert,
  },
  billing: {
    title: 'Faturamento',
    description: 'Gerenciar assinaturas, faturas e métodos de pagamento.',
    icon: CreditCard,
  },
  support: {
    title: 'Suporte',
    description: 'Acesso ao suporte técnico e documentação.',
    icon: HelpCircle,
  },
  clients: {
    title: 'Gestão de Clientes',
    description: 'Gerenciar informações de clientes e relacionamentos.',
    icon: Building,
  },
  profile: {
    title: 'Meu Perfil',
    description: 'Gerenciar suas informações e preferências pessoais.',
    icon: UserCircle,
  },
  tax_credits: {
    title: 'Gestão de Créditos Tributários',
    description: 'Gerenciar os créditos tributários e processos fiscais.',
    icon: Receipt,
  },
  audits: {
    title: 'Auditorias',
    description: 'Gerenciar auditorias e análises fiscais.',
    icon: FileBarChart2,
  },
  recovery: {
    title: 'Recuperação de Créditos',
    description: 'Gerenciar processos de recuperação de créditos tributários.',
    icon: Landmark,
  },
  calculations: {
    title: 'Cálculos IRRF',
    description: 'Ferramenta para cálculos de IRRF e análises comparativas.',
    icon: PercentCircle,
  },
  imports: {
    title: 'Importação de Dados',
    description: 'Importar dados fiscais e tributários para o sistema.',
    icon: FileSpreadsheet,
  },
  proposals: {
    title: 'Propostas Comerciais',
    description: 'Gerenciar propostas comerciais para clientes.',
    icon: ClipboardList,
  },
  tax_calculator: {
    title: 'Calculadora de Crédito',
    description: 'Calcular potenciais créditos tributários para clientes.',
    icon: Calculator,
  },
  credit_identification: {
    title: 'Identificação de Créditos',
    description: 'Identificação automática de créditos tributários.',
    icon: FileCheck,
  },
  data_processing: {
    title: 'Processamento de Dados',
    description: 'Processamento e validação de dados fiscais.',
    icon: Database,
  },
  notifications: {
    title: 'Notificações',
    description: 'Gerenciar notificações e alertas do sistema.',
    icon: Bell,
  },
  // New Tax Reports and Dossiers tabs
  detailed_reports: {
    title: 'Relatórios Detalhados',
    description: 'Relatórios detalhados para tributação e auditoria fiscal.',
    icon: FileText,
  },
  interactive_dashboard: {
    title: 'Dashboard Interativo',
    description: 'Análise gerencial interativa de dados fiscais.',
    icon: Layout,
  },
  retention_receipts: {
    title: 'Comprovantes de Retenção',
    description: 'Emissão de comprovantes para fornecedores e órgãos públicos.',
    icon: ReceiptText,
  },
  // New Security and Audit tabs
  two_factor_auth: {
    title: 'Autenticação de Dois Fatores',
    description: 'Configuração de autenticação de dois fatores para administradores.',
    icon: Key,
  },
  session_expiration: {
    title: 'Expiração de Sessão',
    description: 'Configuração de logout remoto e expiração automática de sessão.',
    icon: Clock,
  },
  access_protection: {
    title: 'Proteção de Acessos',
    description: 'Monitoramento de login e alertas para ações suspeitas.',
    icon: Shield,
  },
  audit_trails: {
    title: 'Trilhas de Auditoria',
    description: 'Registro de todas as alterações realizadas no sistema.',
    icon: ClipboardListIcon,
  },
};
