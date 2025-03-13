
import {
  BarChart3, Users, Globe, Building, UserCircle,
  Receipt, FileBarChart2, Landmark, PercentCircle, FileSpreadsheet,
  FileStack, ClipboardList, Calculator, FileCheck, Database, Bell
} from 'lucide-react';

interface TabConfig {
  icon: typeof BarChart3;
  title: string;
  description: string;
}

type TabConfigurations = {
  [key: string]: TabConfig;
};

export const tabConfigurations: TabConfigurations = {
  dashboard: {
    icon: BarChart3,
    title: 'Dashboard',
    description: 'Visualize dados e estatísticas do sistema'
  },
  clients: {
    icon: Building,
    title: 'Clientes',
    description: 'Cadastro e gestão de clientes'
  },
  users: {
    icon: Users,
    title: 'Usuários',
    description: 'Gerencie usuários e permissões'
  },
  profile: {
    icon: UserCircle,
    title: 'Meu Perfil',
    description: 'Visualize e edite suas informações pessoais'
  },
  tax_credits: {
    icon: Receipt,
    title: 'Créditos Tributários',
    description: 'Gerencie créditos tributários e processos de recuperação'
  },
  recovery: {
    icon: Landmark,
    title: 'Recuperação de Créditos',
    description: 'Processos de recuperação de créditos tributários'
  },
  audits: {
    icon: FileBarChart2,
    title: 'Auditorias',
    description: 'Processos de auditoria tributária'
  },
  calculations: {
    icon: PercentCircle,
    title: 'Cálculos IRRF',
    description: 'Cálculo e validação de retenções de IRRF'
  },
  imports: {
    icon: FileSpreadsheet,
    title: 'Importação de Dados',
    description: 'Importação e processamento de arquivos fiscais'
  },
  reports: {
    icon: FileStack,
    title: 'Relatórios Fiscais',
    description: 'Geração de relatórios e dossiês tributários'
  },
  proposals: {
    icon: ClipboardList,
    title: 'Propostas Comerciais',
    description: 'Gestão de propostas e contratos'
  },
  tax_calculator: {
    icon: Calculator,
    title: 'Calculadora de Crédito',
    description: 'Cálculo de potenciais créditos tributários'
  },
  credit_identification: {
    icon: FileCheck,
    title: 'Identificação Automática',
    description: 'Identificação automática de créditos tributários'
  },
  data_processing: {
    icon: Database,
    title: 'Processamento de Dados',
    description: 'Importação e processamento inteligente de dados fiscais'
  },
  notifications: {
    icon: Bell,
    title: 'Notificações',
    description: 'Visualize e gerencie as notificações do sistema'
  }
};
