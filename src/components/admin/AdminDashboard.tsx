
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layout, Users, Settings, FileText, CreditCard, Calculator, 
  PieChart, Shield, Paintbrush, LineChart, BookOpen, Building,
  HardDrive, FileCheck, RefreshCw, Database 
} from 'lucide-react';
import MenuGrid from './dashboard/MenuGrid';
import StatCards from './dashboard/StatCards';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const mainMenuItems = [
    {
      id: 'site',
      title: 'Editor do Site',
      description: 'Personalize a aparência e o conteúdo do seu site',
      icon: <Paintbrush className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white',
      route: 'site'
    },
    {
      id: 'clients',
      title: 'Gestão de Clientes',
      description: 'Cadastre e gerencie seus clientes',
      icon: <Building className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white',
      route: 'clients'
    },
    {
      id: 'tax_credits',
      title: 'Créditos Tributários',
      description: 'Gerencie os créditos tributários dos clientes',
      icon: <CreditCard className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-emerald-500 to-green-600 text-white',
      route: 'tax_credits'
    },
    {
      id: 'calculations',
      title: 'Cálculos IRRF',
      description: 'Realize cálculos e simulações de IRRF',
      icon: <Calculator className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white',
      route: 'calculations'
    },
    {
      id: 'detailed_reports',
      title: 'Relatórios Detalhados',
      description: 'Visualize relatórios detalhados sobre os créditos',
      icon: <LineChart className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-rose-500 to-red-600 text-white',
      route: 'detailed_reports'
    },
    {
      id: 'users',
      title: 'Usuários e Permissões',
      description: 'Gerencie usuários e suas permissões no sistema',
      icon: <Users className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-violet-500 to-purple-600 text-white',
      route: 'users'
    }
  ];

  const operationalMenuItems = [
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
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Layout className="w-6 h-6 text-primary" />
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Bem-vindo ao painel administrativo do sistema
          </p>
        </div>
      </motion.div>

      {/* Cards de estatísticas */}
      <StatCards />

      {/* Menu principal */}
      <div className="mt-8">
        <motion.h2 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-semibold mb-2 flex items-center"
        >
          <BookOpen className="mr-2 h-5 w-5 text-primary" />
          Módulos Principais
        </motion.h2>
        <MenuGrid items={mainMenuItems} />
      </div>

      {/* Menu operacional */}
      <div className="mt-8">
        <motion.h2 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold mb-2 flex items-center"
        >
          <HardDrive className="mr-2 h-5 w-5 text-primary" />
          Operacional
        </motion.h2>
        <MenuGrid items={operationalMenuItems} />
      </div>
    </div>
  );
};

export default AdminDashboard;
