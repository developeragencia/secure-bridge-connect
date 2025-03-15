
import React from 'react';
import { 
  Database, RefreshCw, FileCheck, Lightbulb, 
  Receipt, Activity, FileSpreadsheet, FileText,
  PieChart, BarChart2, LineChart, FolderCheck,
  FileSearch, ArrowUpDown, Repeat, DownloadCloud,
  CreditCard, PenTool, Mail
} from 'lucide-react';
import { MenuItem } from './MenuGrid';

export const getOperationalMenuItems = (): MenuItem[] => {
  return [
    {
      id: 'operational_imports',
      title: 'Importação de Dados',
      description: 'Importe dados de sistemas externos',
      icon: <Database className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-sky-500 to-blue-600 text-white',
      route: 'operational_imports',
      highlight: true
    },
    {
      id: 'operational_recovery',
      title: 'Gestão de Recuperação',
      description: 'Acompanhe processos de recuperação de créditos',
      icon: <RefreshCw className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-teal-500 to-green-600 text-white',
      route: 'operational_recovery'
    },
    {
      id: 'operational_audits',
      title: 'Gestão de Auditorias',
      description: 'Gerencie auditorias e verificações',
      icon: <FileCheck className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white',
      route: 'operational_audits'
    },
    {
      id: 'operational_credit_identification',
      title: 'Identificação de Créditos',
      description: 'Identifique novos créditos tributários',
      icon: <Lightbulb className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-orange-500 to-red-600 text-white',
      route: 'operational_credit_identification',
      highlight: true
    },
    {
      id: 'operational_receipts',
      title: 'Recibos de Retenção',
      description: 'Gerencie recibos de retenção tributária',
      icon: <Receipt className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white',
      route: 'operational_receipts'
    },
    {
      id: 'operational_dashboard',
      title: 'Dashboard Interativo',
      description: 'Visualize dados em tempo real',
      icon: <Activity className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white',
      route: 'operational_dashboard',
      highlight: true
    },
    {
      id: 'data_export',
      title: 'Exportação de Dados',
      description: 'Exporte dados em diferentes formatos',
      icon: <DownloadCloud className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white',
      route: 'operational_exports'
    },
    {
      id: 'data_validation',
      title: 'Validação de Dados',
      description: 'Valide e corrija inconsistências nos dados',
      icon: <FileCheck className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600 text-white',
      route: 'operational_validation'
    },
    {
      id: 'report_generation',
      title: 'Geração de Relatórios',
      description: 'Crie relatórios personalizados',
      icon: <FileText className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white',
      route: 'operational_reports'
    },
    {
      id: 'data_visualization',
      title: 'Visualização de Dados',
      description: 'Visualize dados em gráficos interativos',
      icon: <PieChart className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-rose-500 to-red-600 text-white',
      route: 'operational_visualization'
    },
    {
      id: 'supplier_classification',
      title: 'Classificação de Fornecedores',
      description: 'Classifique fornecedores conforme as regras de retenção',
      icon: <ArrowUpDown className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white',
      route: 'operational_suppliers'
    },
    {
      id: 'payment_analysis',
      title: 'Análise de Pagamentos',
      description: 'Analise pagamentos realizados nos últimos 60 meses',
      icon: <CreditCard className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white',
      route: 'operational_payments',
      highlight: true
    }
  ];
};
