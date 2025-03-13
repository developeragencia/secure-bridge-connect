
import React from 'react';
import { 
  Database, RefreshCw, FileCheck, Lightbulb, 
  Receipt, Activity
} from 'lucide-react';
import { MenuItem } from './MenuGrid';

export const getOperationalMenuItems = (): MenuItem[] => {
  return [
    {
      id: 'imports',
      title: 'Importação de Dados',
      description: 'Importe dados de sistemas externos',
      icon: <Database className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-sky-500 to-blue-600 text-white',
      route: 'imports'
    },
    {
      id: 'recovery',
      title: 'Gestão de Recuperação',
      description: 'Acompanhe processos de recuperação de créditos',
      icon: <RefreshCw className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-teal-500 to-green-600 text-white',
      route: 'recovery'
    },
    {
      id: 'audits',
      title: 'Gestão de Auditorias',
      description: 'Gerencie auditorias e verificações',
      icon: <FileCheck className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white',
      route: 'audits'
    },
    {
      id: 'credit_identification',
      title: 'Identificação de Créditos',
      description: 'Identifique novos créditos tributários',
      icon: <Lightbulb className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-orange-500 to-red-600 text-white',
      route: 'credit_identification'
    },
    {
      id: 'retention_receipts',
      title: 'Recibos de Retenção',
      description: 'Gerencie recibos de retenção tributária',
      icon: <Receipt className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white',
      route: 'retention_receipts'
    },
    {
      id: 'tax_dashboard',
      title: 'Dashboard Interativo',
      description: 'Visualize dados em tempo real',
      icon: <Activity className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white',
      route: 'interactive_dashboard',
      highlight: true
    }
  ];
};
