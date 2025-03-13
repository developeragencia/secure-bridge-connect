
import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Users, FileText, Globe, Settings,
  ShieldAlert, CreditCard, HelpCircle, Building, UserCircle,
  Receipt, FileBarChart2, Landmark, PercentCircle, FileSpreadsheet,
  FileStack, ClipboardList, Calculator, FileCheck, Database
} from 'lucide-react';

interface AdminTabHeaderProps {
  activeTab: string;
}

const AdminTabHeader = ({ activeTab }: AdminTabHeaderProps) => {
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      variants={childVariants}
      className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border/40"
    >
      {activeTab === 'dashboard' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Visualize dados e estatísticas do sistema</p>
        </>
      )}
      
      {activeTab === 'clients' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Building className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Clientes</h1>
          </div>
          <p className="text-muted-foreground">Cadastro e gestão de clientes</p>
        </>
      )}
      
      {activeTab === 'users' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Users className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Usuários</h1>
          </div>
          <p className="text-muted-foreground">Gerencie usuários e permissões</p>
        </>
      )}

      {activeTab === 'profile' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <UserCircle className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Meu Perfil</h1>
          </div>
          <p className="text-muted-foreground">Visualize e edite suas informações pessoais</p>
        </>
      )}
      
      {/* Tax Credits Section */}
      {activeTab === 'tax_credits' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Receipt className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Créditos Tributários</h1>
          </div>
          <p className="text-muted-foreground">Gerencie créditos tributários e processos de recuperação</p>
        </>
      )}
      
      {activeTab === 'recovery' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Landmark className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Recuperação de Créditos</h1>
          </div>
          <p className="text-muted-foreground">Processos de recuperação de créditos tributários</p>
        </>
      )}
      
      {activeTab === 'audits' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <FileBarChart2 className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Auditorias</h1>
          </div>
          <p className="text-muted-foreground">Processos de auditoria tributária</p>
        </>
      )}
      
      {activeTab === 'calculations' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <PercentCircle className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Cálculos IRRF</h1>
          </div>
          <p className="text-muted-foreground">Cálculo e validação de retenções de IRRF</p>
        </>
      )}
      
      {activeTab === 'imports' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Importação de Dados</h1>
          </div>
          <p className="text-muted-foreground">Importação e processamento de arquivos fiscais</p>
        </>
      )}
      
      {activeTab === 'reports' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <FileStack className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Relatórios Fiscais</h1>
          </div>
          <p className="text-muted-foreground">Geração de relatórios e dossiês tributários</p>
        </>
      )}
      
      {activeTab === 'proposals' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ClipboardList className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Propostas Comerciais</h1>
          </div>
          <p className="text-muted-foreground">Gestão de propostas e contratos</p>
        </>
      )}
      
      {activeTab === 'tax_calculator' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Calculator className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Calculadora de Crédito</h1>
          </div>
          <p className="text-muted-foreground">Cálculo de potenciais créditos tributários</p>
        </>
      )}
      
      {/* New tabs */}
      {activeTab === 'credit_identification' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <FileCheck className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Identificação Automática</h1>
          </div>
          <p className="text-muted-foreground">Identificação automática de créditos tributários</p>
        </>
      )}
      
      {activeTab === 'data_processing' && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Database className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">Processamento de Dados</h1>
          </div>
          <p className="text-muted-foreground">Importação e processamento inteligente de dados fiscais</p>
        </>
      )}
    </motion.div>
  );
};

export default AdminTabHeader;
